import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import CustomerCard from './CustomerCard';
import BottomSheet from '@components/common/BottomSheet';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

function RidesList(props) {
  const [show, setShow] = useState(false);

  const onSwipeBottomSheet = index => {
    if (index === 0) {
      setShow(false);
      c;
    } else {
      setShow(true);
    }
  };

  return (
    <BottomSheet
      maxHeight={4}
      onSwipeBottomSheet={onSwipeBottomSheet}
      initalHeight={0.12}>
      <View style={styles.contentView}>
        <View style={R.styles.rowView}>
          <Text
            variant={'body2'}
            font={'PoppinsRegular'}
            color={R.color.white}
            align={'center'}
            style={{top: 2}}
            transform={'none'}>
            You have a New Ride
          </Text>
          <View style={styles.numberView}>
            <Text
              variant={'body3'}
              font={'PoppinsRegular'}
              color={R.color.black}
              align={'center'}
              transform={'none'}>
              01
            </Text>
          </View>
        </View>

        <View style={styles.scrollViewContainer}>
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}>
            <CustomerCard />
            <CustomerCard />
            <CustomerCard />
          </BottomSheetScrollView>
        </View>
      </View>
    </BottomSheet>
  );
}
const styles = StyleSheet.create({
  contentView: {
    width: '100%',
    display: 'flex',
    backgroundColor: R.color.charcoalShade2,
    paddingHorizontal: R.unit.scale(12),
  },
  numberView: {
    height: R.unit.scale(40),
    width: R.unit.scale(40),
    borderRadius: R.unit.scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.color.mainColor,
    flexDirection: 'row',
  },
  scrollViewContainer: {
    height: '100%',
    marginTop: R.unit.scale(32),
    borderRadius: R.unit.scale(12),
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    borderRadius: R.unit.scale(12),
    paddingBottom: R.unit.scale(32),
  },
});

export default RidesList;
