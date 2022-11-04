import React, {useRef, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';
import R from '@components/utils/R';
import {Marker} from 'react-native-maps';
import {useIsFocused} from '@react-navigation/native';
import {calculateDelta} from '@components/utils/ReuseableFunctions';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import MapHeader from '@components/view/screen/Home/MapHeader';
import RidesInProgressCard from '@components/view/screen/Home/RideInProgressCard';
import PickUpMarker from '@components/view/mapView/PickUpMarker';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import Map from '@components/view/mapView/Map';
import MapDirections from '@components/view/mapView/MapDirections';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';

function OnGoingRideScreen(props) {
  const {navigation} = props;
  const mapRef = useRef(null);
  const isFocused = useIsFocused();
  const user = useSelector(state => state.user);
  let coordinates = LocationCoordinates();
  const [origin, setOrigin] = useState(undefined);
  const [destination, setDestination] = useState(undefined);
  const {pickUpLat, pickUpLong, addressRawPickup, initialLat, initialLong} =
    coordinates;

  let rideType;
  let rideData;

  if (props.route.params === undefined) {
    rideType = user.rideSession.type;
    rideData = user.rideSession;
  } else {
    const {type = undefined, data = undefined} = props.route.params;
    rideType = type;
    rideData = data;
  }

  useEffect(() => {
    if (rideData) {
      if (!rideData?.isScheduled) {
        if (rideData?.rideStatus === 'notstarted') {
          setOrigin({
            latitude: user?.pickupLoc.latitude,
            longitude: user?.pickupLoc.longitude,
          });
          setDestination({
            latitude: rideData?.location?.pickUpLoc?.latitude,
            longitude: rideData?.location?.pickUpLoc?.longitude,
          });
        } else {
          setOrigin({
            latitude: user?.pickupLoc.latitude,
            longitude: user?.pickupLoc.longitude,
          });
          setDestination({
            latitude: rideData?.location?.dropOffLoc?.latitude,
            longitude: rideData?.location?.dropOffLoc?.longitude,
          });
        }
      } else {
        let pickUpStatuesSchedule = [
          'notstarted',
          'pickupstarted',
          'pickupended',
        ];
        let dropOffStatusSchedule = ['dropoffstarted', 'dropoffended'];
        if (pickUpStatuesSchedule?.includes(rideData?.rideStatus)) {
          setOrigin({
            latitude: user?.pickupLoc.latitude,
            longitude: user?.pickupLoc.longitude,
          });
          setDestination({
            latitude: rideData?.location?.pickUpLoc?.latitude,
            longitude: rideData?.location?.pickUpLoc?.longitude,
          });
        } else if (dropOffStatusSchedule?.includes(rideData?.rideStatus)) {
          setOrigin({
            latitude: user?.pickupLoc.latitude,
            longitude: user?.pickupLoc.longitude,
          });
          setDestination({
            latitude: rideData?.location?.dropOffLoc?.latitude,
            longitude: rideData?.location?.dropOffLoc?.longitude,
          });
        }
      }
    }
  }, [isFocused, rideData]);

  useEffect(() => {
    if (!user?.locationLoader) {
      if (origin !== undefined && destination !== undefined) {
        let arr = [];
        arr.push(origin, destination);
        let navigationPoints = calculateDelta(arr);
        animatePickup(navigationPoints);
      }
    }
  }, [origin, destination, rideData]);

  const animatePickup = data => {
    const {latitude, latitudeDelta, longitude, longitudeDelta} = data;
    let region = {
      latitude: Number(latitude),
      longitude: Number(longitude),
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  const onPress = () => {
    navigation.goBack();
  };

  const onMapReady = () => {
    if (user?.pinLoc) {
      if (origin !== undefined && destination !== undefined) {
        let arr = [];
        arr.push(origin, destination);
        let navigationPoints = calculateDelta(arr);
        animatePickup(navigationPoints);
      }
    }
  };

  const markerText = () => {
    if (!rideData?.isScheduled) {
      if (rideData?.rideStatus === 'notstarted') {
        return (
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
            {rideData.location.pickUpLocation}
          </Text>
        );
      } else {
        return (
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
            {rideData.location.dropOffLocation}
          </Text>
        );
      }
    } else {
      let pickUpStatuesSchedule = [
        'notstarted',
        'pickupstarted',
        'pickupended',
      ];
      if (pickUpStatuesSchedule.includes(rideData?.rideStatus)) {
        return (
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
            {rideData.location.pickUpLocation}
          </Text>
        );
      } else {
        return (
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
            {rideData.location.dropOffLocation}
          </Text>
        );
      }
    }
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={R.styles.mainLayout}>
        <MapHeader
          onPress={onPress}
          iconName={user.inRide ? 'close' : 'arrow-back'}
          iconType={user.inRide ? 'Ionicons' : 'MaterialIcons'}
          showLive={true}
          showDrawer={false}
        />

        <Map
          mapViewStyles={[R.styles.mapView, {height: R.unit.height(0.8)}]}
          mapForwardRef={mapRef}
          loadingEnabled={false}
          mapReady={onMapReady}>
          <PickUpMarker
            pickUpLat={pickUpLat}
            pickUpLong={pickUpLong}
            addressRawPickup={addressRawPickup}
            initialLat={initialLat}
            initialLong={initialLong}
          />
          {destination && (
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              tracksViewChanges={false}
              title={'User'}>
              <View style={R.styles.columnView}>
                {markerText()}
                <Icon
                  name={'box'}
                  type={'FontAwesome5'}
                  size={25}
                  color={R.color.black}
                />
              </View>
            </Marker>
          )}

          <MapDirections
            origin={origin}
            destination={destination}
            setTime={() => null}
          />
        </Map>
        {user?.locationLoader && (
          <View style={R.styles.loaderView}>
            <ActivityIndicator size="large" color={R.color.mainColor} />
          </View>
        )}
        {origin && destination && (
          <RidesInProgressCard
            type={rideType}
            data={rideData}
            navigation={navigation}
          />
        )}
      </View>
    </ScreenBoiler>
  );
}

export default OnGoingRideScreen;
