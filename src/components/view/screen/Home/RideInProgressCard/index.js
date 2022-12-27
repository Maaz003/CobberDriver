import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {PinLocation} from '@components/utils/Svg';
import {createRideSession} from '@store/ride/rideSlice';
import {useDispatch, useSelector} from 'react-redux';
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
  updateScheduleRideStartSession,
} from '@components/utils/ReuseableFunctions';
import {imageUrl} from '@config/apiUrl';
import moment from 'moment';

function RideInProgressCard(props) {
  const {data = undefined, navigation, duration} = props;
  const {_id: rideId, customer, location, mainRideId, isSchedule} = data;
  const {displayName, photo, contact} = customer;
  const dispatch = useDispatch();
  const schedule = useSelector(state => state.schedule);
  const user = useSelector(state => state.user);
  const [buttonText, setButtonText] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startRideLoader, setStartRideLoader] = useState(false);
  const [etaDistance, setEtaDistance] = useState(duration);
  const [buttonColor, setButtonColor] = useState(R.color.mainColor);
  const [textButtoncolor, setTextButtoncolor] = useState(R.color.black);

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
            setButtonColor('#DB1A2D');
            setTextButtoncolor(R.color.white);
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
            setButtonColor('#DB1A2D');
            setTextButtoncolor(R.color.white);
            break;
        }
      }
    }
  }, []);

  useEffect(() => {
    // if(duration === 0)
    // {

    // }
    // else
    // {

    //   setEtaDistance(duration);
    // }
    setEtaDistance(duration);
  }, [props]);

  const openCancelModal = () => {
    setIsModal(!isModal);
  };

  const cancelRide = () => {
    openCancelModal();
  };

  const updateRideSessionStatus = async (
    rideSessionStatus,
    inRideStatus,
    popUpText,
  ) => {
    const dataRide = {
      data: {...data, rideStatus: rideSessionStatus, type: data.type},
      inRide: inRideStatus,
    };
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

  const updateRideSession = async status => {
    setIsLoading(true);
    let reqBody = {
      rideId: mainRideId,
      scheduledRideId: rideId,
      status,
    };
    let response = await updateScheduleRideStartSession(
      'scheduling-rides/confirm/rideStatus',
      user?.userToken,
      reqBody,
    );
    if (response === undefined) setIsLoading(false);
    setIsLoading(false);
    return response;
  };

  const completeScheduleRide = async () => {
    let reqBody = {
      rideId: mainRideId,
      scheduledRideId: rideId,
      status: 'completed',
    };
    let response = await updateScheduleRideStartSession(
      'scheduling-rides/confirm/complete',
      user?.userToken,
      reqBody,
    );
    return response;
  };

  const onSubmit = async () => {
    if (data.type === 'instant') {
      if (data.rideStatus === 'notstarted') {
        setStartRideLoader(true);
        let estimatedTimeEnd = Math.ceil(etaDistance).toFixed(2);
        estimatedTimeEnd = moment().add(estimatedTimeEnd, 'minutes');
        try {
          const response = await updateRideStartSession(
            rideId,
            user?.userToken,
            'in-ride',
            estimatedTimeEnd,
          );
          if (response !== undefined) {
            updateRideSessionStatus('pickupstarted', 'started', 'Ride Started');
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
            updateRideSessionStatus(
              'dropoffended',
              'ended',
              'DropOff Completed',
            );
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
        let result = await updateRideSession('pickupended');
        if (result !== undefined) {
          updateRideSessionStatus('pickupended', 'scheduleEnded');
        }
      } else if (data.rideStatus === 'pickupended') {
        let result = await updateRideSession('dropoffstarted');
        if (result !== undefined) {
          updateRideSessionStatus('dropoffstarted', 'scheduleEnded');
        }
      } else if (data.rideStatus === 'dropoffstarted') {
        try {
          setIsLoading(true);
          let promiseAll = await Promise.all([
            updateRideSession('dropoffended'),
            completeScheduleRide(),
          ]);
          if (promiseAll !== undefined) {
            updateRideSessionStatus('dropoffended', 'ended');
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
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
          bgColor={buttonColor}
          width={'90%'}
          size={'lg'}
          gutterTop={32}
          color={textButtoncolor}
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
