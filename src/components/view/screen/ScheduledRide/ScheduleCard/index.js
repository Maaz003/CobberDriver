import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import moment from 'moment';
import navigationService from '@navigation/navigationService';
import {imageUrl} from '@config/apiUrl';

function ScheduleCard(props) {
  const {item, rideDay} = props;
  const [ridesData, setRidesData] = useState([]);

  useEffect(() => {
    let tempArr =
      item?.status === 'completed'
        ? item?.rides
        : item?.status === 'cancelled'
        ? item?.cancelledRides
        : item?.rides;
    setRidesData(tempArr);
  }, [item]);

  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? R.color.gray2 : 'white',
        },
        styles.mainLayout,
      ]}
      onPress={() => {
        navigationService.navigate('ScheduleRideRequests', {
          data: item,
          status: item.status,
        });
      }}>
      <View style={R.styles.rowView}>
        <Text
          variant={'body2'}
          font={'Sequel551'}
          gutterTop={2}
          color={R.color.black}
          align={'left'}
          numberOfLines={1}
          transform={'none'}>
          {moment(rideDay).format('ddd, Do MMM hh:mm:a')}
        </Text>
        <Text
          variant={'body4'}
          font={'PoppinsRegular'}
          gutterTop={2}
          color={
            item?.status === 'cancelled' ? R.color.white : R.color.blackShade2
          }
          align={'left'}
          style={{
            padding: R.unit.scale(8),
            paddingHorizontal: R.unit.scale(15),
            backgroundColor:
              item?.status === 'cancelled'
                ? R.color.cancelColor
                : R.color.mainColor,
            borderRadius: R.unit.scale(4),
          }}
          numberOfLines={1}
          transform={'capitalize'}>
          {item?.status === 'pending' ? 'Upcoming' : item.status}
        </Text>
      </View>
      <View style={styles.ridesContainer}>
        {ridesData?.map((item, index) => {
          const {displayName, photo} = item?.customer;
          return (
            <View
              style={{
                marginRight: R.unit.scale(20),
                marginBottom: R.unit.scale(10),
              }}
              key={index}>
              <Image source={{uri: imageUrl(photo)}} style={styles.image} />
              <Text
                variant={'body3'}
                font={'PoppinsMedium'}
                gutterTop={2}
                color={R.color.black}
                align={'center'}
                transform={'capitalize'}>
                {displayName}
              </Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}
export default ScheduleCard;

const styles = StyleSheet.create({
  mainLayout: {
    width: R.unit.width(0.93),
    marginTop: R.unit.scale(20),
    borderRadius: R.unit.scale(8),
    paddingHorizontal: R.unit.scale(12),
    paddingVertical: R.unit.scale(10),
    shadowColor: R.color.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  image: {
    width: R.unit.scale(50),
    height: R.unit.scale(50),
    borderRadius: R.unit.scale(2),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray,
  },
  ridesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: R.unit.scale(10),
  },
});
