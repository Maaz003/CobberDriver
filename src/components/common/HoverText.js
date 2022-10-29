import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import Icon from './Icon';
import Text from './Text';

const HoverText = props => {
  const {
    text = 'Forgot Password',
    onPress,
    hoverStyles,
    textColor = R.color.blueShade1,
    iconColor = R.color.blueShade1,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.mainLayout, hoverStyles]}
      onPress={onPress}>
      <Text
        variant={'body2'}
        font={'medium'}
        color={textColor}
        align={'left'}
        transform={'none'}>
        {text}
      </Text>
      <Icon
        name={'arrow-top-right'}
        size={15}
        type={'MaterialCommunityIcons'}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};
export default HoverText;
const styles = StyleSheet.create({
  mainLayout: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '30%',
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.03),
  },
});
