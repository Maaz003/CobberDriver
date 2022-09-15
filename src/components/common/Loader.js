import R from '@components/utils/R';
import React from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';

const Loader = props => {
  const {size = 'small', color = R.color.gray} = props;
  return (
    <View
      style={[
        styles.container,
        props?.bgColor && {
          backgroundColor: props?.bgColor,
        },
      ]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});

export default Loader;
