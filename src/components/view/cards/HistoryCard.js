import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import {imageUrl} from '@config/apiUrl';
import LocationDot from '@components/common/LocationDot';
import {fareRoundOff} from '@components/utils/ReuseableFunctions';

function HistoryCard(props) {
  const {item} = props;
  const {customer, pickUpAddress, dropOffAddress, fare} = item;
  const {displayName, photo, city, country} = customer;

  return (
    <View style={styles.container}>
      <View style={[R.styles.rowView, styles.header]}>
        <View
          style={{
            ...R.styles.twoItemsRow,
            flex: 0.8,
          }}>
          <Image source={{uri: imageUrl(photo)}} style={styles.image} />
          <View
            style={{
              marginLeft: R.unit.scale(5),
              flex: 1,
            }}>
            <Text
              variant={'body2'}
              font={'PoppinsRegular'}
              color={R.color.black}
              style={{flex: 1}}
              align={'left'}
              numberOfLines={2}
              transform={'capitalize'}>
              {displayName}
            </Text>
            <Text
              variant={'body3'}
              font={'PoppinsRegular'}
              color={R.color.black}
              style={{flex: 1}}
              align={'left'}
              numberOfLines={1}
              transform={'capitalize'}>
              {city}, {country}
            </Text>
          </View>
        </View>

        <Text
          variant={'body2'}
          font={'PoppinsSemiBold'}
          gutterTop={5}
          color={R.color.black}
          style={{marginLeft: 10, flex: 0.2}}
          align={'right'}
          transform={'capitalize'}>
          $ {fareRoundOff(fare)}
        </Text>
      </View>

      <View style={[R.styles.twoItemsRow, styles.locationView]}>
        <LocationDot color={R.color.black} />
        <Text
          variant={'body2'}
          font={'thin'}
          color={R.color.black}
          align={'left'}
          style={{flex: 1}}
          numberOfLines={2}
          transform={'capitalize'}>
          {pickUpAddress}
        </Text>
      </View>

      <View style={[R.styles.twoItemsRow, styles.locationView]}>
        <LocationDot color={'#04d604'} />
        <Text
          variant={'body2'}
          font={'PoppinsRegular'}
          color={'#04d604'}
          align={'left'}
          style={{flex: 1}}
          numberOfLines={2}
          transform={'capitalize'}>
          {dropOffAddress}
        </Text>
      </View>
    </View>
  );
}
export default HistoryCard;

const styles = StyleSheet.create({
  container: {
    width: R.unit.width(0.9),
    marginTop: R.unit.scale(20),
    borderRadius: R.unit.scale(8),
    paddingHorizontal: R.unit.scale(10),
    paddingVertical: R.unit.scale(10),
    backgroundColor: R.color.white,
    shadowColor: R.color.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.65,
    elevation: 3,
  },
  header: {
    marginBottom: R.unit.scale(20),
    alignItems: 'flex-start',
  },
  content: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  image: {
    width: R.unit.scale(45),
    height: R.unit.scale(45),
    borderRadius: R.unit.scale(15),
  },
  locationView: {
    marginBottom: R.unit.scale(10),
    alignItems: 'flex-start',
  },
});
