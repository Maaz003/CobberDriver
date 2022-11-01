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
    <View style={styles.mainLayout}>
      <View style={R.styles.twoItemsRow}>
        <Image
          source={R.image.userPin()}
          resizeMode={'cover'}
          style={styles.image}
        />
        <View style={{flex: 1}}>
          <Text
            variant={'body2'}
            font={'PoppinsMedium'}
            color={R.color.black}
            align={'left'}
            numberOfLines={2}
            transform={'none'}>
            John Denlynkfds.lbsdfbljfsdbl
          </Text>
          <View style={styles.tag}>
            <Text
              variant={'body4'}
              font={'PoppinsRegular'}
              color={R.color.black}
              align={'left'}
              transform={'none'}>
              Scheduled
            </Text>
          </View>
        </View>
      </View>
      <LocationPoint />

      <View
        style={{...R.styles.rowView, marginTop: R.unit.scale(12)}}
        onStartShouldSetResponder={() => true}>
        <Button
          value="Accept Ride"
          bgColor={R.color.mainColor}
          width={'100%'}
          size={'lg'}
          variant={'body2'}
          font={'PoppinsMedium'}
          color={R.color.charcoalShade2}
          borderRadius={10}
          borderColor={R.color.mainColor}
          onPress={acceptRide}
          rippleColor={R.color.gray5}
        />
      </View>
      <RideDetailsModal isVisibleModal={isModal} />
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
    borderColor: R.color.black,
    borderWidth: R.unit.scale(1),
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
  },
});

export default CustomerCard;
