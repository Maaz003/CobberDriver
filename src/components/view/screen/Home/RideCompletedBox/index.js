import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {createRideSession} from '@store/user/userSlice';
import {scheduledRides} from '@store/scheduleRides/scheduleSlice';
import {tempRidesSet} from '@store/common/commonSlice';
import {updateUser} from '@store/user/userSlice';
import Text from '@components/common/Text';
import {imageUrl} from '@config/apiUrl';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import {useDispatch, useSelector} from 'react-redux';
import LocationPoint from '@components/view/cards/LocationPoint';
import PopUp from '@components/common/PopUp';

function RideCompletedBox(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const schedule = useSelector(state => state.schedule);
  const common = useSelector(state => state.common);
  const rideSession = user?.rideSession;
  const {displayName, photo} = rideSession?.customer;

  const rideComplete = async () => {
    if (rideSession?.type === 'schedule') {
      let tempArr = JSON.parse(JSON.stringify(schedule?.scheduledRides));
      let obj = tempArr?.find(item => item.id === rideSession?.id);
      obj.isCompleted = true;
      let flag = schedule?.scheduledRides?.every(
        item => item.rideStatus === 'dropoffended',
      );
      if (flag) {
        let commonTemparr = JSON.parse(JSON.stringify(common.tempRides));
        let index = commonTemparr.findIndex(item => item.requestedRides);
        let requestedRides = commonTemparr[index];
        requestedRides?.requestedRides.forEach(item => {
          item.isCompleted = true;
        });
        dispatch(tempRidesSet(commonTemparr));
      }
      const dataRide = {
        data: undefined,
        inRide: flag ? 'finished' : 'scheduleEnded',
      };
      dispatch(scheduledRides(tempArr));
      dispatch(createRideSession(dataRide));
      PopUp({
        heading: 'Ride Completed',
        bottomOffset: 0.7,
        visibilityTime: 3000,
        position: 'top',
      });
    } else {
      let updateObj = JSON.parse(JSON.stringify(user.user));
      updateObj.driverInfo.isInRide = false;
      await dispatch(updateUser(updateObj));
      const dataRide = {data: undefined, inRide: 'finished'};
      await dispatch(createRideSession(dataRide));
      PopUp({
        heading: 'Ride Completed',
        bottomOffset: 0.7,
        visibilityTime: 3000,
        position: 'top',
      });
    }
  };

  return (
    <View style={styles.mainLayout}>
      <Text
        variant={'h1'}
        font={'Sequel551'}
        color={R.color.white}
        align={'left'}
        numberOfLines={2}
        transform={'none'}>
        You Arrived!
      </Text>
      <Text
        variant={'h6'}
        font={'InterRegular'}
        color={R.color.white}
        align={'left'}
        gutterTop={10}
        gutterBottom={20}
        transform={'none'}>
        Final Cost: ${rideSession?.fare}
      </Text>
      <View style={R.styles.twoItemsRow}>
        <Image
          source={{uri: imageUrl(photo)}}
          resizeMode={'cover'}
          style={styles.image}
        />
        <Text
          variant={'body2'}
          font={'bold'}
          color={R.color.white}
          align={'left'}
          transform={'none'}>
          {displayName}
        </Text>
      </View>

      <LocationPoint
        pickUpTextColor={R.color.white}
        dropOffTextColor={R.color.white}
        ellipseColor={R.color.black}
        containerStyles={{paddingVertical: 0}}
        location={rideSession?.location}
      />

      <Button
        value={`Complete Ride`}
        bgColor={R.color.mainColor}
        width={'95%'}
        size={'lg'}
        gutterTop={R.unit.scale(32)}
        color={R.color.black}
        borderRadius={10}
        onPress={rideComplete}
        borderColor={R.color.mainColor}
        loaderColor={'white'}
      />
    </View>
  );
}
export default RideCompletedBox;

const styles = StyleSheet.create({
  mainLayout: {
    position: 'absolute',
    width: '95%',
    padding: R.unit.scale(24),
    paddingHorizontal: R.unit.scale(10),
    borderRadius: R.unit.scale(10),
    backgroundColor: 'rgba(0,0,0,0.85)',
    marginVertical: R.unit.scale(26),
  },
  headingView: {
    paddingHorizontal: R.unit.scale(20),
    marginBottom: R.unit.scale(16),
  },
  image: {
    height: R.unit.scale(50),
    width: R.unit.scale(50),
    borderRadius: R.unit.scale(70),
    marginRight: R.unit.scale(12),
    borderColor: R.color.black,
    borderWidth: R.unit.scale(1),
  },
});
