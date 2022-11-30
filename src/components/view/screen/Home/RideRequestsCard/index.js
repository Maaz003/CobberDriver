import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import {
  CalendarReqIcon,
  ClockReqIcon,
  LocationReqIcon,
} from '@components/utils/Svg';
import Button from '@components/common/Button';
import Divider from '@components/common/Divider';
import navigationService from '@navigation/navigationService';
import moment from 'moment';
import {imageUrl} from '@config/apiUrl';

function RideRequestsCard(props) {
  const {item, index, arr, screenType, mainRideId} = props;
  const [disabled, setDisabled] = useState(false);
  const {displayName, photo} = item?.customer;
  const image = imageUrl(photo);

  const onNavigate = () => {
    navigationService.navigate(
      screenType === 'History' ? 'ScheduleRideDetails' : 'RideDetails',
      {
        type: 'schedule',
        data: item,
        mainRideId: mainRideId,
      },
    );
  };

  useEffect(() => {
    if (screenType === 'Rides') {
      if (item.isCancelled || item.isRejected) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [item]);

  return (
    <View style={styles.notificationCard}>
      <View style={[R.styles.twoItemsRow, {alignItems: 'flex-start'}]}>
        <Image
          source={{uri: image}}
          resizeMode={'contain'}
          style={styles.image}
        />
        <View style={[R.styles.twoItemsRow, styles.titleView]}>
          <Text
            variant={'body2'}
            font={'InterBold'}
            color={R.color.blackShade3}
            align={'left'}
            gutterTop={5}
            numberOfLines={2}
            transform={'capitalize'}>
            {displayName}{' '}
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.blackShade3}
              align={'left'}
              transform={'none'}>
              has requested a schedule ride
            </Text>
          </Text>
        </View>
      </View>

      <View style={[R.styles.twoItemsRow, {marginTop: R.unit.scale(16)}]}>
        <View style={styles.svgView}>
          <CalendarReqIcon height="100%" width="100%" />
        </View>
        <Text
          variant={'body3'}
          font={'InterRegular'}
          color={R.color.blackShade3}
          align={'left'}
          style={{marginLeft: R.unit.scale(8)}}
          transform={'none'}>
          {moment(item.scheduledTime?.pickUpTime).format('Do MMM  YY')}
        </Text>
      </View>

      <View style={[R.styles.twoItemsRow, styles.detailView]}>
        <View style={styles.svgView}>
          <ClockReqIcon height="100%" width="100%" fill={'#717171'} />
        </View>
        <Text
          variant={'body3'}
          font={'InterRegular'}
          color={R.color.blackShade3}
          align={'left'}
          style={{marginLeft: R.unit.scale(8)}}
          transform={'none'}>
          {moment(item.scheduledTime?.pickUpTime).format('hh:mm a')}
        </Text>
      </View>

      <View style={[R.styles.twoItemsRow, styles.detailView]}>
        <View style={styles.pickUpCircle} />
        <Text
          variant={'body3'}
          font={'InterRegular'}
          color={R.color.blackShade3}
          align={'left'}
          style={{marginLeft: R.unit.scale(8)}}
          transform={'none'}>
          {item?.pickUpAddress}
        </Text>
        <View style={styles.dot} />
        <Text
          variant={'body3'}
          font={'InterRegular'}
          color={R.color.blackShade3}
          align={'left'}
          style={{fontStyle: 'italic', width: '30%'}}
          transform={'none'}>
          PickUp
        </Text>
      </View>

      <View style={[R.styles.twoItemsRow, styles.detailView]}>
        <View style={styles.svgView}>
          <LocationReqIcon height="100%" width="100%" />
        </View>
        <Text
          variant={'body3'}
          font={'InterRegular'}
          color={R.color.blackShade3}
          align={'left'}
          style={{marginLeft: R.unit.scale(8)}}
          transform={'none'}>
          {item?.dropOffAddress}
        </Text>
        <View style={styles.dot} />
        <Text
          variant={'body3'}
          font={'InterRegular'}
          color={R.color.blackShade3}
          align={'left'}
          style={{fontStyle: 'italic', width: '30%'}}
          transform={'none'}>
          DropOff
        </Text>
      </View>

      <View style={[R.styles.rowView, styles.buttonContainer]}>
        <Text
          variant={'body3'}
          font={'InterRegular'}
          color={R.color.gray6}
          align={'left'}
          transform={'none'}>
          {moment(item?.createdAt).format('HH:mm')}
        </Text>
        <View style={[R.styles.twoItemsRow, styles.buttonLayout]}>
          <Button
            value={disabled ? 'Ride Not Present' : 'Details'}
            bgColor={R.color.mainColor}
            width={'90%'}
            size={'lg'}
            variant={'body2'}
            font={'PoppinsMedium'}
            color={R.color.charcoalShade2}
            borderColor={R.color.mainColor}
            disabled={disabled}
            loaderColor={R.color.white}
            borderWidth={1}
            borderRadius={10}
            onPress={() => onNavigate(item)}
          />
        </View>
      </View>
      {index !== arr.length - 1 && (
        <Divider lineStyles={{backgroundColor: R.color.gray2}} />
      )}
    </View>
  );
}
export default RideRequestsCard;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: 0,
    flex: 1,
  },
  contentView: {
    paddingHorizontal: R.unit.scale(10),
    width: '100%',
    justifyContent: 'center',
    marginTop: R.unit.scale(32),
  },
  addCardView: {
    justifyContent: 'flex-end',
    marginTop: R.unit.scale(40),
    paddingVertical: R.unit.scale(10),
  },

  titleView: {
    marginLeft: R.unit.scale(16),
    width: '75%',
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(17),
  },
  popupSvg: {
    aspectRatio: 1,
    height: R.unit.scale(30),
  },
  notificationCard: {
    marginTop: R.unit.scale(24),
  },
  image: {
    width: R.unit.scale(48),
    height: R.unit.scale(48),
    borderRadius: R.unit.scale(8),
  },
  detailView: {
    marginTop: R.unit.scale(12),
  },
  buttonContainer: {
    marginTop: R.unit.scale(16),
    marginBottom: R.unit.scale(24),
  },
  buttonLayout: {
    justifyContent: 'flex-end',
    width: '75%',
  },
  pickUpCircle: {
    backgroundColor: R.color.white,
    height: R.unit.scale(16),
    width: R.unit.scale(16),
    borderRadius: R.unit.scale(16),
    borderWidth: R.unit.scale(6),
    borderColor: R.color.gray6,
  },
  dot: {
    height: R.unit.scale(4),
    width: R.unit.scale(4),
    backgroundColor: R.color.gray5,
    borderRadius: R.unit.scale(30),
    marginHorizontal: R.unit.scale(8),
  },
});
