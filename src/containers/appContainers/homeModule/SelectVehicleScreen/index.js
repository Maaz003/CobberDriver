import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {rideDistance, rideTime} from '@store/user/userSlice';
import MapView from 'react-native-maps';
import {useDispatch} from 'react-redux';
import haversine from 'haversine';
import R from '@components/utils/R';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import PickUpMarker from '@components/view/mapView/PickUpMarker';
import DropOffMarker from '@components/view/mapView/DropOffMarker';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import MapDirections from '@components/view/mapView/MapDirections';
import VehicleCard from '@components/view/screen/Home/VehicleCard/VehicleTypeCard';
import {calculateDelta} from '@components/utils/ReuseableFunctions';
import HomeHeader from '@components/view/screen/Home/HomeHeader';

function SelectVehicleScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  let coordinates = LocationCoordinates();
  const {
    pickUpLat,
    pickUpLong,
    dropOffLat,
    dropOffLong,
    addressRawDropOff,
    addressRawPickup,
    initialLat,
    initialLong,
    dropOffLoc,
  } = coordinates;

  const [time, setTime] = useState(0);

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  let origin = {
    latitude: pickUpLat ? pickUpLat : 33.8688,
    longitude: pickUpLong ? pickUpLong : 151.2093,
  };

  let destination = {
    latitude: Number(dropOffLat),
    longitude: Number(dropOffLong),
  };

  useEffect(() => {
    if (dropOffLoc !== undefined) {
      getDistance();
    }
  }, [origin, destination]);

  useEffect(() => {
    let arr = [];
    arr.push(origin, destination);
    let navigationPoints = calculateDelta(arr);
    animateDropOff(navigationPoints);
  }, [origin, destination]);

  const getDistance = () => {
    let calcDist = haversine(origin, destination);
    let distance = Math.ceil((calcDist * 1000).toFixed(2));
    dispatch(rideDistance(distance));
    dispatch(rideTime(time));
  };

  const animateDropOff = data => {
    const {latitude, latitudeDelta, longitude, longitudeDelta} = data;
    let region = {
      latitude: Number(latitude),
      longitude: Number(longitude),
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={R.styles.mainLayout}>
        <HomeHeader onPress={onPress} iconName={'arrow-back'} />
        <MapView
          style={styles.mapView}
          cacheEnabled={false}
          ref={mapRef}
          showsTraffic={true}
          showsBuildings={true}
          loadingEnabled={true}
          loadingIndicatorColor={R.color.mainColor}
          loadingBackgroundColor={'rgba(0,0,0,0.3)'}
          initialRegion={{
            latitude: dropOffLat ? dropOffLat : initialLat,
            longitude: dropOffLong ? dropOffLong : initialLong,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <PickUpMarker
            pickUpLat={pickUpLat}
            pickUpLong={pickUpLong}
            addressRawPickup={addressRawPickup}
            initialLat={initialLat}
            initialLong={initialLong}
          />
          {dropOffLoc !== undefined && (
            <DropOffMarker
              dropOffLat={dropOffLat}
              dropOffLong={dropOffLong}
              initialLat={initialLat}
              initialLong={initialLong}
              addressRawDropOff={addressRawDropOff}
            />
          )}

          {dropOffLoc !== undefined && (
            <MapDirections
              origin={origin}
              destination={destination}
              setTime={data => setTime(data)}
            />
          )}
        </MapView>

        <VehicleCard {...props} />
      </View>
    </ScreenBoiler>
  );
}
const styles = StyleSheet.create({
  mapView: {
    height: R.unit.height(0.78),
    width: R.unit.width(1),
    top: 0,
  },
});

export default SelectVehicleScreen;
