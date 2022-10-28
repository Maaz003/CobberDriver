import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {PinLocation} from '@components/utils/Svg';
import {useDispatch, useSelector} from 'react-redux';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Divider from '@components/common/Divider';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import navigationService from '../../../../../navigationService';
import {useNavigation} from '@react-navigation/native';

function RideInProgressCard(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  let rideCompleted = true;
  const navigation = useNavigation();

  const onSubmit = () => {
    if (rideCompleted) {
      if (user?.inRide) {
        navigation.reset({
          index: 0,
          routes: [{name: 'RideCompleted'}],
        });
      }
    }
  };

  return (
    <View style={styles.mainLayout}>
      <View style={styles.notch} />
      <View style={styles.contentView}>
        <View style={R.styles.rowView}>
          <Image
            source={R.image.userPin()}
            resizeMode={'cover'}
            style={styles.image}
          />
          <Text
            variant={'body1'}
            font={'bold'}
            color={R.color.white}
            align={'left'}
            numberOfLines={2}
            style={{top: 2, flex: 1}}
            transform={'none'}>
            Lorem Ipsum
          </Text>
          <View style={[R.styles.rowView, styles.iconContainer]}>
            <TouchableOpacity style={styles.iconView}>
              <Icon
                type={'FontAwesome'}
                name={'phone'}
                size={20}
                color={R.color.white}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconView}>
              <Icon
                type={'FontAwesome'}
                name={'envelope-o'}
                size={20}
                color={R.color.white}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Divider
          lineStyles={{
            marginTop: R.unit.scale(24),
            backgroundColor: R.color.gray3,
          }}
        />
        <View style={{...R.styles.rowView}}>
          {!rideCompleted ? (
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
              User's {!rideCompleted ? 'Pickup' : 'DropOff'} Location
            </Text>
            <Text
              variant={'body2'}
              font={'bold'}
              color={R.color.white}
              align={'left'}
              style={{top: 2}}
              numberOfLines={3}
              transform={'none'}>
              You have a New Ride
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
          value={rideCompleted ? 'Start Ride' : 'End Ride'}
          bgColor={R.color.mainColor}
          width={'90%'}
          size={'lg'}
          variant={'body1'}
          font={'semiBold'}
          gutterTop={32}
          color={R.color.black}
          borderRadius={10}
          borderColor={R.color.mainColor}
          onPress={onSubmit}
        />
      </View>
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
    height: 300,
    backgroundColor: R.color.charcoalShade2,
    borderTopRightRadius: R.unit.scale(10),
    borderTopLeftRadius: R.unit.scale(10),
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
    backgroundColor: 'rgba(134, 242, 10,0.7)',
    borderRadius: R.unit.scale(40),
  },
  pickupEllipse: {
    height: R.unit.scale(20),
    width: R.unit.scale(20),
    backgroundColor: R.color.white,
    borderWidth: R.unit.scale(5),
    borderColor: R.color.mainColor,
    borderRadius: R.unit.scale(20),
  },
});

export default RideInProgressCard;
