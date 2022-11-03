import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import CustomerCard from './CustomerCard';
import BottomSheet from '@components/common/BottomSheet';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';

function RidesList(props) {
  const common = useSelector(state => state.common);
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    if (common?.tempRides) {
      let res = common?.tempRides[1].requestedRides.every(
        item => item.isCompleted,
      );
      if (res) {
        setFilteredArray([common?.tempRides[0]]);
      } else {
        setFilteredArray(common.tempRides);
      }
    }
  }, [common?.tempRides]);

  return (
    <BottomSheet onSwipeBottomSheet={() => null} initalHeight={0.11}>
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
              font={'PoppinsMedium'}
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
            {filteredArray?.map((item, index) => {
              return <CustomerCard item={item} key={index} />;
            })}
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
    paddingBottom: R.unit.scale(152),
  },
});

export default RidesList;
