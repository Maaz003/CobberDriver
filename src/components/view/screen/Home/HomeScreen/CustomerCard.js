import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import LocationPoint from '@components/view/cards/LocationPoint';
import Button from '@components/common/Button';
import navigationService from '../../../../../navigation/navigationService';
import {useIsFocused} from '@react-navigation/native';
import {imageUrl} from '@config/apiUrl';

function CustomerCard(props) {
  const {item} = props;
  const rideData = item?.isScheduled ? item?.initialRideRequest : item;
  const isFocused = useIsFocused();
  const [showControls, setShowControls] = useState(true);
  const [allCompleted, setAllCompleted] = useState(false);
  const customer = rideData?.customer;
  const location = {
    pickUpLat: rideData?.pickUpLocation?.coordinates[1],
    pickUpLong: rideData?.pickUpLocation?.coordinates[0],
    pickUpLocation: rideData?.pickUpAddress,
    dropOffLat: rideData?.dropOffLocation?.coordinates[1],
    dropOffLong: rideData?.dropOffLocation?.coordinates[0],
    dropOffLocation: rideData?.dropOffAddress,
  };

  const scheduleTime = item.isScheduled && {
    pickUpTime: item?.slots?.pickupStartTime,
    dropOffTime: item?.slots?.dropOffEndTime,
  };
  const photo = imageUrl(customer?.photo);

  useEffect(() => {
    if (!item.isScheduled) {
      if (item.isRejected || item.isCancelled || item.isCompleted) {
        setShowControls(false);
      } else {
        setShowControls(true);
      }
    }
    if (item.requestedRides) {
      let flag = item?.requestedRides.every(
        item => item.isRejected || item.isCompleted,
      );
      let allCompleted = item?.requestedRides.every(item => item.isCompleted);
      if (flag) {
        setShowControls(false);
        if (allCompleted) {
          setAllCompleted(true);
        }
      } else {
        setShowControls(true);
      }
    }
  }, [isFocused, item]);

  const viewDetails = () => {
    if (item?.isScheduled) {
      navigationService.navigate('RideRequests', {
        data: item,
      });
    } else {
      navigationService.navigate('RideDetails', {
        type: 'instant',
        data: item,
      });
    }
  };

  return (
    <View style={styles.mainLayout}>
      <View style={R.styles.twoItemsRow}>
        <Image
          source={{uri: photo}}
          resizeMode={'cover'}
          style={styles.image}
        />
        <View style={{flex: 1}}>
          <Text
            variant={'body2'}
            font={'PoppinsMedium'}
            color={R.color.black}
            align={'left'}
            numberOfLines={1}
            transform={'capitalize'}>
            {customer?.displayName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.tag}>
              <Text
                variant={'body4'}
                font={'PoppinsMedium'}
                color={R.color.black}
                align={'left'}
                transform={'none'}>
                {item?.isScheduled ? 'Scheduled' : 'Instant'}
              </Text>
            </View>
            {item?.isScheduled && (
              <View style={styles.tag}>
                <Text
                  variant={'body4'}
                  font={'PoppinsMedium'}
                  color={R.color.black}
                  align={'left'}
                  transform={'none'}>
                  {'Sharing'}
                </Text>
              </View>
            )}

            {!showControls && (
              <View
                style={{
                  ...styles.tag,
                  backgroundColor:
                    item.status === 'completed' || allCompleted
                      ? R.color.mainColor
                      : R.color.cancelColor,
                }}>
                <Text
                  variant={'body4'}
                  font={'InterMedium'}
                  color={
                    item.status === 'completed' || allCompleted
                      ? R.color.blackShade2
                      : R.color.white
                  }
                  align={'left'}
                  transform={'none'}>
                  {item.status === 'completed' || allCompleted
                    ? 'Completed'
                    : item.isRejected
                    ? 'Rejected'
                    : 'Cancelled'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <LocationPoint location={location} scheduledTime={scheduleTime} />

      {showControls && (
        <Button
          value="Details"
          bgColor={R.color.mainColor}
          width={'100%'}
          size={'lg'}
          variant={'body2'}
          font={'PoppinsMedium'}
          color={R.color.charcoalShade2}
          borderRadius={10}
          gutterTop={10}
          borderColor={R.color.mainColor}
          onPress={viewDetails}
          rippleColor={R.color.gray5}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    borderRadius: R.unit.scale(10),
    paddingVertical: R.unit.scale(12),
    paddingHorizontal: R.unit.scale(12),
    marginBottom: R.unit.scale(16),
    width: '100%',
  },
  image: {
    height: R.unit.scale(55),
    width: R.unit.scale(55),
    borderRadius: R.unit.scale(55),
    marginRight: R.unit.scale(12),
  },
  picturesRow: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: R.unit.scale(16),
    width: '100%',
    flexDirection: 'row',
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

export default CustomerCard;
