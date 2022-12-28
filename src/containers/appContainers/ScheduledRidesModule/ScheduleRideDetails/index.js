import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {imageUrl} from '@config/apiUrl';
import R from '@components/utils/R';
import {createRideSession} from '@store/ride/rideSlice';
import Text from '@components/common/Text';
import MediaDisplay from '@components/view/screen/Home/MediaDisplay';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import RideMap from '@components/view/screen/Home/RideMap';
import HoverText from '@components/common/HoverText';
import Button from '@components/common/Button';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import CancelBookingModal from '@components/view/modal/CancelBookingModal';
import {
  ClockReqIcon,
  DimensionIcon,
  WalletReqIcon,
} from '@components/utils/Svg';
import {
  openDirections,
  stringTrim,
  updateScheduleRideStartSession,
} from '@components/utils/ReuseableFunctions';
import PopUp from '@components/common/PopUp';
import TruckLoader from '@components/common/TruckLoader';

function ScheduleRideDetailsScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {type = undefined, data = undefined, mainRideId} = props.route.params;
  const {
    _id: rideId,
    images,
    isSchedule,
    rideStatus,
    pickUpAddress,
    dropOffAddress,
    pickUpLocation,
    dropOffLocation,
    pickUpTime,
    dropOffTime,
    fare,
    weight,
    length,
    depth,
    width,
    customer,
    status,
  } = data;
  const {displayName, photo, city, country, ratingsAverage} = customer;
  const user = useSelector(state => state.user);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const disabledStatuses = ['completed', 'cancelled'];

  const location = {
    pickUpLocation: stringTrim(pickUpAddress, 1),
    dropOffLocation: stringTrim(dropOffAddress, 1),
    pickUpLoc: {
      latitude: pickUpLocation?.coordinates[1],
      longitude: pickUpLocation?.coordinates[0],
    },
    dropOffLoc: {
      latitude: dropOffLocation?.coordinates[1],
      longitude: dropOffLocation?.coordinates[0],
    },
  };

  useEffect(() => {
    if (status === 'completed') {
      setButtonText('Ride Completed');
    } else if (status === 'cancelled') {
      setButtonText('Ride Cancelled');
    } else {
      switch (rideStatus) {
        case 'notstarted':
          setButtonText('Start Pickup');
          break;
        case 'pickupended':
          setButtonText('Start DropOff');
          break;
        case 'dropoffstarted':
          setButtonText('Complete DropOff');
          break;
        case 'dropoffended':
          setButtonText('Complete Ride');
          break;
      }
    }

    // if (status !== 'completed') {
    //   switch (rideStatus) {
    //     case 'notstarted':
    //       setButtonText('Start Pickup');
    //       break;
    //     case 'pickupended':
    //       setButtonText('Start DropOff');
    //       break;
    //     case 'dropoffstarted':
    //       setButtonText('Complete DropOff');
    //       break;
    //     case 'dropoffended':
    //       setButtonText('Complete Ride');
    //       break;
    //   }
    // }
    // else if (status === 'cancelled') {
    //   setButtonText('Ride Cancelled');
    // } else {
    //   setButtonText('Ride Completed');
    // }
  }, []);

  const headerProps = {
    isMainHeader: true,
    isSubHeader: false,
    mainHeading: 'Payment',
  };

  const backPress = () => {
    navigation.goBack();
  };

  const openModal = () => {
    setIsModal(!isModal);
  };

  const updateRideSessionStatus = async (rideSessionStatus, inRideStatus) => {
    let {
      pickUpLocation,
      dropOffLocation,
      pickUpAddress,
      dropOffAddress,
      ...rideSessionData
    } = data;
    rideSessionData = {...rideSessionData, location};
    const dataRide = {
      data: {
        ...rideSessionData,
        rideStatus: rideSessionStatus,
        mainRideId: mainRideId,
        type: type,
      },
      inRide: inRideStatus,
    };
    const popUpStatuses = {
      pickupstarted: 'PickUp Started',
      pickupended: 'PickUp Completed',
      dropoffstarted: 'DropOff Started',
      dropoffended: 'DropOff Completed',
    };
    PopUp({
      heading: popUpStatuses[rideSessionStatus],
      bottomOffset: 0.7,
      visibilityTime: 3000,
      position: 'top',
    });
    await dispatch(createRideSession(dataRide));
  };

  const startScheduleRide = async () => {
    if (rideStatus === 'notstarted') {
      let result = await updateRideSession('pickupstarted');
      let response = await startRide();
      if (result !== undefined) {
        updateRideSessionStatus('pickupstarted', 'accepted');
      }
    } else if (rideStatus === 'pickupended') {
      let result = await updateRideSession('dropoffstarted');
      if (result !== undefined) {
        updateRideSessionStatus('dropoffstarted', 'accepted');
      }
    } else if (rideStatus === 'dropoffstarted') {
      let result = await updateRideSession('dropoffended');
      if (result !== undefined) {
        updateRideSessionStatus('dropoffended', 'accepted');
      }
    } else if (rideStatus === 'dropoffended') {
      let result = await updateRideSession('dropoffended');
      if (result !== undefined) {
        updateRideSessionStatus('dropoffended', 'ended');
      }
    }
  };

  const startRide = async status => {
    setIsLoading(true);
    let reqBody = {
      rideId: mainRideId,
      scheduledRideId: rideId,
    };
    let response = await updateScheduleRideStartSession(
      'scheduling-rides/confirm/start',
      user?.userToken,
      reqBody,
    );
    setIsLoading(false);
    return response;
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
    setIsLoading(false);
    return response;
  };

  return (
    <ScreenBoiler props={props} headerProps={headerProps} backPress={backPress}>
      {isLoading && <TruckLoader />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[R.styles.container, styles.mainLayout]}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
          paddingBottom: R.unit.pdBottomList(50),
        }}>
        <View style={styles.contentView}>
          <Text
            variant={'h4'}
            font={'Sequel551'}
            color={R.color.blackShade3}
            align={'left'}
            gutterBottom={24}
            transform={'none'}>
            Ride Details
          </Text>
          <MediaDisplay productImages={images} />
          <View style={R.styles.twoItemsRow}>
            <Image
              source={{uri: imageUrl(photo)}}
              resizeMode={'cover'}
              style={styles.image}
            />
            <View>
              <Text
                variant={'h5'}
                font={'Sequel451'}
                color={R.color.charcoalShade}
                align={'left'}
                lineHeight={30}
                transform={'none'}>
                {displayName}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.tag}>
                  <Text
                    variant={'body4'}
                    font={'InterMedium'}
                    color={R.color.black}
                    align={'left'}
                    transform={'none'}>
                    {'Scheduled'}
                  </Text>
                </View>
                <View style={styles.tag}>
                  <Text
                    variant={'body4'}
                    font={'InterMedium'}
                    color={R.color.black}
                    align={'left'}
                    transform={'none'}>
                    {'Sharing'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[R.styles.twoItemsRow, styles.locationView]}>
            <Icon
              name={'star'}
              type={'Foundation'}
              color={R.color.mainColor}
              size={25}
            />
            <Text
              variant={'body2'}
              font={'InterRegular'}
              color={R.color.charcoalShade}
              align={'left'}
              style={{marginLeft: R.unit.scale(8)}}
              transform={'none'}>
              {ratingsAverage}
            </Text>
            <View style={styles.dot} />
            <Text
              variant={'body2'}
              font={'InterMedium'}
              color={R.color.charcoalShade}
              align={'left'}
              transform={'none'}>
              {city}
            </Text>

            <View style={styles.dot} />
            <Text
              variant={'body2'}
              font={'InterMedium'}
              color={R.color.charcoalShade}
              align={'left'}
              transform={'none'}>
              {country}
            </Text>
          </View>

          <Divider lineStyles={styles.lineStyles} />

          <Text
            variant={'h4'}
            font={'Sequel551'}
            color={R.color.charcoalShade}
            gutterTop={16}
            gutterBottom={4}
            align={'left'}
            transform={'none'}>
            Scheduled Time
          </Text>
          <Text
            variant={'body2'}
            font={'InterMedium'}
            color={R.color.charcoalShade}
            gutterTop={12}
            gutterBottom={4}
            align={'left'}
            transform={'none'}>
            PickUp Time
          </Text>
          <View style={[R.styles.twoItemsRow, styles.detailView]}>
            <View style={styles.svgView}>
              <ClockReqIcon height="100%" width="100%" fill={'#717171'} />
            </View>
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.gray4}
              align={'left'}
              style={{marginLeft: R.unit.scale(8)}}
              transform={'none'}>
              {moment(pickUpTime).format('ddd, DD MMM hh:mm a')}
            </Text>
          </View>

          <Text
            variant={'body2'}
            font={'InterMedium'}
            color={R.color.charcoalShade}
            gutterTop={12}
            gutterBottom={4}
            align={'left'}
            transform={'none'}>
            DropOff Time
          </Text>

          <View style={[R.styles.twoItemsRow, styles.detailView]}>
            <View style={styles.svgView}>
              <ClockReqIcon height="100%" width="100%" fill={'#717171'} />
            </View>
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.gray4}
              align={'left'}
              style={{marginLeft: R.unit.scale(8)}}
              transform={'none'}>
              {moment(dropOffTime).format('ddd, DD MMM hh:mm a')}
            </Text>
          </View>

          <Text
            variant={'body2'}
            font={'InterMedium'}
            color={R.color.charcoalShade}
            gutterTop={12}
            gutterBottom={4}
            align={'left'}
            transform={'none'}>
            Cost
          </Text>

          <View style={[R.styles.twoItemsRow, styles.detailView]}>
            <View style={{...styles.svgView, height: R.unit.scale(22)}}>
              <WalletReqIcon height="100%" width="100%" />
            </View>
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.gray4}
              align={'left'}
              style={{marginLeft: R.unit.scale(8)}}
              transform={'none'}>
              ${fare}
            </Text>
          </View>

          <Divider
            lineStyles={{
              ...styles.lineStyles,
              marginTop: R.unit.scale(12),
            }}
          />
          <Text
            variant={'h4'}
            font={'Sequel551'}
            color={R.color.charcoalShade}
            gutterTop={16}
            gutterBottom={4}
            align={'left'}
            transform={'none'}>
            Equipment Details
          </Text>

          <Text
            variant={'body2'}
            font={'InterMedium'}
            color={R.color.charcoalShade}
            gutterTop={12}
            gutterBottom={4}
            align={'left'}
            transform={'none'}>
            Dimensions
          </Text>

          <View style={[R.styles.twoItemsRow, styles.detailView]}>
            <View style={{...styles.svgView, height: R.unit.scale(22)}}>
              <DimensionIcon height="100%" width="100%" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.gray4}
                align={'left'}
                style={{marginLeft: R.unit.scale(5)}}
                transform={'none'}>
                Length : {length} m
              </Text>
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.gray4}
                align={'left'}
                style={{marginLeft: R.unit.scale(5)}}
                transform={'none'}>
                Width : {width} m
              </Text>
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.gray4}
                align={'left'}
                style={{marginLeft: R.unit.scale(5)}}
                transform={'none'}>
                Depth : {depth} m
              </Text>
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.gray4}
                align={'left'}
                style={{marginLeft: R.unit.scale(5)}}
                transform={'none'}>
                Weight : {weight} lbs
              </Text>
            </View>
          </View>
          <Divider
            lineStyles={{
              ...styles.lineStyles,
              marginTop: R.unit.scale(12),
            }}
          />
          <Text
            variant={'h4'}
            font={'Sequel551'}
            color={R.color.charcoalShade}
            gutterTop={16}
            gutterBottom={12}
            align={'left'}
            transform={'none'}>
            Location
          </Text>
          <RideMap location={location} />
          <Text
            variant={'body2'}
            font={'InterMedium'}
            color={R.color.charcoalShade}
            gutterTop={32}
            gutterBottom={8}
            align={'left'}
            transform={'none'}>
            PickUp
          </Text>
          <Text
            variant={'body3'}
            font={'semiBold'}
            color={R.color.gray6}
            gutterBottom={12}
            align={'left'}
            numberOfLines={3}
            transform={'none'}>
            {location.pickUpLocation}
          </Text>
          <HoverText
            text={'Get directions'}
            onPress={() => openDirections('Pickup', location)}
          />
          <Text
            variant={'body2'}
            font={'InterMedium'}
            color={R.color.charcoalShade}
            gutterTop={32}
            gutterBottom={8}
            align={'left'}
            transform={'none'}>
            DropOff
          </Text>
          <Text
            variant={'body3'}
            font={'semiBold'}
            color={R.color.gray6}
            gutterBottom={12}
            numberOfLines={3}
            align={'left'}
            transform={'none'}>
            {location.dropOffLocation}
          </Text>
          <HoverText
            text={'Get directions'}
            onPress={() => openDirections('Dropoff', location)}
          />
          {disabledStatuses?.includes(status) ? (
            <Button
              value={buttonText}
              bgColor={R.color.mainColor}
              width={'100%'}
              size={'lg'}
              color={R.color.blackShade2}
              gutterTop={20}
              borderColor={R.color.mainColor}
              disabled={disabledStatuses.includes(status)}
              loaderColor={R.color.white}
              borderWidth={1}
              borderRadius={10}
              onPress={startScheduleRide}
            />
          ) : (
            <View style={[R.styles.twoItemsRow, styles.buttonLayout]}>
              {rideStatus === 'notstarted' && (
                <Button
                  bgColor={R.color.white}
                  width={'16%'}
                  size={'lg'}
                  color={R.color.white}
                  borderColor={R.color.gray}
                  disabled={false}
                  loaderColor={R.color.white}
                  borderWidth={0.5}
                  borderRadius={10}
                  iconName={'close'}
                  iconType={'Ionicons'}
                  iconColor={R.color.blackShade2}
                  onPress={openModal}
                  rippleColor={R.color.gray}
                />
              )}

              <Button
                value={buttonText}
                bgColor={R.color.mainColor}
                width={rideStatus !== 'notstarted' ? '100%' : '82%'}
                size={'lg'}
                color={R.color.blackShade2}
                borderColor={R.color.mainColor}
                disabled={disabledStatuses.includes(status)}
                loaderColor={R.color.white}
                borderWidth={1}
                borderRadius={10}
                onPress={startScheduleRide}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <CancelBookingModal
        isVisibleModal={isModal}
        isScheduled={isSchedule}
        itemId={rideId}
        mainRideId={mainRideId}
        cancellationComplete={() => setIsRideAccepted(false)}
      />
    </ScreenBoiler>
  );
}
export default ScheduleRideDetailsScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(10),
    flex: 1,
  },
  contentView: {
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(16),
  },
  image: {
    height: R.unit.scale(70),
    width: R.unit.scale(70),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(12),
  },
  locationView: {
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(16),
  },
  dot: {
    height: R.unit.scale(4),
    width: R.unit.scale(4),
    backgroundColor: R.color.gray5,
    borderRadius: R.unit.scale(30),
    marginHorizontal: R.unit.scale(8),
  },
  lineStyles: {
    height: R.unit.scale(0.5),
    backgroundColor: R.color.gray2,
    marginBottom: R.unit.scale(6),
  },
  buttonLayout: {
    marginTop: R.unit.scale(32),
    width: '100%',
    justifyContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: R.unit.scale(2),
  },
  detailView: {
    marginBottom: R.unit.scale(4),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(17),
  },
  tag: {
    paddingHorizontal: R.unit.scale(12),
    paddingVertical: R.unit.scale(4),
    backgroundColor: R.color.mainColor,
    alignSelf: 'flex-start',
    borderRadius: R.unit.scale(8),
    marginTop: R.unit.scale(10),
    marginRight: R.unit.scale(6),
  },
});
