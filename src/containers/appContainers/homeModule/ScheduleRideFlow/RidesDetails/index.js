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
import {tempRidesSet} from '@store/common/commonSlice';
import PopUp from '@components/common/PopUp';

function RideDetailsScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const schedule = useSelector(state => state.schedule);
  const common = useSelector(state => state.common);
  const {type = undefined, data = undefined} = props.route.params;
  const {name, picture, productImages, isScheduled, scheduledTime, location} =
    data;
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

  const removeRequest = () => {
    if (isScheduled) {
      let objFound = common?.tempRides?.find(item => item.requestedRides);
      objFound.requestedRides = objFound?.requestedRides?.filter(
        item => item.id !== data.id,
      );
      // dispatch(tempRidesSet([...common?.tempRides]));
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } else {
      let tempArr = common?.tempRides?.filter(item => item.id !== data.id);
      dispatch(tempRidesSet(tempArr));
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  };

  const acceptRide = () => {
    if (!isScheduled) {
      const dataRide = {data: {...data, type: type}, inRide: 'accepted'};
      dispatch(isInRide(dataRide));
      navigation.navigate('OnGoingRide', {
        type: 'instant',
        data: data,
      });
    } else {
      let tempArr =
        schedule?.scheduledRides.length > 0
          ? [...schedule?.scheduledRides]
          : [];
      tempArr.push(data);
      console.log('TEMPARR SCHEDULE', tempArr);
      setIsRideAccepted(true);
      dispatch(scheduledRides(tempArr));
      PopUp({
        heading:
          'Schedule Ride Accepted. For more details go to schedulees section in drawer',
        bottomOffset: 0.7,
        visibilityTime: 7000,
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
            <Text
              variant={'h5'}
              font={'Sequel451'}
              color={R.color.charcoalShade}
              align={'left'}
              lineHeight={30}
              transform={'none'}>
              {name}
            </Text>
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
          <Divider
            lineStyles={{
              height: R.unit.scale(0.5),
              backgroundColor: R.color.gray2,
            }}
          />
          <Text
            variant={'h4'}
            font={'Sequel551'}
            color={R.color.charcoalShade}
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
            {isRideAccepted ? (
              <>
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

                <Button
                  bgColor={R.color.mainColor}
                  width={'82%'}
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
              <>
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
                  onPress={removeRequest}
                />
                <Button
                  value={'Accept'}
                  bgColor={R.color.mainColor}
                  width={'82%'}
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
              </>
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
});
