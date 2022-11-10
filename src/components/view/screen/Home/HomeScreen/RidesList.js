import React from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import CustomerCard from './CustomerCard';
import BottomSheet from '@components/common/BottomSheet';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';

function RidesList() {
  const common = useSelector(state => state.common);

  return (
    // <View
    //   style={{
    //     position: 'absolute',
    //     bottom: -40,
    //     left: 0,
    //     right: 0,
    //     height: 100,
    //     backgroundColor: 'red',
    //     width: '100%',
    //   }}>
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
            {common?.tempRides?.map((item, index) => {
              return <CustomerCard item={item} key={index} />;
            })}
          </BottomSheetScrollView>
        </View>
      </View>
    </BottomSheet>
    // </View>
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
