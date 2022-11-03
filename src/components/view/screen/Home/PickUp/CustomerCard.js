import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import LocationPoint from '@components/view/cards/LocationPoint';
import Button from '@components/common/Button';
import navigationService from '../../../../../navigation/navigationService';

function CustomerCard(props) {
  const {item} = props;
  const [rideData, setRideData] = useState(undefined);

  console.log('first');

  useEffect(() => {
    if (item.requestedRides) {
      setRideData(item.requestedRides[0]);
    } else {
      console.log('false');
      setRideData(item);
    }
  }, [item]);

  const acceptRide = () => {
    if (rideData?.isScheduled) {
      navigationService.navigate('RideRequests', {
        data: item.requestedRides,
      });
    } else {
      navigationService.navigate('RideDetails', {
        type: 'instant',
        data: item,
      });
    }
  };

  console.log('ITEM', rideData);

  return (
    <View style={styles.mainLayout}>
      <View style={R.styles.twoItemsRow}>
        <Image
          source={rideData?.picture}
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
            transform={'none'}>
            {rideData?.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.tag}>
              <Text
                variant={'body4'}
                font={'PoppinsMedium'}
                color={R.color.black}
                align={'left'}
                transform={'none'}>
                {rideData?.isScheduled ? 'Scheduled' : 'Instant'}
              </Text>
            </View>
            {rideData?.isScheduled && (
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
          </View>
        </View>
      </View>

      <LocationPoint
        location={rideData?.location}
        scheduledTime={rideData?.scheduledTime}
      />

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
        onPress={acceptRide}
        rippleColor={R.color.gray5}
      />
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
