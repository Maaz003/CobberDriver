import React, {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import Map from '@components/view/mapView/Map';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import PickUpMarker from '@components/view/mapView/PickUpMarker';

function HomeMap() {
  const mapRef = useRef(null);
  let coordinates = LocationCoordinates();
  const user = useSelector(state => state.user);

  const {pickUpLat, pickUpLong, initialLat, initialLong, pickupLoc} =
    coordinates;

  useEffect(() => {
    if (pickupLoc !== undefined) {
      if (!user?.locationLoader) {
        animatePickup();
      }
    }
  }, [pickupLoc, user.locationLoader]);

  const animatePickup = () => {
    if (mapRef.current) {
      let region = {
        latitude: pickUpLat ? Number(pickUpLat) : initialLat,
        longitude: pickUpLong ? Number(pickUpLong) : initialLong,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      };
      mapRef?.current?.animateToRegion(region, 2000);
      // mapRef?.current?.animateCamera({
      //   center: region,
      // });
    }
  };

  const onMapReady = () => {
    animatePickup();
  };

  return (
    <SafeAreaView>
      <Map mapForwardRef={mapRef} loadingEnabled={false} mapReady={onMapReady}>
        <PickUpMarker />
      </Map>
    </SafeAreaView>
  );
}
export default HomeMap;
