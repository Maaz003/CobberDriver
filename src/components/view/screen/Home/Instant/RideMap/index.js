import React, {useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import R from '@components/utils/R';
import MapView, {Marker} from 'react-native-maps';
import {mapStyles} from '@components/constants';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';
import {calculateDelta} from '@components/utils/ReuseableFunctions';

function RideMap() {
  const mapRef = useRef(null);

  let origin = {
    latitude: 24.9456063,
    longitude: 67.0920345,
  };

  let destination = {
    latitude: 24.9456063,
    longitude: 67.1441915,
  };

  useEffect(() => {
    let arr = [];
    arr.push(origin, destination);
    let navigationPoints = calculateDelta(arr);
    animatePickup(navigationPoints);
  }, [origin, destination]);

  const animatePickup = data => {
    console.log('DATA', data);
    const {latitude, latitudeDelta, longitude, longitudeDelta} = data;

    let region = {
      latitude: Number(latitude),
      longitude: Number(longitude),
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  const onMapReady = () => {
    animatePickup();
  };

  return (
    <View style={styles.mapWrappper}>
      <MapView
        style={styles.mapView}
        cacheEnabled={false}
        customMapStyle={mapStyles}
        ref={mapRef}
        // onMapReady={onMapReady}
        loadingEnabled={true}
        showsCompass={false}
        loadingIndicatorColor={R.color.mainColor}
        loadingBackgroundColor={'rgba(0,0,0,0.3)'}
        initialRegion={{
          latitude: 24.9162884,
          longitude: 67.0011,
          latitudeDelta: 0.922,
          longitudeDelta: 0.922,
        }}>
        <Marker
          coordinate={{
            latitude: 24.9162884,
            longitude: 67.0920345,
          }}
          tracksViewChanges={false}
          title={'User'}>
          <View style={R.styles.columnView}>
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
              {'Tech office'}
            </Text>
            <Icon
              name={'truck-moving'}
              type={'FontAwesome5'}
              size={25}
              color={R.color.black}
            />
          </View>
        </Marker>
        <Marker
          coordinate={{
            latitude: 24.9456063,
            longitude: 67.1441915,
          }}
          tracksViewChanges={false}
          title={'User'}>
          <View style={R.styles.columnView}>
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
              {'Hospital'}
            </Text>
            <Icon
              name={'box'}
              type={'FontAwesome5'}
              size={25}
              color={R.color.black}
            />
          </View>
        </Marker>
      </MapView>
    </View>
  );
}
export default RideMap;

const styles = StyleSheet.create({
  mapWrappper: {
    borderRadius: 10,
    height: 180,
    overflow: 'hidden',
  },
  mapView: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(16),
    width: R.unit.width(1),
    // height: '100%',
    flex: 1,
    borderRadius: R.unit.scale(100),
  },
});
