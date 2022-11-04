import React, {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import Map from '@components/view/mapView/Map';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import PickUpMarker from '@components/view/mapView/PickUpMarker';
import {mapStyles} from '@components/constants';

function HomeMap() {
  const mapRef = useRef(null);
  let coordinates = LocationCoordinates();
  const {pickUpLat, pickUpLong, addressRawPickup, initialLat, initialLong} =
    coordinates;

  console.log('PICKUP', pickUpLat);

  useEffect(() => {
    animatePickup();
  }, [pickUpLat || pickUpLong]);

  const animatePickup = () => {
    let region = {
      latitude: pickUpLat ? Number(pickUpLat) : initialLat,
      longitude: pickUpLong ? Number(pickUpLong) : initialLong,
      latitudeDelta: Platform.OS === 'ios' ? 0.001 : 0.002,
      longitudeDelta: Platform.OS === 'ios' ? 0.001 : 0.002,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  const onMapReady = () => {
    animatePickup();
  };

  return (
    <SafeAreaView>
      <Map
        customMapStyle={mapStyles}
        mapForwardRef={mapRef}
        onMapReady={onMapReady}>
        <PickUpMarker
          pickUpLat={pickUpLat}
          pickUpLong={pickUpLong}
          addressRawPickup={addressRawPickup}
          initialLat={initialLat}
          initialLong={initialLong}
        />
      </Map>
    </SafeAreaView>
  );
}
export default HomeMap;
