import React, {useRef, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Marker} from 'react-native-maps';
import {useIsFocused} from '@react-navigation/native';
import R from '@components/utils/R';
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
  const isFocused = useIsFocused();
  const mapRef = useRef(null);
  let coordinates = LocationCoordinates();
  const user = useSelector(state => state.user);
  const ride = useSelector(state => state.ride);
  const {rideSession} = ride;
  const [origin, setOrigin] = useState(undefined);
  const [duration, setDuration] = useState(undefined);
  const [destination, setDestination] = useState(undefined);
  const [pickupPoint, setPickupPoint] = useState(undefined);
  const [dropOffPoint, setDropOffPoint] = useState(undefined);
  const {pickUpLat, pickUpLong, addressRawPickup, initialLat, initialLong} =
    coordinates;

  useEffect(() => {
    if (rideSession) {
      if (rideSession?.type === 'instant') {
        if (rideSession?.rideStatus === 'notstarted') {
          setDestination({
            latitude: rideSession?.location?.pickUpLoc?.latitude,
            longitude: rideSession?.location?.pickUpLoc?.longitude,
          });
        } else {
          setDestination({
            latitude: rideSession?.location?.dropOffLoc?.latitude,
            longitude: rideSession?.location?.dropOffLoc?.longitude,
          });
        }
      } else {
        let pickUpStatuesSchedule = [
          'notstarted',
          'pickupstarted',
          'pickupended',
        ];
        let dropOffStatusSchedule = ['dropoffstarted', 'dropoffended'];
        if (pickUpStatuesSchedule?.includes(rideSession?.rideStatus)) {
          setDestination({
            latitude: rideSession?.location?.pickUpLoc?.latitude,
            longitude: rideSession?.location?.pickUpLoc?.longitude,
          });
        } else if (dropOffStatusSchedule?.includes(rideSession?.rideStatus)) {
          setDestination({
            latitude: rideSession?.location?.dropOffLoc?.latitude,
            longitude: rideSession?.location?.dropOffLoc?.longitude,
          });
        }
      }

      if (user?.pickupLoc) {
        setOrigin({
          latitude: pickUpLat,
          longitude: pickUpLong,
        });
      } else {
        setOrigin({
          latitude: initialLat,
          longitude: initialLong,
        });
      }

      setPickupPoint({
        latitude: rideSession?.location?.pickUpLoc?.latitude,
        longitude: rideSession?.location?.pickUpLoc?.longitude,
      });
      setDropOffPoint({
        latitude: rideSession?.location?.dropOffLoc?.latitude,
        longitude: rideSession?.location?.dropOffLoc?.longitude,
      });
    }
  }, [isFocused, ride?.rideSession, user?.pickupLoc]);

  useEffect(() => {
    if (!user?.locationLoader) {
      if (origin !== undefined && destination !== undefined) {
        let arr = [];
        arr.push(origin, destination);
        let navigationPoints = calculateDelta(arr);
        animatePickup(navigationPoints);
      }
    }
  }, [origin, destination, ride?.rideSession, user?.pickUpLoc]);

  const animatePickup = data => {
    const {latitude, latitudeDelta, longitude, longitudeDelta} = data;
    let region = {
      latitude: Number(pickUpLat),
      longitude: Number(pickUpLong),
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
    headerColor: R.color.charcoalShade2,
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
    if (rideSession?.type === 'instant') {
      if (rideSession?.rideStatus === 'notstarted') {
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
            {rideSession?.location?.pickUpLocation}
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
            {rideSession?.location?.dropOffLocation}
          </Text>
        );
      }
    } else {
      let pickUpStatuesSchedule = [
        'notstarted',
        'pickupstarted',
        'pickupended',
      ];
      if (pickUpStatuesSchedule.includes(rideSession?.rideStatus)) {
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
            {rideSession.location.pickUpLocation}
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
            {rideSession.location.dropOffLocation}
          </Text>
        );
      }
    }
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={R.styles.mainLayout}>
        <MapHeader onPress={() => null} showLive={true} showDrawer={false} />

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
                latitude: destination?.latitude,
                longitude: destination?.longitude,
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

          <MapDirections
            origin={pickupPoint}
            destination={dropOffPoint}
            strokeWidth={0}
            setTime={time => {
              setDuration(time);
            }}
          />
        </Map>
        {user?.locationLoader && (
          <View style={R.styles.loaderView}>
            <ActivityIndicator size="large" color={R.color.mainColor} />
          </View>
        )}
        {origin && destination && (
          <RidesInProgressCard
            type={rideSession?.type}
            data={rideSession}
            navigation={navigation}
            duration={duration}
          />
        )}
      </View>
    </ScreenBoiler>
  );
}

export default OnGoingRideScreen;
