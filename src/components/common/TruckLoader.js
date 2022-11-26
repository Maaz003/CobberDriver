import R from '@components/utils/R';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';

const TruckLoader = props => {
  const {overlayColor = 'rgba(0,0,0,0.65)', containerStyles} = props;
  return (
    <View
      style={{
        backgroundColor: overlayColor,
        ...styles.container,
        containerStyles,
      }}>
      <View style={styles.subContainer}>
        <Lottie
          source={require('../../assets/Images/car.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: R.unit.height(1),
    width: R.unit.width(1),
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    height: R.unit.scale(180),
    width: R.unit.scale(180),
    marginRight: 20,
  },
});

export default TruckLoader;
