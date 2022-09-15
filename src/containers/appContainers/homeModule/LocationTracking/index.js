import React from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import MapView from 'react-native-maps';
import TrackingCard from '@components/view/cards/TrackingCard';

function LocationTracking(props) {
  return (
    <View style={{...styles.mainLayout}}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: 24.917075,
          longitude: 67.090969,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}></MapView>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}>
        <TrackingCard {...props} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
  },
  mapView: {
    height: R.unit.height(1),
    width: R.unit.width(1),
    top: 0,
  },
  pointerView: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    bottom: 0,
    right: 0,
  },
  textView: {
    zIndex: 99999,
    height: R.unit.height(0.25),
    width: R.unit.width(1),
    backgroundColor: R.color.black,
    borderTopLeftRadius: R.unit.scale(40),
    borderTopRightRadius: R.unit.scale(40),
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconView: {
    backgroundColor: R.color.mainColor,
    borderRadius: R.unit.scale(100),
    padding: R.unit.scale(10),
  },
});

export default LocationTracking;
