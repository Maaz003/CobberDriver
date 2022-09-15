import React from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';

const Divider = props => {
  const {lineStyles} = props;
  return <View style={[styles.horizontalLine, lineStyles]} />;
};
export default Divider;
const styles = StyleSheet.create({
  horizontalLine: {
    height: R.unit.scale(1),
    width: '100%',
    backgroundColor: R.color.gray4,
    marginBottom: R.unit.scale(24),
  },
});
