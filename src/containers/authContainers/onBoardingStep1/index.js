import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {NextArrow, OnBoardStep1} from '@components/utils/Svg';
import R from '@components/utils/R';
import {useDispatch} from 'react-redux';
import {onBoardPresent} from '@store/common/commonSlice';
import Text from '@components/common/Text';
import {firstTimePop} from '@store/auth/authSlice';

function OnBoardingStep1(props) {
  const dispatch = useDispatch();
  const {navigation} = props;

  const onNext = () => {
    navigation.navigate('OnBoardStep2');
    dispatch(firstTimePop(true));
  };

  const onSkip = () => {
    navigation.navigate('Login');
    dispatch(firstTimePop(true));
    dispatch(onBoardPresent(true));
  };

  return (
    <View style={[R.styles.container, R.styles.columnView, styles.mainLayout]}>
      <View style={styles.textView}>
        <Text
          variant={'h1'}
          font={'Sequel551'}
          gutterTop={80}
          gutterBottom={50}
          color={R.color.white}
          align={'left'}
          transform={'none'}>
          Make{' '}
          <Text color={R.color.mainColor} transform={'none'}>
            extra money{' '}
          </Text>
          driving on your own time
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
            font={'Sequel551'}
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
export default OnBoardingStep1;

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
    backgroundColor: 'rgba(70,70,70,0.3)',
    height: '100%',
    width: R.unit.width(1.5),
    overflow: 'hidden',
    borderTopRightRadius: R.unit.scale(380),
    borderTopLeftRadius: R.unit.scale(330),
  },
  smallEllipse: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(55,55,55,0.5)',
    borderTopRightRadius: R.unit.scale(430),
    borderTopLeftRadius: R.unit.scale(380),
    overflow: 'hidden',
    marginTop: R.unit.scale(20),
  },
});
