import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import {
  CalendarReqIcon,
  ClockReqIcon,
  LocationReqIcon,
  WalletReqIcon,
} from '@components/utils/Svg';
import Button from '@components/common/Button';
import Divider from '@components/common/Divider';
import navigationService from '@navigation/navigationService';
import moment from 'moment';

function RideRequestsCard(props) {
  const {item, index, arr, screenType} = props;

  const onNavigate = () => {
    navigationService.navigate(
      screenType === 'History' ? 'ScheduleRideDetails' : 'RideDetails',
      {
        type: 'schedule',
        data: item,
      },
    );
  };

  return (
    <View style={styles.notificationCard}>
      <View style={[R.styles.twoItemsRow, {alignItems: 'flex-start'}]}>
        <Image
          source={R.image.dummyUser()}
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
            transform={'none'}>
            {item.name}{' '}
            <Text
              variant={'body3'}
              font={'InterRegular'}
              color={R.color.blackShade3}
              align={'left'}
              transform={'none'}>
              has requested a ride
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
        <View style={styles.svgView}>
          <WalletReqIcon height="100%" width="100%" />
        </View>
        <Text
          variant={'body3'}
          font={'InterRegular'}
          color={R.color.blackShade3}
          align={'left'}
          style={{marginLeft: R.unit.scale(8)}}
          transform={'none'}>
          {item.cost}
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
          {item.location?.pickUpLocation}
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
          {item.location?.dropOffLocation}
        </Text>
      </View>

      <View style={[R.styles.rowView, styles.buttonContainer]}>
        <Text
          variant={'body3'}
          font={'InterRegular'}
          color={R.color.gray6}
          align={'left'}
          transform={'none'}>
          14:31
        </Text>
        <View style={[R.styles.twoItemsRow, styles.buttonLayout]}>
          <Button
            value={'Details'}
            bgColor={R.color.mainColor}
            width={'90%'}
            size={'lg'}
            variant={'body2'}
            font={'PoppinsMedium'}
            color={R.color.charcoalShade2}
            borderColor={R.color.mainColor}
            disabled={false}
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
    paddingHorizontal: R.unit.scale(16),
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
});
