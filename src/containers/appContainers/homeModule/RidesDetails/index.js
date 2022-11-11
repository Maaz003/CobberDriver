import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {rideSession} from '@store/user/userSlice';
import {scheduledRides} from '@store/scheduleRides/scheduleSlice';
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
import {tempRidesSet} from '@store/common/commonSlice';
import PopUp from '@components/common/PopUp';
import {ClockReqIcon, DimensionIcon} from '@components/utils/Svg';
import {openDirections} from '@components/utils/ReuseableFunctions';

function RideDetailsScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const schedule = useSelector(state => state.schedule);
  const common = useSelector(state => state.common);
  const {type = undefined, data = undefined} = props.route.params;
  const {
    name,
    picture,
    productImages,
    isScheduled,
    scheduledTime,
    location,
    cost,
  } = data;
  const [isModal, setIsModal] = useState(false);
  const [isRideAccepted, setIsRideAccepted] = useState(false);

  useEffect(() => {
    if (schedule?.scheduledRides.length > 0) {
      let obj = schedule?.scheduledRides.find(item => item.id === data.id);
      if (obj) {
        setIsRideAccepted(true);
      } else {
        setIsRideAccepted(false);
      }
    }
  }, [isFocused]);

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
    if (isScheduled) {
      let tempArr = JSON.parse(JSON.stringify(common.tempRides));
      let obj = tempArr.find(item => item.requestedRides);
      obj.requestedRides.find(item => item.id === data.id).isRejected = true;
      dispatch(tempRidesSet(tempArr));
      navigation.navigate('RideRequests', {
        data: obj.requestedRides,
      });
    } else {
      let tempArr = JSON.parse(JSON.stringify(common.tempRides));
      let objFound = tempArr.find(item => item.id === data.id);
      objFound.isRejected = true;
      await dispatch(tempRidesSet(tempArr));
      navigation.navigate('Home');
    }
  };

  const acceptRide = async () => {
    if (isScheduled) {
      let tempArr =
        schedule?.scheduledRides.length > 0
          ? [...schedule?.scheduledRides]
          : [];
      tempArr.push(data);
      setIsRideAccepted(true);
      await dispatch(scheduledRides(tempArr));
      PopUp({
        heading:
          'Ride Accepted.For more details go to schedules section in drawer',
        bottomOffset: 0.7,
        visibilityTime: 7000,
        position: 'top',
      });
    } else {
      const dataRide = {
        data: {...data, rideStatus: 'notstarted', type: type},
        inRide: 'accepted',
      };
      await dispatch(rideSession(dataRide));
      PopUp({
        heading: 'Ride Accepted',
        bottomOffset: 0.7,
        visibilityTime: 3000,
        position: 'top',
      });
    }
  };

  return (
    <ScreenBoiler props={props} headerProps={headerProps} backPress={backPress}>
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

          <MediaDisplay productImages={productImages} />

          <View style={R.styles.twoItemsRow}>
            <Image source={picture} resizeMode={'cover'} style={styles.image} />
            <View>
              <Text
                variant={'h5'}
                font={'Sequel451'}
                color={R.color.charcoalShade}
                align={'left'}
                lineHeight={30}
                transform={'none'}>
                {name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.tag}>
                  <Text
                    variant={'body4'}
                    font={'InterMedium'}
                    color={R.color.black}
                    align={'left'}
                    transform={'none'}>
                    {data?.isScheduled ? 'Scheduled' : 'Instant'}
                  </Text>
                </View>
                {data?.isScheduled && (
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
              5.0
            </Text>
            <View style={styles.dot} />
            <Text
              variant={'body2'}
              font={'InterMedium'}
              color={R.color.charcoalShade}
              align={'left'}
              transform={'none'}>
              New York
            </Text>

            <View style={styles.dot} />
            <Text
              variant={'body2'}
              font={'InterMedium'}
              color={R.color.charcoalShade}
              align={'left'}
              transform={'none'}>
              USA
            </Text>
          </View>

          {data?.isScheduled && (
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
                  {moment(scheduledTime.pickUpTime).format(
                    'ddd, DD MMM hh:mm a',
                  )}
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
                  {moment(scheduledTime.dropOffTime).format(
                    'ddd, DD MMM hh:mm a',
                  )}
                </Text>
              </View>
            </>
          )}

          <Divider
            lineStyles={{
              ...styles.lineStyles,
              marginTop: R.unit.scale(data?.isScheduled ? 12 : 0),
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
                Length : 30
              </Text>
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.gray4}
                align={'left'}
                style={{marginLeft: R.unit.scale(5)}}
                transform={'none'}>
                Width : 30
              </Text>
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.gray4}
                align={'left'}
                style={{marginLeft: R.unit.scale(5)}}
                transform={'none'}>
                Depth : 340
              </Text>
              <Text
                variant={'body3'}
                font={'InterRegular'}
                color={R.color.gray4}
                align={'left'}
                style={{marginLeft: R.unit.scale(5)}}
                transform={'none'}>
                Weight : 130
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
                  disabled={false}
                  loaderColor={R.color.white}
                  borderWidth={1}
                  borderRadius={10}
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
                  disabled={false}
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
        isScheduled={isScheduled}
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
