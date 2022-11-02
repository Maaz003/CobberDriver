import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
} from 'react-native';
import {PinLocation} from '@components/utils/Svg';
import {useDispatch, useSelector} from 'react-redux';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import navigationService from '../../../../../navigation/navigationService';
import {useNavigation} from '@react-navigation/native';
import CancelBookingModal from '@components/view/modal/CancelBookingModal';
import {isInRide} from '@store/user/userSlice';

function RideInProgressCard(props) {
  const {type = undefined, data = undefined, navigation} = props;
  const {name, picture, location} = data;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isModal, setIsModal] = useState(false);
  const [isRideStarted, setIsRideStarted] = useState(
    user?.inRide === 'started' ? true : false,
  );

  const openCancelModal = () => {
    setIsModal(!isModal);
  };

  const cancelRide = () => {
    openCancelModal();
  };

  const onSubmit = () => {
    setIsRideStarted(!isRideStarted);
    if (type === 'instant') {
      if (!isRideStarted) {
        const dataRide = {data: {...data, type: type}, inRide: 'started'};
        dispatch(isInRide(dataRide));
      } else {
        const dataRide = {data: {...data, type: type}, inRide: 'ended'};
        dispatch(isInRide(dataRide));
        navigation.reset({
          index: 0,
          routes: [{name: 'RideCompleted'}],
        });
      }
    }
  };

  const openCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${data.phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${data.phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.mainLayout}>
      <View style={styles.notch} />
      <View style={styles.contentView}>
        <View style={R.styles.rowView}>
          <Image source={picture} resizeMode={'cover'} style={styles.image} />
          <Text
            variant={'body2'}
            font={'PoppinsSemiBold'}
            color={R.color.white}
            align={'left'}
            numberOfLines={2}
            style={{top: 2, flex: 1}}
            transform={'none'}>
            {name}
          </Text>
          <View style={[R.styles.rowView, styles.iconContainer]}>
            <TouchableOpacity style={styles.iconView} onPress={openCall}>
              <Icon
                type={'FontAwesome'}
                name={'phone'}
                size={20}
                color={R.color.charcoalShade2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconView}
              onPress={() =>
                navigation.navigate('Chat', {
                  data: data,
                })
              }>
              <Icon
                type={'FontAwesome'}
                name={'envelope-o'}
                size={20}
                color={R.color.charcoalShade2}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Divider lineStyles={styles.dividerStyles} />
        <View style={{...R.styles.rowView}}>
          {!isRideStarted ? (
            <View style={styles.pickupEllipse} />
          ) : (
            <View style={styles.svgView}>
              <PinLocation
                height="100%"
                width="100%"
                fill={R.color.mainColor}
              />
            </View>
          )}
          <View style={{flex: 1, marginLeft: R.unit.scale(12)}}>
            <Text
              variant={'body3'}
              font={'regular'}
              color={R.color.gray6}
              align={'left'}
              style={{top: 2}}
              gutterBottom={5}
              transform={'none'}>
              User's {!isRideStarted ? 'Pickup' : 'DropOff'} Location
            </Text>
            <Text
              variant={'body2'}
              font={'bold'}
              color={R.color.white}
              align={'left'}
              style={{top: 2}}
              numberOfLines={3}
              transform={'none'}>
              {isRideStarted
                ? location.dropOffLocation
                : location.pickUpLocation}
            </Text>
          </View>
          <Text
            variant={'body3'}
            font={'regular'}
            color={R.color.white}
            align={'right'}
            style={{top: 2}}
            transform={'none'}>
            10:13 am
          </Text>
        </View>

        <Button
          value={!isRideStarted ? 'Start Ride' : 'End Ride'}
          bgColor={R.color.mainColor}
          width={'90%'}
          size={'lg'}
          gutterTop={32}
          color={R.color.black}
          borderRadius={10}
          borderColor={R.color.mainColor}
          onPress={onSubmit}
        />
        {!isRideStarted && (
          <Button
            value={'Cancel Ride'}
            bgColor={'#DB1A2D'}
            width={'90%'}
            size={'lg'}
            gutterTop={16}
            color={R.color.white}
            borderRadius={10}
            borderColor={R.color.mainColor}
            onPress={cancelRide}
          />
        )}
      </View>
      <CancelBookingModal isVisibleModal={isModal} title={'Ride'} />
    </View>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: R.unit.width(1),
    position: 'absolute',
    bottom: 0,
    zIndex: 99999999,
    backgroundColor: R.color.charcoalShade2,
    borderTopRightRadius: R.unit.scale(10),
    borderTopLeftRadius: R.unit.scale(10),
    paddingBottom: R.unit.scale(16),
  },
  notch: {
    width: R.unit.scale(60),
    height: R.unit.scale(5),
    borderRadius: R.unit.scale(40),
    backgroundColor: R.color.gray5,
    marginTop: R.unit.scale(10),
  },
  contentView: {
    width: '100%',
    marginTop: R.unit.scale(24),
    paddingHorizontal: R.unit.scale(12),
  },
  image: {
    height: R.unit.scale(60),
    width: R.unit.scale(60),
    borderRadius: R.unit.scale(70),
    marginRight: R.unit.scale(12),
    borderColor: R.color.black,
    borderWidth: R.unit.scale(1),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(20),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    width: '24%',
  },
  iconView: {
    height: R.unit.scale(40),
    width: R.unit.scale(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.color.mainColor,
    borderRadius: R.unit.scale(40),
  },
  pickupEllipse: {
    height: R.unit.scale(20),
    width: R.unit.scale(20),
    backgroundColor: R.color.charcoalShade2,
    borderWidth: R.unit.scale(5),
    borderColor: R.color.mainColor,
    borderRadius: R.unit.scale(20),
  },
  dividerStyles: {
    marginTop: R.unit.scale(24),
    backgroundColor: R.color.gray4,
    height: R.unit.scale(0.5),
  },
});

export default RideInProgressCard;
