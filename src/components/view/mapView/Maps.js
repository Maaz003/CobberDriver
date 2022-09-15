import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import Icon from '../../common/Icon';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_GEOCODE} from '@env';
import haversine from 'haversine';
import Text from '../../common/Text';
import {stringTrim} from '@components/utils/ReuseableFunctions';
import {rideDistance, rideTime} from '@store/user/userSlice';
import {MAPRef} from '@store/common/commonSlice';

function Maps(props) {
  const {navigation, location} = props;
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  const pickUpLat = user?.pickupLoc?.latitude;
  const pickUpLong = user?.pickupLoc?.longitude;
  const dropOffLat = user?.dropOffLoc?.latitude;
  const dropOffLong = user?.dropOffLoc?.longitude;
  const addressRawDropOff = user?.dropOffLoc?.address;
  const dropOffAddr = stringTrim(addressRawDropOff, 1);
  const addressRawPickup = user?.pickupLoc?.address;
  const pickUpAddr = stringTrim(addressRawPickup, 1);
  const initialLat = user?.user?.currentLocation?.coordinates[1];
  const initialLong = user?.user?.currentLocation?.coordinates[0];
  const load = user?.locationLoader;

  const [time, setTime] = useState(0);
  const [changeLoc, setChangeLoc] = useState('');

  let origin = {
    latitude: pickUpLat ? pickUpLat : 33.8688,
    longitude: pickUpLong ? pickUpLong : 151.2093,
  };

  let destination = {
    latitude: Number(dropOffLat),
    longitude: Number(dropOffLong),
  };

  useEffect(() => {
    dispatch(MAPRef(mapRef.current));
  }, []);

  useEffect(() => {
    if (user?.dropOffLoc !== undefined) {
      getDistance();
    }
  }, [origin, destination]);

  useEffect(() => {
    if (user?.dropOffLoc !== undefined) {
      // if (changeLoc !== dropOffLat) {
      setChangeLoc(dropOffLat);
      animateDropOff();
      // }
    }
  }, [user?.dropOffLoc]);

  useEffect(() => {
    if (user?.pickupLoc !== undefined) {
      if (initialLat !== pickUpLat) {
        // animatePickup();
      }
    }
  }, [user?.pickupLoc]);

  const getDistance = () => {
    let calcDist = haversine(origin, destination);
    let distance = Math.ceil((calcDist * 1000).toFixed(2));
    dispatch(rideDistance(distance));
    dispatch(rideTime(time));
  };

  const animateDropOff = () => {
    let region = {
      latitude: Number(dropOffLat),
      longitude: Number(dropOffLong),
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  const animatePickup = () => {
    let region = {
      latitude: Number(pickUpLat),
      longitude: Number(pickUpLong),
      latitudeDelta: 0.032,
      longitudeDelta: 0.032,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  return (
    <SafeAreaView>
      <MapView
        style={styles.mapView}
        cacheEnabled={false}
        ref={mapRef}
        loadingEnabled={true}
        loadingIndicatorColor={R.color.mainColor}
        loadingBackgroundColor={'rgba(0,0,0,0.3)'}
        initialRegion={{
          latitude: dropOffLat ? dropOffLat : initialLat,
          longitude: dropOffLong ? dropOffLong : initialLong,
          latitudeDelta: 0.022,
          longitudeDelta: 0.022,
        }}>
        <Marker
          coordinate={{
            latitude: pickUpLat ? pickUpLat : initialLat,
            longitude: pickUpLong ? pickUpLong : initialLong,
          }}
          tracksViewChanges={false}
          title={'User'}>
          <View style={R.styles.columnView}>
            <Text
              variant={'body6'}
              font={'bold'}
              color={R.color.charcoalShade}
              style={{
                backgroundColor: R.color.mainColor,
                padding: R.unit.scale(6),
                borderRadius: R.unit.scale(2),
              }}
              align={'center'}
              transform={'none'}>
              {pickUpAddr ? pickUpAddr : 'PickUp'}
            </Text>
            <Icon
              name={'user'}
              type={'FontAwesome'}
              size={25}
              color={R.color.black}
            />
          </View>
        </Marker>

        {user?.dropOffLoc !== undefined && (
          <Marker
            coordinate={{
              latitude: dropOffLat ? Number(dropOffLat) : 24.917075,
              longitude: dropOffLong ? Number(dropOffLong) : 67.090969,
            }}
            tracksViewChanges={false}
            pinColor={R.color.blackLightShade}>
            <View style={R.styles.columnView}>
              <Text
                variant={'body6'}
                font={'bold'}
                color={R.color.charcoalShade}
                style={{
                  backgroundColor: R.color.mainColor,
                  padding: R.unit.scale(6),
                  borderRadius: R.unit.scale(2),
                }}
                align={'center'}
                transform={'none'}>
                {dropOffAddr ? dropOffAddr : 'DropOff'}
              </Text>
              <Icon
                name={'location-sharp'}
                type={'Ionicons'}
                size={30}
                color={R.color.black}
              />
            </View>
          </Marker>
        )}
        {user?.dropOffLoc !== undefined && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_GEOCODE}
            strokeWidth={3}
            strokeColor={R.color.black}
            timePrecision={'now'}
            precision={'high'}
            mode={'DRIVING'}
            optimizeWaypoints={true}
            splitWaypoints={true}
            onReady={result => {
              setTime(result.duration);
            }}
          />
        )}
      </MapView>
    </SafeAreaView>
  );
}
export default Maps;

const styles = StyleSheet.create({
  mapView: {
    height: R.unit.height(1),
    width: R.unit.width(1),
    top: 0,
  },
});
