import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {isInRide} from '@store/user/userSlice';
import {scheduledRides} from '@store/scheduleRides/scheduleSlice';
import {useIsFocused} from '@react-navigation/native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import MediaDisplay from '@components/view/screen/Home/Instant/MediaDisplay';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import RideMap from '@components/view/screen/Home/Instant/RideMap';
import HoverText from '@components/common/HoverText';
import Button from '@components/common/Button';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import CancelBookingModal from '@components/view/modal/CancelBookingModal';
import PopUp from '@components/common/PopUp';
import {ClockReqIcon, WalletReqIcon} from '@components/utils/Svg';
import moment from 'moment';

function ScheduleRideDetailsScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const schedule = useSelector(state => state.schedule);
  const common = useSelector(state => state.common);
  const user = useSelector(state => state.user);
  const {type = undefined, data = undefined, screenType} = props.route.params;
  const {
    name,
    picture,
    productImages,
    isScheduled,
    scheduledTime,
    location,
    id,
    rideStatus,
    isCompleted,
  } = data;
  const [isModal, setIsModal] = useState(false);
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    if (!isCompleted) {
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
    } else {
      setButtonText('Ride Completed');
    }
  }, []);

  const openDirections = type => {
    let latitude;
    let longitude;
    let label;

    if (type === 'Pickup') {
      latitude = String(location.pickUpLoc.latitude);
      longitude = String(location.pickUpLoc.longitude);
      label = location.pickUpLocation;
    } else {
      latitude = String(location.dropOffLoc.latitude);
      longitude = String(location.dropOffLoc.latitude);
      label = location.dropOffLocation;
    }

    const url = Platform.select({
      ios: 'maps:' + latitude + ',' + longitude + '?q=' + label,
      android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
    });

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url =
          'https://www.google.de/maps/@' +
          latitude +
          ',' +
          longitude +
          '?q=' +
          label;
        return Linking.openURL(browser_url);
      }
    });
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

  console.log('========', rideStatus);

  const startScheduleRide = () => {
    let dataRide;
    if (rideStatus === 'notstarted') {
      dataRide = {
        data: {...data, rideStatus: 'pickupstarted', type: type},
        inRide: 'accepted',
      };
    } else if (rideStatus === 'pickupended') {
      dataRide = {
        data: {...data, rideStatus: 'dropoffstarted', type: type},
        inRide: 'accepted',
      };
    } else if (rideStatus === 'dropoffstarted') {
      dataRide = {
        data: {...data, rideStatus: 'dropoffended', type: type},
        inRide: 'accepted',
      };
    } else if (rideStatus === 'dropoffended') {
      dataRide = {
        data: {...data, rideStatus: 'dropoffended', type: type},
        inRide: 'ended',
      };
    }
    // console.log(':', dataRide);
    dispatch(isInRide(dataRide));
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

          <Divider lineStyles={styles.lineStyles} />

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
              {moment(scheduledTime.pickUpTime).format('ddd, DD MMM hh:mm a')}
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
              {moment(scheduledTime.dropOffTime).format('ddd, DD MMM hh:mm a')}
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
              ${data.cost}
            </Text>
          </View>
          <Text
            variant={'h4'}
            font={'Sequel551'}
            color={R.color.charcoalShade}
            gutterTop={24}
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
            onPress={() => openDirections('Pickup')}
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
            onPress={() => openDirections('Dropoff')}
          />
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
              disabled={isCompleted ? true : false}
              loaderColor={R.color.white}
              borderWidth={1}
              borderRadius={10}
              onPress={startScheduleRide}
            />
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
export default ScheduleRideDetailsScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(16),
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
