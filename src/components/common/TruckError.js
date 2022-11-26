import R from '@components/utils/R';
import {TruckErrorIcon} from '@components/utils/Svg';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from './Text';

const TruckError = props => {
  const {
    svgColor = R.color.black,
    headingColor,
    subTextColor,
    heading = 'You have no booking requests yet',
    subText = 'As soon as the someone books a ride with you it will appear in this list.',
    svgBgColor = R.color.mainColor,
    containerStyles,
    svgStyles,
  } = props;
  return (
    <View style={{...styles.container, ...containerStyles}}>
      <View
        style={{...styles.svgView, backgroundColor: svgBgColor, ...svgStyles}}>
        <TruckErrorIcon height="100%" width="100%" fill={svgColor} />
      </View>
      <Text
        variant={'h4'}
        font={'Sequel451'}
        gutterTop={24}
        color={headingColor ? headingColor : R.color.black}
        align={'center'}
        transform={'none'}>
        {heading}
      </Text>
      <Text
        variant={'body2'}
        font={'InterRegular'}
        gutterTop={8}
        color={subTextColor ? subTextColor : R.color.black}
        align={'center'}
        style={{width: '70%'}}
        transform={'none'}>
        {subText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(60),
    backgroundColor: 'red',
    borderRadius: 100,
  },
});

export default TruckError;
