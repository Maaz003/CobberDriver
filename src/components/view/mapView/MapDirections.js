import React from 'react';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_GEOCODE} from '@env';
import R from '@components/utils/R';

const MapDirections = props => {
  Geocoder.init(GOOGLE_GEOCODE);
  const {
    setTime,
    origin,
    destination,
    strokeColor = R.color.black,
    strokeWidth = R.unit.tabSizeCalc(1.5, 3),
  } = props;

  return (
    <MapViewDirections
      origin={origin}
      destination={destination}
      apikey={GOOGLE_GEOCODE}
      strokeWidth={strokeWidth}
      strokeColor={strokeColor}
      timePrecision={'now'}
      precision={'high'}
      mode={'DRIVING'}
      optimizeWaypoints={true}
      splitWaypoints={true}
      onReady={result => {
        setTime(result.duration);
      }}
    />
  );
};
export default MapDirections;
