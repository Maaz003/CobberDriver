import React, {useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import R from '@components/utils/R';
import {Marker} from 'react-native-maps';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';
import {calculateDelta} from '@components/utils/ReuseableFunctions';
import Map from '@components/view/mapView/Map';

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
    let arr = [];
    arr.push(origin, destination);
    let navigationPoints = calculateDelta(arr);
    animatePickup(navigationPoints);
  };

  return (
    <View style={styles.mapWrappper}>
      <Map
        mapViewStyles={styles.mapView}
        mapForwardRef={mapRef}
        mapReady={onMapReady}>
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
      </Map>
    </View>
  );
}
export default RideMap;

const styles = StyleSheet.create({
  mapWrappper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapView: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(16),
    width: R.unit.width(1),
    height: 180,
    flex: 1,
    borderRadius: R.unit.scale(100),
  },
});
