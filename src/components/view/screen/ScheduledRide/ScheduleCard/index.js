import React from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import moment from 'moment';
import navigationService from '@navigation/navigationService';

function ScheduleCard(props) {
  const {item, rideDay} = props;
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
        });
      }}>
      <Text
        variant={'body2'}
        font={'Sequel551'}
        gutterTop={2}
        color={R.color.black}
        align={'left'}
        gutterBottom={20}
        numberOfLines={1}
        transform={'none'}>
        {moment(rideDay).format('ddd, Do MMM hh:mm:a')}
      </Text>
      <View
        style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
        {item.map((item, index) => {
          return (
            <View style={{marginRight: R.unit.scale(20)}} key={index}>
              <Image source={item.picture} style={styles.image} />
              <Text
                variant={'body4'}
                font={'bold'}
                gutterTop={2}
                color={R.color.black}
                align={'left'}
                numberOfLines={1}
                transform={'none'}>
                {item?.name}
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
    width: R.unit.width(0.85),
    marginTop: R.unit.scale(20),
    borderRadius: R.unit.scale(20),
    paddingHorizontal: R.unit.scale(20),
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
    width: R.unit.scale(45),
    height: R.unit.scale(45),
    borderRadius: R.unit.scale(100),
    borderWidth: R.unit.scale(2),
    borderColor: R.color.mainColor,
  },
});
