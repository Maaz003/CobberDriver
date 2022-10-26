import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {mapStyles} from '@components/constants';
import R from '@components/utils/R';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import RideCompletedBox from '@components/view/screen/Home/RideCompletedBox';

function RideCompletedScreen(props) {
  const {navigation} = props;
  const mapRef = useRef(null);
  let coordinates = LocationCoordinates();
  const {pickUpLat, pickUpLong, initialLat, initialLong} = coordinates;

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={[R.styles.mainLayout, styles.mainLayout]}>
        <MapView
          style={styles.mapView}
          cacheEnabled={false}
          ref={mapRef}
          customMapStyle={mapStyles}
          loadingEnabled={true}
          showsCompass={false}
          showsBuildings={true}
          loadingIndicatorColor={R.color.mainColor}
          loadingBackgroundColor={'rgba(0,0,0,0.3)'}
          initialRegion={{
            latitude: pickUpLat ? pickUpLat : initialLat ? initialLat : 30.0002,
            longitude: pickUpLong
              ? pickUpLong
              : initialLong
              ? initialLong
              : 136.2092,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {/* <PickUpMarker
            pickUpLat={pickUpLat}
            pickUpLong={pickUpLong}
            addressRawPickup={addressRawPickup}
            initialLat={initialLat}
            initialLong={initialLong}
          /> */}
        </MapView>

        <RideCompletedBox />
      </View>
    </ScreenBoiler>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapView: {
    height: R.unit.height(1),
    width: R.unit.width(1),
    // flex: 1,
  },
});

export default RideCompletedScreen;
