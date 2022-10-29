import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
// import navigationService from '../../../../../navigationService';
import StepIndicator from 'react-native-step-indicator';
import BottomSheet from '@components/common/BottomSheet';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

function ScheduleRideInProgressCard(props) {
  const labels = [
    'Cart',
    'Delivery Address',
    'Order Summary',
    'Payment Method',
    'Track',
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
    <BottomSheet maxHeight={labels.length}>
      <View style={styles.contentView}>
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
        <View style={styles.ScrollViewContainer}>
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <StepIndicator
              currentPosition={4}
              labels={labels}
              stepCount={labels.length}
              customStyles={customStyles}
              direction={'vertical'}
              renderStepIndicator={props => {
                return (
                  <View style={styles.stepView}>
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
                const {stepStatus, label} = props;
                return (
                  <View style={styles.labelView}>
                    <Text
                      variant={'body2'}
                      font={'bold'}
                      color={
                        stepStatus === 'finished'
                          ? R.color.gray5
                          : R.color.gray3
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
          </BottomSheetScrollView>
        </View>
        <View style={R.styles.rowView}>
          <Button
            value={`Ride is Completed`}
            bgColor={R.color.charcoalShade2}
            width={'45%'}
            size={'lg'}
            variant={'body2'}
            font={'semiBold'}
            gutterTop={R.unit.scale(32)}
            color={R.color.white}
            borderRadius={10}
            borderColor={R.color.lightSilverShade2}
            borderWidth={R.unit.scale(0.75)}
            loaderColor={'white'}
          />
          <Button
            value={`Start Ride`}
            bgColor={R.color.mainColor}
            width={'45%'}
            size={'lg'}
            variant={'body2'}
            font={'semiBold'}
            gutterTop={R.unit.scale(32)}
            color={R.color.black}
            borderRadius={10}
            borderColor={R.color.mainColor}
            loaderColor={'white'}
          />
        </View>
      </View>
    </BottomSheet>
  );
}
const styles = StyleSheet.create({
  contentView: {
    width: '100%',
    height: '100%',
    paddingTop: R.unit.scale(12),
    backgroundColor: R.color.charcoalShade2,
    paddingHorizontal: R.unit.scale(16),
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  ScrollViewContainer: {
    height: '70%',
    marginTop: R.unit.scale(24),
    borderRadius: R.unit.scale(12),
  },
  contentContainer: {
    paddingHorizontal: R.unit.scale(12),
    flexGrow: 1,
    backgroundColor: R.color.blackLightShade,
    paddingVertical: R.unit.scale(24),
    borderRadius: R.unit.scale(12),
    paddingBottom: 32,
  },
  stepView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelView: {
    width: R.unit.width(0.7),
    marginLeft: R.unit.scale(8),
  },
});

export default ScheduleRideInProgressCard;
