import R from '@components/utils/R';
import React from 'react';
import {Text as Textc, Platform} from 'react-native';

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
  extraLargeTitle: {
    fontSize: SIZES.extraLargeTitle,
    lineHeight: R.unit.scale(60, 0.3),
  },
  largeTitle: {
    fontSize: SIZES.largeTitle,
    lineHeight: R.unit.fontSize(50, 0.3),
  },
  h0: {fontSize: SIZES.h0, lineHeight: R.unit.fontSize(40, 0.3)},
  h1: {fontSize: SIZES.h1, lineHeight: R.unit.fontSize(38, 0.3)},
  h2: {fontSize: SIZES.h2, lineHeight: R.unit.fontSize(36, 0.3)},
  h3: {fontSize: SIZES.h3, lineHeight: R.unit.fontSize(30, 0.3)},
  h4: {fontSize: SIZES.h4, lineHeight: R.unit.fontSize(26, 0.3)},
  h5: {fontSize: SIZES.h5, lineHeight: R.unit.fontSize(24, 0.3)},
  h6: {fontSize: SIZES.h6, lineHeight: R.unit.fontSize(22, 0.3)},
  body1: {fontSize: SIZES.body1, lineHeight: R.unit.fontSize(20, 0.3)},
  body2: {fontSize: SIZES.body2, lineHeight: R.unit.fontSize(19, 0.3)},
  body3: {fontSize: SIZES.body3, lineHeight: R.unit.fontSize(18, 0.3)},
  body4: {fontSize: SIZES.body4, lineHeight: R.unit.fontSize(16, 0.3)},
  body5: {fontSize: SIZES.body5, lineHeight: R.unit.fontSize(14, 0.3)},
  body6: {fontSize: SIZES.body5, lineHeight: R.unit.fontSize(13, 0.3)},
  small: {fontSize: SIZES.small, lineHeight: R.unit.fontSize(12, 0.3)},
};
export const FONTSSTYLE = {
  black: {
    fontFamily: 'Nunito-Black',
  },
  blackItalic: {
    fontFamily: 'Nunito-BlackItalic',
  },
  bold: {
    fontFamily: 'Nunito-Bold',
  },
  boldItalic: {
    fontFamily: 'Nunito-BoldItalic',
  },
  extraBold: {
    fontFamily: 'Nunito-ExtraBold',
  },
  extraBoldItalic: {
    fontFamily: 'Nunito-ExtraBoldItalic',
  },
  italic: {
    fontFamily: 'Nunito-Italic',
  },
  lightItalic: {
    fontFamily: 'Roboto-LightItalic',
  },
  medium: {
    fontFamily: 'Nunito-Medium',
  },
  mediumItalic: {
    fontFamily: 'Nunito-MediumItalic',
  },
  regular: {
    fontFamily: 'Nunito-Regular',
  },
  semiBold: {
    fontFamily: 'Nunito-SemiBold',
  },
  semiBoldItalic: {
    fontFamily: 'Nunito-ThinItalic',
  },
  underline: {
    fontFamily: 'Nunito-Light',
    textDecorationLine: 'underline',
  },
};

const Text = props => {
  const {
    children,
    numberOfLines,
    style,
    variant,
    color = 'white',
    gutterTop = 0,
    gutterBottom = 0,
    align = 'auto',
    transform = 'none',
    font = '',
    letterSpacing = 0,
    top = 0,
    onPress,
  } = props;
  return (
    <Textc
      style={[
        {
          marginTop: R.unit.scale(gutterTop),
          marginBottom: R.unit.scale(gutterBottom),
          color: color,
          textAlign: align,
          textTransform: transform,
          letterSpacing: letterSpacing,
          top: top,
        },
        style,
        variant && FONTVARIANTS[variant],
        font && FONTSSTYLE[font],
      ]}
      onPress={onPress}
      numberOfLines={numberOfLines}>
      {children}
    </Textc>
  );
};

export default Text;
