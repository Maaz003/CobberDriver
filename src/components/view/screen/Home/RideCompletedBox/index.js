import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {isInRide} from '@store/user/userSlice';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import {useDispatch, useSelector} from 'react-redux';
import LocationPoint from '@components/view/cards/LocationPoint';

function RideCompletedBox(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const rideComplete = () => {
    dispatch(isInRide(false));
  };

  return (
    <View style={styles.mainLayout}>
      <Text
        variant={'h1'}
        font={'bold'}
        color={R.color.white}
        align={'left'}
        numberOfLines={2}
        transform={'none'}>
        You Arrived!
      </Text>
      <Text
        variant={'h6'}
        font={'bold'}
        color={R.color.white}
        align={'left'}
        gutterTop={10}
        gutterBottom={20}
        transform={'none'}>
        Final Cost: $80.00
      </Text>
      <View style={R.styles.twoItemsRow}>
        <Image
          source={R.image.userPin()}
          resizeMode={'cover'}
          style={styles.image}
        />
        <Text
          variant={'body2'}
          font={'bold'}
          color={R.color.white}
          align={'left'}
          transform={'none'}>
          John Denly
        </Text>
      </View>

      <LocationPoint
        pickUpTextColor={R.color.white}
        dropOffTextColor={R.color.white}
        ellipseColor={R.color.black}
        containerStyles={{paddingVertical: 0}}
      />

      <Button
        value={`Ride is Completed`}
        bgColor={R.color.mainColor}
        width={'95%'}
        size={'lg'}
        variant={'body2'}
        font={'semiBold'}
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
    paddingHorizontal: R.unit.scale(16),
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
