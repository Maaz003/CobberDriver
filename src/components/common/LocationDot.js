import R from '@components/utils/R';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const LocationDot = props => {
  const {color = R.color.black} = props;
  return (
    <View
      style={{
        borderColor: color,
        ...styles.container,
      }}>
      <View style={{...styles.subContainer, backgroundColor: color}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: R.unit.scale(0.75),
    height: R.unit.scale(12),
    width: R.unit.scale(12),
    borderRadius: R.unit.scale(10),
    padding: R.unit.scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: R.unit.scale(6),
  },
  subContainer: {
    width: R.unit.scale(8),
    height: R.unit.scale(8),
    borderRadius: R.unit.scale(20),
  },
});

export default LocationDot;
