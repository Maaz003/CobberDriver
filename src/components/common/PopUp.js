import R from '@components/utils/R';
import Toast from 'react-native-toast-message';

const PopUp = props => {
  const {
    type = 'customToast',
    heading = 'HELLO',
    visibilityTime = 1000,
    leftIcon,
    rightIcon,
    bottomOffset = 0.8,
    position = 'bottom',
    textColor = R.color.mainColor,
    bgColor = R.color.charcoalShade,
  } = props;

  const hideToast = () => {
    Toast.hide();
  };

  Toast.show({
    type: type,
    text1: heading,
    position: position,
    autoHide: true,
    visibilityTime: visibilityTime,
    bottomOffset: R.unit.width(1) - R.unit.width(bottomOffset),
    keyboardOffset: R.unit.width(1) - R.unit.width(0.94),
    props: {
      leftIcon: leftIcon,
      rightIcon: rightIcon,
      textColor: textColor,
      bgColor: bgColor,
    },
    onPress: hideToast,
  });
};

export default PopUp;
