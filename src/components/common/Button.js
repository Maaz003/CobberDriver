import React from 'react';
import {
  StyleSheet,
  I18nManager,
  ActivityIndicator,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import Text from './Text';
import R from '@components/utils/R';
import Icon from './Icon';

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  extraLargeTitle: R.unit.fontSize(55),
  largeTitle: R.unit.fontSize(45),
  h0: R.unit.fontSize(36),
  h1: R.unit.fontSize(32),
  h2: R.unit.fontSize(28),
  h3: R.unit.fontSize(24),
  h4: R.unit.fontSize(22),
  h5: R.unit.fontSize(21),
  h6: R.unit.fontSize(18),
  body1: R.unit.fontSize(18),
  body2: R.unit.fontSize(16),
  body3: R.unit.fontSize(14),
  body4: R.unit.fontSize(12),
  body5: R.unit.fontSize(10),
  body6: R.unit.fontSize(9),
  small: R.unit.fontSize(8),
};

export const FONTVARIANTS = {
  extraLargeTitle: {fontSize: SIZES.extraLargeTitle},
  largeTitle: {fontSize: SIZES.largeTitle},
  h0: {fontSize: SIZES.h0, lineHeight: R.unit.scale(40, 0.3)},
  h1: {fontSize: SIZES.h1, lineHeight: R.unit.scale(38, 0.3)},
  h2: {fontSize: SIZES.h2, lineHeight: R.unit.scale(36, 0.3)},
  h3: {fontSize: SIZES.h3, lineHeight: R.unit.scale(30, 0.3)},
  h4: {fontSize: SIZES.h4, lineHeight: R.unit.scale(26, 0.3)},
  h5: {fontSize: SIZES.h5, lineHeight: R.unit.scale(24, 0.3)},
  h6: {fontSize: SIZES.h6, lineHeight: R.unit.scale(22, 0.3)},
  body1: {fontSize: SIZES.body1, lineHeight: R.unit.scale(20, 0.3)},
  body2: {fontSize: SIZES.body2, lineHeight: R.unit.scale(19, 0.3)},
  body3: {fontSize: SIZES.body3, lineHeight: R.unit.scale(18, 0.3)},
  body4: {fontSize: SIZES.body4, lineHeight: R.unit.scale(16, 0.3)},
  body5: {fontSize: SIZES.body5, lineHeight: R.unit.scale(14, 0.3)},
  small: {fontSize: SIZES.small, lineHeight: R.unit.scale(12, 0.3)},
};

export const FONTSSTYLE = {
  //IINTER FAMILY
  InterBlack: {
    fontFamily: 'Inter-Black', //(900)
  },
  InterThin: {
    fontFamily: 'Inter-Thin', //(100)
  },
  Interlight: {
    fontFamily: 'Inter-Light', //(300)
  },
  InterExtraLight: {
    fontFamily: 'Inter-ExtraLight', //(200)
  },
  InterBold: {
    fontFamily: 'Inter-Bold', //(700)
  },
  InterSemiBold: {
    fontFamily: 'Inter-SemiBold', //(600)
  },
  InterExtraBold: {
    fontFamily: 'Inter-ExtraBold', //(800)
  },
  InterMedium: {
    fontFamily: 'Inter-Medium', //(500)
  },
  InterRegular: {
    fontFamily: 'Inter-Regular', //(400)
  },
  InterUnderline: {
    fontFamily: 'nunito-Light',
    textDecorationLine: 'underline',
  },
  //POPPINSS FAMILY
  PoppinsBlack: {
    fontFamily: 'Poppins-Black',
  },
  PoppinsBlackItalic: {
    fontFamily: 'Poppins-BlackItalic',
  },
  PoppinsThin: {
    fontFamily: 'Poppins-Thin',
  },
  PoppinsThinItalic: {
    fontFamily: 'Poppins-ThinItalic',
  },
  PoppinsLight: {
    fontFamily: 'Poppins-Light',
  },
  PoppinsLightItalic: {
    fontFamily: 'Poppins-LightItalic',
  },
  PoppinsExtraLight: {
    fontFamily: 'Poppins-ExtraLight',
  },
  PoppinsExtraLightItalic: {
    fontFamily: 'Poppins-ExtraLightItalic',
  },
  PoppinsBold: {
    fontFamily: 'Poppins-Bold',
  },
  PoppinsBoldItalic: {
    fontFamily: 'Poppins-BoldItalic',
  },
  PoppinsSemiBold: {
    fontFamily: 'Poppins-SemiBold',
  },
  PoppinsSemiBoldItalic: {
    fontFamily: 'Poppins-SemiBoldItalic',
  },
  PoppinsExtraBold: {
    fontFamily: 'Poppins-ExtraBold',
  },
  PoppinsExtraBoldItalic: {
    fontFamily: 'Poppins-ExtraBoldItalic',
  },
  PoppinsMedium: {
    fontFamily: 'Poppins-Medium',
  },
  PoppinsMediumItalic: {
    fontFamily: 'Poppins-MediumItalic',
  },
  PoppinsRegular: {
    fontFamily: 'Poppins-Regular',
  },
  PoppinsItalic: {
    fontFamily: 'Poppins-Italic',
  },
  //SEQUEL 45
  Sequel451: {
    fontFamily:
      Platform.OS === 'android' ? 'Sequel-45file1' : 'Sequel100Wide-45',
  },
  Sequel452: {
    fontFamily:
      Platform.OS === 'android' ? 'Sequel-45file1' : 'Sequel100Wide-45',
  },
  //SEQUEL 55
  Sequel551: {
    fontFamily:
      Platform.OS === 'android' ? 'Sequel-55file1' : 'Sequel100Wide-55',
  },
  Sequel552: {
    fontFamily:
      Platform.OS === 'android' ? 'Sequel-55file2' : 'Sequel100Wide-55',
  },
  //SEQUEL 65
  Sequel651: {
    fontFamily:
      Platform.OS === 'android' ? 'Sequel-65file1' : 'Sequel100Wide-65',
  },
  Sequel652: {
    fontFamily:
      Platform.OS === 'android' ? 'Sequel-65file2' : 'Sequel100Wide-65',
  },
};

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
    btnWrapperStyles,
    color = 'white',
    gutterTop = 0,
    gutterBottom = 0,
    loader = false,
    loaderColor = 'white',
    borderColor = 'black',
    bgColor = 'white',
    borderWidth = 0,
    fontSize = 15,
    textStyles,
    font = 'InterBold',
    rippleColor = '#42700b',
    borderRadius,
    variant = 'body2',
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
          width: props.width,
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
            style={[
              styles.buttonText,
              {
                fontSize: fontSize,
                color: disabled ? R.color.gray4 : color,
              },
              variant && FONTVARIANTS[variant],
              font && FONTSSTYLE[font],
              textStyles,
            ]}>
            {!loader && props.value}
          </Text>
          {loader && (
            <ActivityIndicator
              style={styles.indicatorStyle}
              size="small"
              color={loaderColor}
            />
          )}
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
  text: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
  indicatorStyle: {
    paddingRight: R.unit.scale(5),
    paddingLeft: I18nManager.isRTL ? R.unit.scale(5) : 0,
  },
  iconCustom: {
    color: R.color.white,
  },
});

export default Button;
