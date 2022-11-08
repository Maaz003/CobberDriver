import React from 'react';
import {SafeAreaView} from 'react-native';
import R from '@components/utils/R';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import MapView from 'react-native-maps';
import {mapStyles} from '@components/constants';

function Map(props) {
  let coordinates = LocationCoordinates();
  const {
    children,
    mapForwardRef,
    mapReady,
    mapViewStyles,
    loadingEnabled = true,
    loadingIndicatorColor = R.color.mainColor,
    loadingBackgroundColor = 'rgba(0,0,0,0.5)',
  } = props;
  const {pickUpLat, pickUpLong, initialLat, initialLong} = coordinates;

  const onMapReady = () => {
    mapReady();
  };

  return (
    <SafeAreaView>
      <MapView
        style={[R.styles.mapView, mapViewStyles]}
        cacheEnabled={false}
        customMapStyle={mapStyles}
        ref={mapForwardRef}
        loadingEnabled={loadingEnabled}
        showsCompass={false}
        onMapReady={onMapReady}
        loadingIndicatorColor={loadingIndicatorColor}
        loadingBackgroundColor={loadingBackgroundColor}
        initialRegion={{
          latitude: pickUpLat ? pickUpLat : initialLat ? initialLat : -34.9884,
          longitude: pickUpLong
            ? pickUpLong
            : initialLong
            ? initialLong
            : 138.5397,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}>
        {children}
      </MapView>
    </SafeAreaView>
  );
}
export default Map;
