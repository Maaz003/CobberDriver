import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {isInRide} from '@store/user/userSlice';
import {itemPictures} from '@components/constants';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import LocationPoint from '@components/view/cards/LocationPoint';
import Button from '@components/common/Button';
import RideDetailsModal from '@components/view/modal/RideDetailsModal';
import navigationService from '../../../../../navigation/navigationService';

function CustomerCard(props) {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();

  const navigateToDetails = () => {
    setIsModal(!isModal);
  };

  const acceptRide = () => {
    let isSchedule = false;
    if (isSchedule) {
      navigationService.navigate('OnGoingRide');
    } else {
      navigationService.navigate('RideRequests');
    }
    dispatch(isInRide(true));
  };

  return (
    <TouchableOpacity
      style={styles.mainLayout}
      activeOpacity={0.9}
      onPress={navigateToDetails}>
      <View style={R.styles.twoItemsRow}>
        <Image
          source={R.image.userPin()}
          resizeMode={'cover'}
          style={{
            height: R.unit.scale(70),
            width: R.unit.scale(70),
            borderRadius: R.unit.scale(70),
            marginRight: R.unit.scale(12),
            borderColor: R.color.black,
            borderWidth: R.unit.scale(1),
          }}
        />
        <Text
          variant={'body2'}
          font={'bold'}
          color={R.color.black}
          align={'left'}
          transform={'none'}>
          John Denly
        </Text>
      </View>
      <LocationPoint />
      <View style={styles.picturesRow}>
        {itemPictures?.map(item => {
          return (
            <Image
              source={R.image.userPin()}
              resizeMode={'cover'}
              style={styles.itemPicture}
            />
          );
        })}
      </View>
      <View
        style={{...R.styles.rowView, marginTop: R.unit.scale(12)}}
        onStartShouldSetResponder={() => true}>
        <Button
          value="Reject Ride"
          bgColor={R.color.white}
          width={'47%'}
          size={'lg'}
          variant={'body2'}
          font={'semiBold'}
          color={R.color.blackShade2}
          borderRadius={10}
          borderWidth={R.unit.scale(0.5)}
          borderColor={R.color.gray6}
          onPress={() => null}
          rippleColor={R.color.gray5}
        />
        <Button
          value="Accept Ride"
          bgColor={R.color.mainColor}
          width={'47%'}
          size={'lg'}
          variant={'body2'}
          font={'semiBold'}
          color={R.color.white}
          borderRadius={10}
          borderColor={R.color.mainColor}
          onPress={acceptRide}
          rippleColor={R.color.gray5}
        />
      </View>
      <RideDetailsModal isVisibleModal={isModal} />
    </TouchableOpacity>
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
  picturesRow: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: R.unit.scale(16),
    width: '100%',
    flexDirection: 'row',
  },
  itemPicture: {
    height: R.unit.scale(45),
    width: R.unit.scale(45),
    borderRadius: R.unit.scale(5),
    marginRight: R.unit.scale(4),
    marginBottom: R.unit.scale(5),
    borderWidth: 1,
    borderColor: R.color.blackLightShade,
  },
});

export default CustomerCard;
