import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {imageUrl} from '@config/apiUrl';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import MediaDisplay from '@components/view/screen/Home/MediaDisplay';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import RideMap from '@components/view/screen/Home/RideMap';
import HoverText from '@components/common/HoverText';
import Button from '@components/common/Button';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import {
  ClockReqIcon,
  DimensionIcon,
  WalletReqIcon,
} from '@components/utils/Svg';
import {
  openDirections,
  updateScheduleRideStartSession,
} from '@components/utils/ReuseableFunctions';
import PopUp from '@components/common/PopUp';
import TruckLoader from '@components/common/TruckLoader';

function NewScheduleRideDetailsScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {data = undefined, mainRideId} = props.route.params;
  const user = useSelector(state => state.user);
  const {
    _id: rideId,
    images,
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
  } = data;
  const {displayName, photo, city, country, ratingsAverage} = customer;

  const [isLoading, setIsLoading] = useState(false);

  const location = {
    pickUpLocation: pickUpAddress,
    dropOffLocation: dropOffAddress,
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

  const acceptRide = async flag => {
    try {
      setIsLoading(true);
      let reqBody = {
        rideId: mainRideId,
        scheduledRideId: rideId,
        ...(flag === 'accept' && {
          status: 'accepted',
        }),
      };
      let url =
        flag === 'accept'
          ? 'scheduling-rides/confirm/accept'
          : 'scheduling-rides/scheduled/decline-request';

      let response = await updateScheduleRideStartSession(
        url,
        user?.userToken,
        reqBody,
      );

      if (response !== undefined) {
        navigation.navigate('ScheduleRides', {
          initialTab: 2,
        });
        PopUp({
          heading: `Ride ${flag === 'accept' ? 'Accepted' : 'Declined'}`,
          bottomOffset: 0.7,
          visibilityTime: 3000,
          position: 'top',
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
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
            <Button
              bgColor={R.color.white}
              width={'16%'}
              size={'lg'}
              color={R.color.white}
              borderColor={R.color.gray}
              // disabled={false}
              loaderColor={R.color.white}
              borderWidth={0.5}
              borderRadius={10}
              iconName={'close'}
              iconType={'Ionicons'}
              iconColor={R.color.blackShade2}
              onPress={() => acceptRide('reject')}
              rippleColor={R.color.gray}
            />

            <Button
              value={'Accept'}
              bgColor={R.color.mainColor}
              width={'82%'}
              size={'lg'}
              color={R.color.blackShade2}
              borderColor={R.color.mainColor}
              // disabled={is}
              // loaderColor={R.color.white}
              borderWidth={1}
              borderRadius={10}
              onPress={() => acceptRide('accept')}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}
export default NewScheduleRideDetailsScreen;

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
