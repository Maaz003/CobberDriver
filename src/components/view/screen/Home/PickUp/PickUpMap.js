import React, {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import R from '@components/utils/R';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import MapView from 'react-native-maps';
import PickUpMarker from '@components/view/mapView/PickUpMarker';

function PickUpMap() {
  const mapRef = useRef(null);
  let coordinates = LocationCoordinates();
  const {pickUpLat, pickUpLong, addressRawPickup, initialLat, initialLong} =
    coordinates;

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
      <MapView
        style={R.styles.mapView}
        cacheEnabled={false}
        ref={mapRef}
        loadingEnabled={true}
        onMapReady={onMapReady}
        loadingIndicatorColor={R.color.mainColor}
        loadingBackgroundColor={'rgba(0,0,0,0.3)'}
        initialRegion={{
          latitude: pickUpLat ? pickUpLat : initialLat ? initialLat : 30.0002,
          longitude: pickUpLong
            ? pickUpLong
            : initialLong
            ? initialLong
            : 136.2092,
          latitudeDelta: 0.922,
          longitudeDelta: 0.922,
        }}>
        <PickUpMarker
          pickUpLat={pickUpLat}
          pickUpLong={pickUpLong}
          addressRawPickup={addressRawPickup}
          initialLat={initialLat}
          initialLong={initialLong}
        />
      </MapView>
    </SafeAreaView>
  );
}
export default PickUpMap;
