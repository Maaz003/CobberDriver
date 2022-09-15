import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_GEOCODE} from '@env';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {
  confirmDropOff,
  confirmPickUp,
  pinLocation,
} from '@store/user/userSlice';
import {useIsFocused} from '@react-navigation/native';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import Icon from '@components/common/Icon';
import Text from '@components/common/Text';

export default function MarkerMap(props) {
  const {navigation} = props;
  const {locType} = props.route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  Geocoder.init(GOOGLE_GEOCODE);

  const [dropOff, setDropOff] = useState();
  const [completeAddress, setCompleteAddress] = useState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  let coordinates = LocationCoordinates();
  const {
    pickUpLat,
    pickUpLong,
    dropOffLat,
    dropOffLong,
    initialLat,
    initialLong,
  } = coordinates;

  const onRegionChange = region => {
    let lat = region.latitude;
    let long = region.longitude;
    getAddressFromCoordinates(lat, long);
  };

  useEffect(() => {
    if (locType === 'Pickup') {
      setLatitude(pickUpLat ? pickUpLat : initialLat);
      setLongitude(pickUpLong ? pickUpLong : initialLong);
    } else {
      setLatitude(dropOffLat ? dropOffLat : pickUpLat ? pickUpLat : initialLat);
      setLongitude(
        dropOffLong ? dropOffLong : pickUpLong ? pickUpLong : initialLong,
      );
    }
  }, [isFocused]);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    await Geocoder.from(latitude, longitude)
      .then(json => {
        let addressRaw = json.results[0].formatted_address;
        setDropOff(addressRaw);
        let loc = {
          address: addressRaw,
          latitude,
          longitude,
        };
        setCompleteAddress({...loc});
      })
      .catch(error => {
        // console.log('ERRPR', error);
      });
  };

  const onSubmit = () => {
    if (locType === 'Pickup') {
      dispatch(confirmPickUp(completeAddress));
      navigation.navigate('PickUpLocation');
      dispatch(pinLocation(true));
    } else {
      dispatch(confirmDropOff(completeAddress));
      navigation.navigate('DropOffLocation');
    }
  };

  return (
    <View style={{...styles.mainLayout}}>
      {latitude !== 0 && longitude !== 0 && (
        <MapView
          style={styles.mapView}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0012,
            longitudeDelta: 0.0012,
          }}
          onRegionChangeComplete={onRegionChange}
        />
      )}

      <View style={styles.pointerView}>
        <Icon name={'pin'} type={'Ionicons'} color={R.color.black} size={40} />
      </View>

      <LinearGradient style={styles.textView} colors={['#2C2C2C', '#505050']}>
        <Text
          variant={'h5'}
          font={'bold'}
          color={R.color.white}
          gutterBottom={20}
          align={'left'}
          transform={'none'}>
          {locType === 'Pickup' ? 'Pickup Details' : 'Dropoff Details'}
        </Text>
        <View style={R.styles.twoItemsRow}>
          <View style={styles.iconView}>
            <Icon
              name={'location-pin'}
              type={'Entypo'}
              color={R.color.black}
              size={20}
            />
          </View>
          <Text
            variant={'body3'}
            font={'regular'}
            color={R.color.white}
            style={{marginLeft: 10, maxWidth: '90%'}}
            align={'left'}
            numberOfLines={2}
            transform={'none'}>
            {dropOff ? dropOff : `Your ${locType} location`}
          </Text>
        </View>
        <Button
          value={`Confirm ${locType}`}
          bgColor={R.color.mainColor}
          width={'95%'}
          size={'xmd'}
          variant={'body2'}
          font={'semiBold'}
          gutterTop={R.unit.scale(20)}
          color={'black'}
          borderRadius={100}
          onPress={onSubmit}
          borderColor={R.color.mainColor}
          loaderColor={'white'}
          borderWidth={2}
        />
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
  },
  mapView: {
    height: R.unit.height(1),
    width: R.unit.width(1),
    top: 0,
  },
  pointerView: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    bottom: 0,
    right: 0,
  },
  textView: {
    zIndex: 99999,
    // height: R.unit.height(0.25),
    paddingVertical: R.unit.scale(25),
    width: R.unit.width(1),
    backgroundColor: R.color.black,
    borderTopLeftRadius: R.unit.scale(40),
    borderTopRightRadius: R.unit.scale(40),
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconView: {
    backgroundColor: R.color.mainColor,
    borderRadius: R.unit.scale(100),
    padding: R.unit.scale(10),
  },
});
