import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Text from '@components/common/Text';
import {NextArrow, OnBoardStep2} from '@components/utils/Svg';
import R from '@components/utils/R';

const originalWidth = 463;
const originalHeight = 170;
const aspectRatio = originalWidth / originalHeight;
const windowWidth = Dimensions.get('window').width;

function OnBoardingStep2(props) {
  const {navigation} = props;

  const onNext = () => {
    navigation.navigate('Login');
  };

  const onSkip = () => {
    navigation.navigate('Login');
  };

  return (
    <View
      style={{
        ...R.styles.container,
        ...R.styles.columnView,
        ...styles.mainLayout,
      }}>
      <View style={styles.textView}>
        <Text
          variant={'largeTitle'}
          font={'bold'}
          gutterTop={50}
          gutterBottom={30}
          color={R.color.white}
          align={'left'}
          transform={'none'}>
          Book a{' '}
          <Text color={R.color.mainColor} transform={'none'}>
            delivery{' '}
          </Text>
          anytime,{'\n'}anywhere
        </Text>

        <TouchableOpacity onPress={onNext} activeOpacity={0.7}>
          <NextArrow />
        </TouchableOpacity>

        <Text
          variant={'body1'}
          font={'bold'}
          gutterTop={80}
          gutterBottom={20}
          color={R.color.mainColor}
          align={'left'}
          style={{
            paddingVertical: R.unit.scale(10),
            width: '20%',
          }}
          onPress={onSkip}
          transform={'none'}>
          Skip
        </Text>
      </View>

      <View style={styles.pictureView}>
        <OnBoardStep2 />
      </View>
    </View>
  );
}
export default OnBoardingStep2;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.black,
    paddingHorizontal: 0,
  },
  textView: {
    width: '100%',
    height: '50%',
    paddingHorizontal: R.unit.scale(20),
  },
  pictureView: {
    height: '50%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  imageStyles: {
    width: '100%',
  },
});
