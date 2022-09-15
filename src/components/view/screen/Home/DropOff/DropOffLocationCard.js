import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Toast from '@components/utils/Toast';
import {scheduledRideTime} from '@store/user/userSlice';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import LocationModal from '@components/view/modal/LocationModal';
import ScheduleRideModal from '@components/view/modal/ScheduleRideModal';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import {timeFormatSchedule} from '@components/utils/ReuseableFunctions';
import SkeletonLoader from '@components/common/SkeletonLoader';
import {requestLocationPermissionIOS} from '@components/utils/Validators';

function DropOffLocationCard(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const dropOffAddr = user?.dropOffLoc?.address;
  const loader = user?.locationLoader;
  const [isModal, setIsModal] = useState(false);
  const [isScheduleModal, setIsScheduleModal] = useState(false);
  const [dropOffTime, setDropOffTime] = useState();
  const [pickUpTime, setPickUpTime] = useState();

  useEffect(() => {
    if (user?.scheduledTime?.dropOffTime) {
      let formatted = timeFormatSchedule(user?.scheduledTime?.dropOffTime);
      setDropOffTime(formatted);
    } else {
      setDropOffTime();
    }
  }, [user?.scheduledTime]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestLocationIOS();
    }
  }, []);

  const requestLocationIOS = async () => {
    let granted = await requestLocationPermissionIOS();
  };

  const openModal = () => {
    setIsModal(!isModal);
  };

  const openScheduleModal = () => {
    setIsScheduleModal(!isScheduleModal);
  };

  useEffect(() => {
    if (user?.scheduledTime?.pickUpTime) {
      let formatted = timeFormatSchedule(user?.scheduledTime?.pickUpTime);
      setPickUpTime(formatted);
    } else {
      setPickUpTime();
    }
  }, [user?.scheduledTime]);

  const dropOffScheduleTime = data => {
    let formatted = timeFormatSchedule(data?.date);
    let reqData =
      user?.scheduledTime !== undefined
        ? {
            ...user?.scheduledTime,
            dropOffTime: data?.date,
            dropOffSlot: data?.time,
          }
        : {dropOffTime: data?.date, dropOffSlot: data?.time};

    dispatch(scheduledRideTime(reqData));
    setDropOffTime(formatted);
  };

  const onSubmit = () => {
    let endTime = user?.scheduledTime?.dropOffTime;
    let startTime = user?.scheduledTime?.pickUpTime;
    let difference = moment(endTime).diff(moment(startTime));
    if (user?.scheduledTime) {
      if (dropOffTime === undefined) {
        Toast.show({
          type: 'danger',
          title: 'PickUp Time not selected',
          message:
            'Since you have opted for schedule ride. Please select dropoff time too',
          duration: 3000,
        });
      } else if (difference < 0) {
        Toast.show({
          type: 'danger',
          title: 'DropOff Time Error',
          message: `DropOff time shouldn't be before Pickup Time`,
          duration: 3000,
        });
      } else {
        navigation.navigate('AddProductDetails');
      }
    } else {
      navigation.navigate('AddProductDetails');
    }
  };

  return (
    <View style={[styles.mainLayout, R.styles.centeredView]}>
      {loader ? (
        <SkeletonLoader />
      ) : (
        <View style={styles.subLayout}>
          <View style={[R.styles.rowView, styles.headingView]}>
            <Text
              variant={'h4'}
              font={'bold'}
              color={R.color.white}
              align={'center'}
              transform={'none'}>
              Drop-off Location
            </Text>

            <TouchableOpacity
              onPress={openScheduleModal}
              style={[R.styles.twoItemsRow, styles.timeView]}>
              <Icon
                name={'calendar'}
                type={'FontAwesome'}
                color={R.color.mainColor}
                size={15}
              />
              <Text
                variant={'body4'}
                font={'semiBold'}
                color={R.color.mainColor}
                align={'center'}
                style={{marginLeft: R.unit.scale(5)}}
                transform={'none'}>
                {dropOffTime ? dropOffTime : pickUpTime ? pickUpTime : 'Now'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[R.styles.twoItemsRow, styles.locationView]}
            activeOpacity={0.6}
            onPress={openModal}>
            <View style={styles.iconView}>
              <Icon
                name={'location-pin'}
                type={'Entypo'}
                color={R.color.mainColor}
                size={30}
              />
            </View>
            <Text
              variant={'body3'}
              font={'regular'}
              color={R.color.white}
              style={{
                marginLeft: R.unit.scale(12),
                maxWidth: '80%',
              }}
              align={'left'}
              numberOfLines={2}
              transform={'none'}>
              {dropOffAddr ? dropOffAddr : 'Enter Drop Off location'}
            </Text>
          </TouchableOpacity>

          <Button
            value={`Confirm DropOff`}
            bgColor={R.color.mainColor}
            width={'95%'}
            size={'xmd'}
            variant={'body2'}
            disabled={dropOffAddr ? false : true}
            font={'semiBold'}
            color={'black'}
            borderRadius={100}
            onPress={onSubmit}
            borderColor={R.color.mainColor}
            loaderColor={'white'}
          />
        </View>
      )}
      <LocationModal isVisibleModal={isModal} locType={'Drop-Off'} />

      <ScheduleRideModal
        isVisibleModal={isScheduleModal}
        scheduleTime={dropOffScheduleTime}
        locType={'Drop-Off'}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    zIndex: 99999,
    width: R.unit.width(1),
    backgroundColor: R.color.black,
    borderTopLeftRadius: R.unit.scale(20),
    borderTopRightRadius: R.unit.scale(20),
    backgroundColor: R.color.charcoalShade2,
    position: 'absolute',
    bottom: Platform.OS === 'ios' && R.unit.height(1) > 800 ? -40 : 0,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: R.unit.scale(16),
    paddingVertical:
      Platform.OS === 'ios' && R.unit.height(1) > 800
        ? R.unit.scale(40)
        : R.unit.scale(25),
  },
  headingView: {
    paddingHorizontal: R.unit.scale(10),
    marginBottom: R.unit.scale(16),
  },
  locationView: {
    marginBottom: R.unit.scale(10),
    paddingHorizontal: 0,
    marginBottom: R.unit.scale(16),
  },
  subLayout: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconView: {
    backgroundColor: R.color.blackLightShade,
    padding: R.unit.scale(10),
    borderRadius: R.unit.scale(120),
  },
  timeView: {
    paddingHorizontal: 0,
  },
});

export default DropOffLocationCard;
