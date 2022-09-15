import React from 'react';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_GEOCODE} from '@env';
import R from '@components/utils/R';

const MapDirections = props => {
  Geocoder.init(GOOGLE_GEOCODE);

  const {setTime, origin, destination} = props;

  return (
    <MapViewDirections
      origin={origin}
      destination={destination}
      apikey={GOOGLE_GEOCODE}
      strokeWidth={1.5}
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
  );
};
export default MapDirections;
