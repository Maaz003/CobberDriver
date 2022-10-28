import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import navigationService from '../../../../../navigationService';
import StepIndicator from 'react-native-step-indicator';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

function ScheduleRideInProgressCard(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const sheetRef = useRef();
  const snapPoints = useMemo(() => ['10%', '90%'], []);
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);

  const labels = [
    'Cart',
    'Delivery Address',
    'Order Summary',
    'Payment Method',
    'Track',
  ];

  const customStyles = {
    stepIndicatorSize: 50,
    currentStepIndicatorSize: 50,
    separatorStrokeWidth: 4,
    currentStepStrokeWidth: 0,
    stepStrokeCurrentColor: R.color.mainColor,
    stepStrokeWidth: 1,
    // stepStrokeFinishedColor: R.color.mainColor,
    stepStrokeUnFinishedColor: R.color.gray,
    separatorFinishedColor: R.color.mainColor,
    separatorUnFinishedColor: R.color.lightSilverShade2,
    stepIndicatorFinishedColor: R.color.mainColor,
    stepIndicatorUnFinishedColor: R.color.lightSilverShade2,
    stepIndicatorCurrentColor: R.color.lightSilverShade2,
    stepIndicatorLabelUnFinishedColor: R.color.lightSilverShade2,
    // stepIndicatorLabelFinishedColor: '#ffffff',
    // labelColor: '#999999',
    // labelSize: 40,
    // currentStepLabelColor: '#fe7013',
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      backgroundStyle={styles.mainLayout}
      handleIndicatorStyle={styles.notch}
      onChange={handleSheetChange}>
      <View style={styles.mainLayout}>
        <View style={R.styles.rowView}>
          <Text
            variant={'body1'}
            font={'bold'}
            color={R.color.lightSilverShade1}
            align={'left'}
            style={{top: 2}}
            transform={'none'}>
            Track Order
          </Text>
          <Text
            variant={'body2'}
            font={'bold'}
            color={R.color.gray5}
            align={'right'}
            style={{top: 2}}
            transform={'none'}>
            NR208N
          </Text>
        </View>
        <View style={{height: '80%'}}>
          <StepIndicator
            currentPosition={3}
            labels={labels}
            customStyles={customStyles}
            direction={'vertical'}
            renderStepIndicator={props => {
              return (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name={'check'}
                    type={'FontAwesome'}
                    size={20}
                    color={
                      props.stepStatus === 'finished'
                        ? R.color.white
                        : R.color.charcoalShade2
                    }
                  />
                </View>
              );
            }}
            renderLabel={props => {
              console.log('P', props);
              const {stepStatus, label} = props;
              return (
                <View
                  style={{
                    width: R.unit.width(0.7),
                    marginLeft: R.unit.scale(8),
                  }}>
                  <Text
                    variant={'body2'}
                    font={'bold'}
                    color={
                      stepStatus === 'finished' ? R.color.gray5 : R.color.gray5
                    }
                    align={'left'}
                    style={{top: 2}}
                    transform={'none'}>
                    {label}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    // alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: R.color.charcoalShade2,
    paddingHorizontal: R.unit.scale(16),
  },
  notch: {
    width: R.unit.scale(40),
    height: R.unit.scale(5),
    borderRadius: R.unit.scale(40),
    backgroundColor: R.color.gray5,
    marginTop: R.unit.scale(5),
  },
  contentView: {
    width: '100%',
    marginTop: R.unit.scale(24),
    paddingHorizontal: R.unit.scale(16),
  },
  image: {
    height: R.unit.scale(60),
    width: R.unit.scale(60),
    borderRadius: R.unit.scale(70),
    marginRight: R.unit.scale(12),
    borderColor: R.color.black,
    borderWidth: R.unit.scale(1),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(20),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    width: '24%',
  },
  iconView: {
    height: R.unit.scale(40),
    width: R.unit.scale(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(134, 242, 10,0.7)',
    borderRadius: R.unit.scale(40),
  },
  pickupEllipse: {
    height: R.unit.scale(20),
    width: R.unit.scale(20),
    backgroundColor: R.color.white,
    borderWidth: R.unit.scale(5),
    borderColor: R.color.mainColor,
    borderRadius: R.unit.scale(20),
  },
});

export default ScheduleRideInProgressCard;
