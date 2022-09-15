import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  BackHandler,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  scheduledRideTime,
  confirmPickUp,
  confirmDropOff,
} from '@store/user/userSlice';
import {timeFormatSchedule} from '@components/utils/ReuseableFunctions';
import {getAddressFromCoordinates} from '@components/utils/CurrentLocation';
import {LocationCoordinates} from '@components/utils/LocationCoordinates';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import LocationModal from '@components/view/modal/LocationModal';
import ScheduleRideModal from '@components/view/modal/ScheduleRideModal';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import SkeletonLoader from '@components/common/SkeletonLoader';
import {useFocusEffect} from '@react-navigation/native';

function PickUpLocationCard(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  let coordinates = LocationCoordinates();
  const {initialLat, initialLong} = coordinates;
  const pickupAddr = user?.pickupLoc?.address;
  const loader = user?.locationLoader;
  const [isModal, setIsModal] = useState(false);
  const [isScheduleModal, setIsScheduleModal] = useState(false);
  const [pickUpTime, setPickUpTime] = useState();
  const [address, setAddress] = useState();

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {text: 'Cancel'},
          {
            text: 'Yes',
            onPress: () => {
              let reqData = undefined;
              dispatch(scheduledRideTime(reqData));
              let CooOrdiantes = undefined;
              dispatch(confirmDropOff(CooOrdiantes));

              BackHandler.exitApp();
            },
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  useEffect(() => {
    if (user?.scheduledTime?.pickUpTime) {
      let formatted = timeFormatSchedule(user?.scheduledTime?.pickUpTime);
      setPickUpTime(formatted);
    } else {
      setPickUpTime();
    }
  }, [user?.scheduledTime]);

  useEffect(() => {
    if (user?.pickupLoc === undefined) {
      getAddress();
    }
  }, []);

  const getAddress = async () => {
    let response = await getAddressFromCoordinates(initialLat, initialLong);
    setAddress(response?.address);
    dispatch(confirmPickUp(response));
  };

  const openModal = () => {
    setIsModal(!isModal);
  };

  const openScheduleModal = flag => {
    setIsScheduleModal(!isScheduleModal);
  };

  const pickUpScheduleTime = data => {
    let formatted = timeFormatSchedule(data?.date);
    let reqData =
      user?.scheduledTime !== undefined
        ? {
            ...user?.scheduledTime,
            pickUpTime: data?.date,
            pickUpSlot: data?.time,
          }
        : {pickUpTime: data?.date, pickUpSlot: data?.time};
    dispatch(scheduledRideTime(reqData));
    setPickUpTime(formatted);
  };

  const onSubmit = () => {
    navigation.navigate('DropOffLocation');
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
              Pick-Up Location
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
                {pickUpTime ? pickUpTime : 'Now'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[R.styles.twoItemsRow, styles.locationView]}
            activeOpacity={0.6}
            onPress={() => openModal('Pickup')}>
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
              {pickupAddr
                ? pickupAddr
                : address
                ? address
                : 'Enter Pickup location'}
            </Text>
          </TouchableOpacity>

          <Button
            value={`Confirm PickUp`}
            bgColor={R.color.mainColor}
            width={'95%'}
            size={'xmd'}
            variant={'body2'}
            font={'semiBold'}
            disabled={pickupAddr || address ? false : true}
            color={'black'}
            borderRadius={100}
            onPress={onSubmit}
            borderColor={R.color.mainColor}
            loaderColor={'white'}
          />
        </View>
      )}
      <LocationModal isVisibleModal={isModal} {...props} locType={'Pick-Up'} />

      <ScheduleRideModal
        isVisibleModal={isScheduleModal}
        {...props}
        scheduleTime={pickUpScheduleTime}
        locType={'Pick-Up'}
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

export default PickUpLocationCard;
