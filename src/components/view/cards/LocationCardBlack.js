import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import DashLine from '@components/common/DashLine';
import {useSelector} from 'react-redux';
import moment from 'moment';

function LocationCardBlack(props) {
  const user = useSelector(state => state.user);
  const addressRawPickup = user?.pickupLoc?.address;
  const addressRawDropOff = user?.dropOffLoc?.address;
  const dropOffTime = user?.scheduledTime
    ? user?.scheduledTime?.dropOffTime
    : '';
  const pickUpTime = user?.scheduledTime ? user?.scheduledTime?.pickUpTime : '';

  return (
    <View style={styles.historyCard}>
      <View style={[R.styles.twoItemsRow, styles.content]}>
        <View style={styles.iconsColumn}>
          <View
            style={[R.styles.pickupEllipse, {backgroundColor: R.color.black}]}
          />
          <DashLine
            dashGap={1}
            dashColor={R.color.gray}
            style={{
              width: 5,
              height: user?.scheduledTime ? 90 : 60,
              flexDirection: 'column',
              alignItems: 'center',
            }}
          />
          <Icon
            name={'location-sharp'}
            type={'Ionicons'}
            color={R.color.mainColor}
            size={28}
            iconStyles={{marginTop: 2}}
          />
        </View>
        <View style={styles.textView}>
          <Text
            variant={'body4'}
            font={'semiBold'}
            color={R.color.lightGray}
            align={'left'}
            numberOfLines={2}
            transform={'none'}>
            Pick up point
          </Text>
          <Text
            variant={'body3'}
            font={'thin'}
            color={R.color.black}
            align={'left'}
            gutterTop={5}
            gutterBottom={user?.scheduledTime?.pickUpSlot ? 0 : 15}
            numberOfLines={2}
            transform={'none'}>
            {addressRawPickup}
          </Text>
          {user?.scheduledTime && (
            <Text
              variant={'body4'}
              font={'thin'}
              color={R.color.black}
              align={'left'}
              gutterTop={10}
              gutterBottom={10}
              numberOfLines={2}
              transform={'none'}>
              {moment(pickUpTime).format('Do MMM')}
              {`  ${user?.scheduledTime?.pickUpSlot}`}
            </Text>
          )}

          <View style={[R.styles.divider, styles.divider]} />
          <Text
            variant={'body4'}
            font={'semiBold'}
            gutterTop={10}
            color={R.color.lightGray}
            align={'left'}
            numberOfLines={2}
            transform={'none'}>
            Drop off point
          </Text>
          <Text
            variant={'body3'}
            font={'thin'}
            color={R.color.black}
            align={'left'}
            gutterTop={5}
            numberOfLines={2}
            transform={'none'}>
            {addressRawDropOff}
          </Text>
          {user?.scheduledTime && (
            <Text
              variant={'body4'}
              font={'thin'}
              color={R.color.black}
              align={'left'}
              gutterTop={10}
              numberOfLines={2}
              transform={'none'}>
              {moment(dropOffTime).format('Do MMM')}
              {`  ${user?.scheduledTime?.dropOffSlot}`}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
export default LocationCardBlack;

const styles = StyleSheet.create({
  historyCard: {
    width: '100%',
    marginTop: R.unit.scale(20),
    paddingVertical: R.unit.scale(20),
    backgroundColor: R.color.white,
  },
  header: {
    paddingHorizontal: 0,
    marginBottom: R.unit.scale(10),
  },
  content: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  image: {
    width: R.unit.scale(60),
    height: R.unit.scale(60),
    borderRadius: R.unit.scale(100),
    borderWidth: R.unit.scale(2),
    borderColor: R.color.mainColor,
  },
  iconsColumn: {
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView: {
    width: '87%',
  },
  divider: {
    backgroundColor: R.color.gray,
    height: R.unit.scale(0.5),
    marginVertical: R.unit.scale(10),
    width: '100%',
    marginLeft: 0,
  },
});
