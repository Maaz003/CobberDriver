import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {PinLocation} from '@components/utils/Svg';
import {useDispatch, useSelector} from 'react-redux';
import {scheduledRides} from '@store/scheduleRides/scheduleSlice';
import {createRideSession} from '@store/user/userSlice';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import CancelBookingModal from '@components/view/modal/CancelBookingModal';
import PopUp from '@components/common/PopUp';
import {
  openCall,
  updateRideStartSession,
} from '@components/utils/ReuseableFunctions';
import {imageUrl} from '@config/apiUrl';
import moment from 'moment';

function RideInProgressCard(props) {
  const {data = undefined, navigation, duration} = props;
  const {_id: rideId, customer, location} = data;
  const {displayName, photo, contact} = customer;
  const dispatch = useDispatch();
  const schedule = useSelector(state => state.schedule);
  const user = useSelector(state => state.user);
  const [buttonText, setButtonText] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startRideLoader, setStartRideLoader] = useState(false);

  useEffect(() => {
    if (data) {
      if (data.type === 'schedule') {
        switch (data.rideStatus) {
          case 'pickupstarted':
            setButtonText('Complete Pickup');
            break;
          case 'pickupended':
            setButtonText('Start DropOff');
            break;
          case 'dropoffstarted':
            setButtonText('Complete DropOff');
            break;
        }
      } else {
        switch (data.rideStatus) {
          case 'notstarted':
            setButtonText('Start Ride');
            break;
          case 'pickupstarted':
            setButtonText('End Ride');
            break;
        }
      }
    }
  }, []);

  const openCancelModal = () => {
    setIsModal(!isModal);
  };

  const cancelRide = () => {
    openCancelModal();
  };

  const updateRideStatus = status => {
    let tempArr = JSON.parse(JSON.stringify(schedule?.scheduledRides));
    let obj = tempArr?.find(item => item.id === data.id);
    obj.rideStatus = status;
    dispatch(scheduledRides(tempArr));
  };

  const updateRideSession = async (
    rideSessionStatus,
    inRideStatus,
    popUpText,
  ) => {
    const dataRide = {
      data: {...data, rideStatus: rideSessionStatus, type: data.type},
      inRide: inRideStatus,
    };
    if (data.type !== 'instant') {
      updateRideStatus(rideSessionStatus);
    }
    const popUpStatuses = {
      notstarted: 'PickUp Started',
      pickupstarted: 'PickUp Completed',
      pickupended: 'DropOff Started',
      dropoffstarted: 'DropOff Completed',
    };
    PopUp({
      heading: popUpText ? popUpText : popUpStatuses[data.rideStatus],
      bottomOffset: 0.7,
      visibilityTime: 3000,
      position: 'top',
    });
    await dispatch(createRideSession(dataRide));
  };

  const onSubmit = async () => {
    if (data.type === 'instant') {
      if (data.rideStatus === 'notstarted') {
        setStartRideLoader(true);

        let estimatedTimeEnd = Math.ceil(duration).toFixed(2);
        estimatedTimeEnd = moment().add(estimatedTimeEnd, 'minutes');
        try {
          const response = await updateRideStartSession(
            rideId,
            user?.userToken,
            'in-ride',
            estimatedTimeEnd,
          );
          if (response !== undefined) {
            updateRideSession('pickupstarted', 'started', 'Ride Started');
            setStartRideLoader(false);
          }
        } catch (error) {
          PopUp({
            heading: 'Error in starting ride',
            bottomOffset: 0.7,
            visibilityTime: 3000,
            position: 'top',
          });
        }
        setStartRideLoader(false);
      } else {
        setIsLoading(true);
        try {
          const response = await updateRideStartSession(
            rideId,
            user?.userToken,
            'completed',
          );
          if (response !== undefined) {
            updateRideSession('dropoffended', 'ended', 'DropOff Completed');
            navigation.reset({
              index: 0,
              routes: [{name: 'RideCompleted'}],
            });
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          PopUp({
            heading: 'Error in ending ride',
            bottomOffset: 0.7,
            visibilityTime: 3000,
            position: 'top',
          });
        }
      }
    } else {
      if (data.rideStatus === 'pickupstarted') {
        updateRideSession('pickupended', 'scheduleEnded');
      } else if (data.rideStatus === 'pickupended') {
        updateRideSession('dropoffstarted', 'scheduleEnded');
      } else if (data.rideStatus === 'dropoffstarted') {
        updateRideSession('dropoffended', 'ended');
      }
    }
  };

  const locationIcon = () => {
    if (data.type === 'instant') {
      let pickUpStatuesInstant = ['notstarted', 'accepted'];
      if (pickUpStatuesInstant.includes(data.rideStatus)) {
        return <View style={styles.pickupEllipse} />;
      } else {
        return (
          <View style={styles.svgView}>
            <PinLocation height="100%" width="100%" fill={R.color.mainColor} />
          </View>
        );
      }
    } else {
      let pickUpStatuesSchedule = [
        'notstarted',
        'pickupstarted',
        'pickupended',
      ];
      if (pickUpStatuesSchedule.includes(data.rideStatus)) {
        return <View style={styles.pickupEllipse} />;
      } else {
        return (
          <View style={styles.svgView}>
            <PinLocation height="100%" width="100%" fill={R.color.mainColor} />
          </View>
        );
      }
    }
  };

  const locationTitle = () => {
    if (data.type === 'instant') {
      let pickUpStatuesInstant = ['notstarted', 'accepted'];
      if (pickUpStatuesInstant.includes(data.rideStatus)) {
        return (
          <Text
            variant={'body3'}
            font={'PoppinsRegular'}
            color={R.color.gray}
            align={'left'}
            style={{top: 2}}
            gutterBottom={5}
            transform={'none'}>
            User's PickUp Location
          </Text>
        );
      } else {
        return (
          <Text
            variant={'body3'}
            font={'PoppinsRegular'}
            color={R.color.gray}
            align={'left'}
            style={{top: 2}}
            gutterBottom={5}
            transform={'none'}>
            User's DropOff Location
          </Text>
        );
      }
    } else {
      let pickUpStatuesSchedule = [
        'notstarted',
        'pickupstarted',
        'pickupended',
      ];
      if (pickUpStatuesSchedule.includes(data.rideStatus)) {
        return (
          <Text
            variant={'body3'}
            font={'PoppinsRegular'}
            color={R.color.gray}
            align={'left'}
            style={{top: 2}}
            gutterBottom={5}
            transform={'none'}>
            User's PickUp Location
          </Text>
        );
      } else {
        return (
          <Text
            variant={'body3'}
            font={'PoppinsRegular'}
            color={R.color.gray}
            align={'left'}
            style={{top: 2}}
            gutterBottom={5}
            transform={'none'}>
            User's DropOff Location
          </Text>
        );
      }
    }
  };

  const locationText = () => {
    if (data.type === 'instant') {
      let pickUpStatuesInstant = ['notstarted', 'accepted'];

      if (pickUpStatuesInstant.includes(data.rideStatus)) {
        return (
          <Text
            variant={'body2'}
            font={'PoppinsMedium'}
            color={R.color.white}
            align={'left'}
            style={{top: 2}}
            gutterBottom={5}
            transform={'none'}>
            {location.pickUpLocation}
          </Text>
        );
      } else {
        return (
          <Text
            variant={'body2'}
            font={'PoppinsMedium'}
            color={R.color.white}
            align={'left'}
            style={{top: 2}}
            gutterBottom={5}
            transform={'none'}>
            {location.dropOffLocation}
          </Text>
        );
      }
    } else {
      let pickUpStatuesSchedule = [
        'notstarted',
        'pickupstarted',
        'pickupended',
      ];
      if (pickUpStatuesSchedule.includes(data.rideStatus)) {
        return (
          <Text
            variant={'body2'}
            font={'PoppinsMedium'}
            color={R.color.white}
            align={'left'}
            style={{top: 2}}
            gutterBottom={5}
            transform={'none'}>
            {location.pickUpLocation}
          </Text>
        );
      } else {
        return (
          <Text
            variant={'body2'}
            font={'PoppinsMedium'}
            color={R.color.white}
            align={'left'}
            style={{top: 2}}
            gutterBottom={5}
            transform={'none'}>
            {location.dropOffLocation}
          </Text>
        );
      }
    }
  };

  return (
    <View style={styles.mainLayout}>
      <View style={styles.notch} />
      <View style={styles.contentView}>
        <View style={R.styles.rowView}>
          <Image
            source={{uri: imageUrl(photo)}}
            resizeMode={'cover'}
            style={styles.image}
          />
          <Text
            variant={'body2'}
            font={'PoppinsSemiBold'}
            color={R.color.white}
            align={'left'}
            numberOfLines={2}
            style={{top: 2, flex: 1}}
            transform={'capitalize'}>
            {displayName}
          </Text>
          <View style={[R.styles.rowView, styles.iconContainer]}>
            <TouchableOpacity
              style={styles.iconView}
              onPress={() => {
                openCall(contact);
              }}>
              <Icon
                type={'FontAwesome'}
                name={'phone'}
                size={20}
                color={R.color.charcoalShade2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconView}
              onPress={() =>
                navigation.navigate('Chat', {
                  data: data,
                })
              }>
              <Icon
                type={'FontAwesome'}
                name={'envelope-o'}
                size={20}
                color={R.color.charcoalShade2}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Divider lineStyles={styles.dividerStyles} />
        <View style={{...R.styles.rowView}}>
          {locationIcon()}
          <View style={{flex: 1, marginLeft: R.unit.scale(12)}}>
            {locationTitle()}
            {locationText()}
          </View>
        </View>

        <Button
          value={buttonText}
          bgColor={R.color.mainColor}
          width={'90%'}
          size={'lg'}
          gutterTop={32}
          color={R.color.black}
          borderRadius={10}
          borderColor={R.color.mainColor}
          onPress={onSubmit}
          loader={
            data.rideStatus === 'notstarted' ? startRideLoader : isLoading
          }
          loaderColor={R.color.black}
          disabled={
            data.rideStatus === 'notstarted' ? startRideLoader : isLoading
          }
        />
        {data.rideStatus === 'notstarted' && (
          <Button
            value={'Cancel Ride'}
            bgColor={'#DB1A2D'}
            width={'90%'}
            size={'lg'}
            gutterTop={16}
            color={R.color.white}
            borderRadius={10}
            borderColor={R.color.mainColor}
            onPress={cancelRide}
            loader={isLoading}
            loaderColor={R.color.black}
            disabled={isLoading}
          />
        )}
      </View>
      <CancelBookingModal
        isVisibleModal={isModal}
        title={'Ride'}
        itemId={rideId}
        isScheduled={data?.isScheduled}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: R.unit.width(1),
    position: 'absolute',
    bottom: 0,
    zIndex: 99999999,
    backgroundColor: R.color.charcoalShade2,
    borderTopRightRadius: R.unit.scale(10),
    borderTopLeftRadius: R.unit.scale(10),
    paddingBottom: R.unit.scale(16),
  },
  notch: {
    width: R.unit.scale(60),
    height: R.unit.scale(5),
    borderRadius: R.unit.scale(40),
    backgroundColor: R.color.gray5,
    marginTop: R.unit.scale(10),
  },
  contentView: {
    width: '100%',
    marginTop: R.unit.scale(24),
    paddingHorizontal: R.unit.scale(12),
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
    backgroundColor: R.color.mainColor,
    borderRadius: R.unit.scale(40),
  },
  pickupEllipse: {
    height: R.unit.scale(20),
    width: R.unit.scale(20),
    backgroundColor: R.color.charcoalShade2,
    borderWidth: R.unit.scale(5),
    borderColor: R.color.mainColor,
    borderRadius: R.unit.scale(20),
  },
  dividerStyles: {
    marginTop: R.unit.scale(24),
    backgroundColor: R.color.gray4,
    height: R.unit.scale(0.5),
  },
});

export default RideInProgressCard;
