import React, {useState} from 'react';
import {View, Image, StyleSheet, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import DashLine from '@components/common/DashLine';
import {MessageIcon} from '@components/utils/Svg';
import Button from '@components/common/Button';
import CancelRideModal from '../modal/CancelRideModal';

function TrackingCard(props) {
  const {navigation} = props;

  const [isModal, setIsModal] = useState(false);

  const user = useSelector(state => state.user);

  const addressRawDropOff = user?.dropOffLoc?.address;
  const addressRawPickup = user?.pickupLoc?.address;
  const dropOffTime = user?.scheduledTime
    ? user?.scheduledTime?.dropOffTime
    : '';
  const pickUpTime = user?.scheduledTime ? user?.scheduledTime?.pickUpTime : '';

  const openModal = () => {
    setIsModal(!isModal);
  };

  const navigateChats = () => {
    navigation.navigate('Chat');
  };

  const navigateCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${+1234567890}';
    } else {
      phoneNumber = 'telprompt:${+1234567890}';
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.historyCard}>
      <Text
        variant={'h4'}
        font={'bold'}
        gutterTop={10}
        gutterBottom={15}
        color={R.color.white}
        align={'center'}
        numberOfLines={2}
        transform={'none'}>
        Arriving in 2 minutes
      </Text>

      <View style={R.styles.rowView}>
        <View style={[R.styles.twoItemsRow, styles.headerName]}>
          <Image source={R.image.userPin()} style={styles.image} />
          <View style={{width: '78%'}}>
            <Text
              variant={'h5'}
              font={'bold'}
              gutterTop={2}
              color={R.color.white}
              style={{
                marginLeft: 10,
              }}
              align={'left'}
              numberOfLines={1}
              transform={'none'}>
              John Denly
            </Text>
            <Text
              variant={'body3'}
              font={'bold'}
              gutterTop={2}
              color={R.color.lightGray}
              style={{marginLeft: 10}}
              align={'left'}
              transform={'none'}>
              Wide Loads {'\n'} Ex-1056
            </Text>
          </View>
        </View>
        <View>
          <Text
            variant={'body4'}
            font={'semiBold'}
            gutterTop={2}
            color={R.color.white}
            align={'center'}
            numberOfLines={2}
            transform={'none'}>
            Call now
          </Text>

          <TouchableOpacity
            style={styles.pressableIcon}
            activeOpacity={0.8}
            onPress={navigateCall}>
            <Icon type={'FontAwesome'} name={'phone'} size={20} />
          </TouchableOpacity>
          <Text
            variant={'body4'}
            font={'semiBold'}
            gutterTop={10}
            color={R.color.white}
            align={'center'}
            numberOfLines={2}
            transform={'none'}>
            Message
          </Text>

          <TouchableOpacity
            style={styles.pressableIcon}
            activeOpacity={0.8}
            onPress={navigateChats}>
            <MessageIcon />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[R.styles.twoItemsRow, styles.content]}>
        <View style={styles.iconsColumn}>
          <View style={R.styles.pickupEllipse} />
          <DashLine
            dashGap={1}
            dashColor={R.color.gray}
            style={{
              width: 10,
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
            gutterTop={2}
            color={R.color.lightGray}
            align={'left'}
            numberOfLines={2}
            transform={'none'}>
            Pick up point
          </Text>
          <Text
            variant={'body3'}
            font={'thin'}
            color={R.color.white}
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
              color={R.color.white}
              align={'left'}
              gutterTop={5}
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
            color={R.color.white}
            align={'left'}
            gutterTop={5}
            gutterBottom={user?.scheduledTime?.dropOffSlot ? 0 : 15}
            numberOfLines={2}
            transform={'none'}>
            {addressRawDropOff}
          </Text>
          {user?.scheduledTime && (
            <Text
              variant={'body4'}
              font={'thin'}
              color={R.color.white}
              align={'left'}
              gutterTop={5}
              numberOfLines={2}
              transform={'none'}>
              {moment(dropOffTime).format('Do MMM')}
              {`  ${user?.scheduledTime?.dropOffSlot}`}
            </Text>
          )}
        </View>
      </View>

      <View style={[R.styles.rowView, styles.amountLayout]}>
        <View style={{alignItems: 'center'}}>
          <Text
            variant={'body3'}
            font={'bold'}
            gutterTop={10}
            color={R.color.lightGray}
            align={'left'}
            numberOfLines={2}
            transform={'none'}>
            Payment
          </Text>
          <Text
            variant={'h6'}
            font={'bold'}
            gutterTop={5}
            gutterBottom={15}
            color={R.color.white}
            align={'left'}
            numberOfLines={2}
            transform={'none'}>
            Card
          </Text>
        </View>
        <View style={R.styles.verticalDivider} />
        <View style={{alignItems: 'center'}}>
          <Text
            variant={'body3'}
            font={'bold'}
            gutterTop={10}
            color={R.color.lightGray}
            align={'left'}
            numberOfLines={2}
            transform={'none'}>
            Amount
          </Text>
          <Text
            variant={'h6'}
            font={'bold'}
            gutterTop={5}
            gutterBottom={15}
            color={R.color.white}
            align={'left'}
            numberOfLines={2}
            transform={'none'}>
            $50
          </Text>
        </View>
      </View>

      <Button
        value={`Cancel Ride`}
        bgColor={R.color.mainColor}
        width={'100%'}
        size={'xxmd'}
        gutterTop={R.unit.scale(20)}
        variant={'h6'}
        font={'bold'}
        color={R.color.black}
        borderRadius={100}
        onPress={openModal}
        borderColor={R.color.mainColor}
        loaderColor={'white'}
        borderWidth={2}
      />
      <CancelRideModal isVisibleModal={isModal} {...props} />
    </View>
  );
}
export default TrackingCard;

const styles = StyleSheet.create({
  historyCard: {
    width: R.unit.width(0.95),
    marginTop: R.unit.scale(20),
    borderRadius: R.unit.scale(10),
    paddingHorizontal: R.unit.scale(15),
    paddingVertical: R.unit.scale(20),
    backgroundColor: R.color.charcoalShade2,
    shadowColor: R.color.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  headerName: {
    paddingHorizontal: 0,
    width: '85%',
  },
  content: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  image: {
    width: R.unit.scale(70),
    height: R.unit.scale(70),
    borderRadius: R.unit.scale(100),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.black,
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
  pressableIcon: {
    backgroundColor: R.color.mainColor,
    height: R.unit.scale(45),
    width: R.unit.scale(45),
    borderRadius: R.unit.scale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountLayout: {
    paddingHorizontal: R.unit.scale(60),
    marginTop: R.unit.scale(10),
  },
  divider: {
    backgroundColor: R.color.white,
    height: R.unit.scale(0.5),
    marginVertical: R.unit.scale(10),
    width: '100%',
    marginLeft: 0,
  },
});
