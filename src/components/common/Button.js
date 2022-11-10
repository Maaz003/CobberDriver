import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import Text from './Text';
import R from '@components/utils/R';
import Icon from './Icon';

const Button = props => {
  const sizes = {
    sm: R.unit.scale(28),
    md: R.unit.scale(32),
    xmd: R.unit.scale(42),
    xxmd: R.unit.scale(45),
    lg: R.unit.scale(56),
  };

  const {
    size,
    width,
    btnWrapperStyles,
    color = 'white',
    gutterTop = 0,
    gutterBottom = 0,
    loader = false,
    loaderColor = 'white',
    borderColor = 'black',
    bgColor = 'white',
    borderWidth = 0,
    textStyles,
    variant = 'body2',
    font = 'PoppinsMedium',
    rippleColor = '#42700b',
    borderRadius,
    disabled,
    iconName,
    iconType,
    iconColor = R.color.white,
    iconSize = R.unit.tabSizeCalc(20, 20),
  } = props;

  const buttonPress = () => {
    props.onPress();
  };

  return (
    <View
      style={[
        styles.mainBtn,
        {
          width: width,
          height: sizes[size],
          backgroundColor: disabled ? R.color.disabledButtonColor : bgColor,
          borderColor: disabled ? R.color.disabledButtonColor : borderColor,
          marginTop: R.unit.scale(gutterTop),
          marginBottom: R.unit.scale(gutterBottom),
          borderWidth: R.unit.scale(borderWidth),
        },
        btnWrapperStyles,
        props.justifyContent && {
          justifyContent: props.justifyContent,
        },
        borderRadius && {
          borderRadius: R.unit.scale(borderRadius),
        },
      ]}>
      <TouchableNativeFeedback
        delayPressIn={0.1}
        delayPressOut={0.1}
        delayLongPress={0.1}
        disabled={disabled}
        background={TouchableNativeFeedback.Ripple(rippleColor, true, 300)}
        onPress={buttonPress}>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            font={font}
            variant={variant}
            gutterTop={5}
            color={disabled ? R.color.gray4 : color}
            align={'center'}
            style={[textStyles]}>
            {!loader && props.value}
          </Text>
          {loader && <ActivityIndicator size="small" color={loaderColor} />}
          {iconName && (
            <Icon
              name={iconName}
              type={iconType}
              color={iconColor}
              size={iconSize}
            />
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBtn: {
    flexDirection: 'row',
    borderRadius: R.unit.scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  iconCustom: {
    color: R.color.white,
  },
});

export default Button;
