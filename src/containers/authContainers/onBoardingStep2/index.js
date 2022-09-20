import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Text from '@components/common/Text';
import {NextArrow, OnBoardStep1} from '@components/utils/Svg';
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
          variant={'h1'}
          font={'bold'}
          gutterTop={80}
          gutterBottom={50}
          color={R.color.white}
          align={'left'}
          transform={'none'}>
          Experience{' '}
          <Text color={R.color.mainColor} transform={'none'}>
            new{' '}
          </Text>
          and{'  '}
          <Text color={R.color.mainColor} transform={'none'}>
            improved{' '}
          </Text>
          app{'\n'}features
        </Text>

        <TouchableOpacity
          onPress={onNext}
          activeOpacity={0.7}
          style={{
            width: '20%',
          }}>
          <NextArrow />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSkip}
          style={{width: '20%', paddingVertical: R.unit.scale(10)}}>
          <Text
            variant={'body1'}
            font={'bold'}
            gutterTop={30}
            gutterBottom={20}
            color={R.color.mainColor}
            align={'left'}
            style={{
              paddingVertical: R.unit.scale(10),
              width: '100%',
            }}
            transform={'none'}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pictureView}>
        <View style={styles.bigEllipse}>
          <View style={styles.smallEllipse}>
            <View style={styles.svgView}>
              <OnBoardStep1 />
            </View>
          </View>
        </View>
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
    height: R.unit.height(0.5),
    paddingHorizontal: R.unit.scale(16),
  },
  pictureView: {
    height: R.unit.height(0.5),
    width: '100%',
    justifyContent: 'flex-end',
  },
  imageStyles: {
    width: '100%',
  },
  pictureView: {
    height: R.unit.height(0.5),
  },
  svgView: {
    height: R.unit.height(0.5),
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: R.unit.scale(30),
  },
  imageStyles: {
    width: '100%',
  },
  bigEllipse: {
    backgroundColor: '#202020',
    height: '100%',
    width: R.unit.width(1.5),
    overflow: 'hidden',
    borderTopRightRadius: R.unit.scale(330),
    borderTopLeftRadius: R.unit.scale(340),
  },
  smallEllipse: {
    height: '100%',
    width: '100%',
    backgroundColor: '#191919',
    borderTopRightRadius: R.unit.scale(330),
    borderTopLeftRadius: R.unit.scale(340),
    overflow: 'hidden',
    marginTop: R.unit.scale(20),
  },
});
