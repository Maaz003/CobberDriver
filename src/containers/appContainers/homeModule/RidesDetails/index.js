import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import moment from 'moment';
import {imageUrl} from '@config/apiUrl';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import MediaDisplay from '@components/view/screen/Home/MediaDisplay';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import RideMap from '@components/view/screen/Home/RideMap';
import HoverText from '@components/common/HoverText';
import Button from '@components/common/Button';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import CancelBookingModal from '@components/view/modal/CancelBookingModal';
import PopUp from '@components/common/PopUp';
import {ClockReqIcon, DimensionIcon} from '@components/utils/Svg';
import {
  openDirections,
  stringTrim,
  updateRideStartSession,
  updateScheduleRideStartSession,
} from '@components/utils/ReuseableFunctions';
import TruckLoader from '@components/common/TruckLoader';
import {createRideSession} from '@store/ride/rideSlice';

function RideDetailsScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const {type = undefined, data = undefined, mainRideId} = props.route.params;
  const {
    _id: rideId,
    pickUpLocation,
    dropOffLocation,
    pickUpTime,
    dropOffTime,
    weight,
    length,
    depth,
    width,
    pickUpAddress,
    dropOffAddress,
    isSchedule,
    customer,
    images,
  } = data;
  const {displayName, photo, city, country, ratingsAverage} = customer;
  const [isModal, setIsModal] = useState(false);
  const [isRideAccepted, setIsRideAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const rejectRide = async () => {
    if (isSchedule) {
      setIsLoading(true);
      const reqBody = {
        rideId: mainRideId,
      };
      let response = await updateScheduleRideStartSession(
        'scheduling-rides/confirm/decline-request',
        user?.userToken,
        reqBody,
      );
      if (response !== undefined) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
        PopUp({
          heading: 'Ride Declined',
          bottomOffset: 0.7,
          visibilityTime: 3000,
          position: 'top',
        });
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
      let response = await updateRideStartSession(
        rideId,
        user?.userToken,
        'decline',
      );

      if (response !== undefined) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
        PopUp({
          heading: 'Ride Declined',
          bottomOffset: 0.7,
          visibilityTime: 3000,
          position: 'top',
        });
      }
      setIsLoading(false);
    }
  };

  const acceptRide = async () => {
    if (isSchedule) {
      setIsLoading(true);
      const reqBody = {
        rideId: mainRideId,
        scheduledRideId: rideId,
        status: 'accepted',
      };
      const response = await updateScheduleRideStartSession(
        'scheduling-rides/confirm/accept',
        user?.userToken,
        reqBody,
      );
      if (!!response?.results) {
        setIsLoading(false);
        PopUp({
          heading:
            'Ride Accepted For more details go to schedules section in drawer',
          bottomOffset: 0.7,
          visibilityTime: 7000,
          position: 'top',
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else setIsLoading(false);
    } else {
      setIsLoading(true);
      let {
        pickUpLocation,
        dropOffLocation,
        pickUpAddress,
        dropOffAddress,
        ...rideSessionData
      } = data;
      rideSessionData = {...rideSessionData, location};
      const dataRide = {
        data: {...rideSessionData, rideStatus: 'notstarted', type: type},
        inRide: 'accepted',
      };

      let response = await updateRideStartSession(
        rideId,
        user?.userToken,
        'accepted',
      );
      if (response !== undefined) {
        setIsLoading(false);
        await dispatch(createRideSession(dataRide));
        PopUp({
          heading: 'Ride Accepted',
          bottomOffset: 0.7,
          visibilityTime: 3000,
          position: 'top',
        });
      } else {
        setIsLoading(false);
      }
    }
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
                    {isSchedule ? 'Scheduled' : 'Instant'}
                  </Text>
                </View>
                {isSchedule && (
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
                )}
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
              {ratingsAverage.toFixed(1)}
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

          {isSchedule && (
            <>
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
            </>
          )}

          <Divider
            lineStyles={{
              ...styles.lineStyles,
              marginTop: R.unit.scale(isSchedule ? 12 : 0),
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

          <View
            style={[
              R.styles.twoItemsRow,
              {marginTop: R.unit.scale(12), alignItems: 'flex-start'},
            ]}>
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
            lineStyles={{...styles.lineStyles, marginTop: R.unit.scale(20)}}
          />

          <Text
            variant={'h4'}
            font={'Sequel551'}
            color={R.color.charcoalShade}
            gutterTop={24}
            gutterBottom={32}
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
            {pickUpAddress}
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
            {dropOffAddress}
          </Text>

          <HoverText
            text={'Get directions'}
            onPress={() => openDirections('Dropoff', location)}
          />

          <View style={[R.styles.twoItemsRow, styles.buttonLayout]}>
            {isRideAccepted ? (
              <>
                {!isRideAccepted && (
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
                  bgColor={R.color.mainColor}
                  width={!isRideAccepted ? '82%' : '100%'}
                  size={'lg'}
                  color={R.color.white}
                  borderColor={R.color.mainColor}
                  loaderColor={R.color.white}
                  borderWidth={1}
                  borderRadius={10}
                  loader={isLoading}
                  disabled={isLoading}
                  iconName={'chatbubble-ellipses-outline'}
                  iconType={'Ionicons'}
                  iconColor={R.color.blackShade2}
                  onPress={() =>
                    navigation.navigate('Chat', {
                      data: data,
                    })
                  }
                />
              </>
            ) : (
              <View style={R.styles.rowView}>
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
                  iconColor={R.color.blackShade3}
                  rippleColor={R.color.gray}
                  onPress={rejectRide}
                />
                <Button
                  value={'Accept'}
                  bgColor={R.color.mainColor}
                  width={isRideAccepted ? '100%' : '82%'}
                  size={'lg'}
                  variant={'body2'}
                  font={'PoppinsMedium'}
                  color={R.color.charcoalShade2}
                  borderColor={R.color.mainColor}
                  loaderColor={R.color.white}
                  borderWidth={1}
                  borderRadius={10}
                  onPress={acceptRide}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <CancelBookingModal
        isVisibleModal={isModal}
        isScheduled={isSchedule}
        itemId={data?.id}
        cancellationComplete={() => setIsRideAccepted(false)}
      />
    </ScreenBoiler>
  );
}
export default RideDetailsScreen;

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
    flexWrap: 'wrap',
  },
  dot: {
    height: R.unit.scale(4),
    width: R.unit.scale(4),
    backgroundColor: R.color.gray5,
    borderRadius: R.unit.scale(30),
    marginHorizontal: R.unit.scale(8),
  },
  buttonLayout: {
    marginTop: R.unit.scale(32),
    width: '100%',
    justifyContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: R.unit.scale(2),
  },
  cancelButton: {
    padding: R.unit.scale(15),
    borderColor: R.color.gray,
    borderWidth: R.unit.scale(0.5),
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(8),
  },
  chatButton: {
    backgroundColor: R.color.mainColor,
    padding: R.unit.scale(15),
    borderColor: R.color.gray,
    borderWidth: R.unit.scale(0.5),
    borderRadius: R.unit.scale(10),
    width: '83%',
    alignItems: 'center',
  },
  lineStyles: {
    height: R.unit.scale(0.75),
    backgroundColor: R.color.gray2,
    marginBottom: R.unit.scale(6),
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
