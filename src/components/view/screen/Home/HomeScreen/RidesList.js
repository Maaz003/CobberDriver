import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import CustomerCard from './CustomerCard';
import BottomSheet from '@components/common/BottomSheet';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';

function RidesList() {
  const common = useSelector(state => state.common);

  const [active, setActive] = useState(0);

  const tabs = [
    {index: 0, title: 'Instant'},
    {index: 1, title: 'Schedule'},
  ];

  return (
    <BottomSheet
      onSwipeBottomSheet={() => null}
      initalHeight={R.unit.width(1) > 900 ? 0.09 : 0.11}>
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
              02
            </Text>
          </View>
        </View>

        {/* <View style={[R.styles.rowView, styles.tabsContainer]}>
          {tabs?.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setActive(item.index)}
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '50%',
                  backgroundColor:
                    index === active
                      ? R.color.mainColor
                      : R.color.charcoalShade2,
                }}>
                <Text
                  variant={index === active ? 'body2' : 'body3'}
                  font={'PoppinsSemiBold'}
                  color={
                    index === active
                      ? R.color.charcoalShade2
                      : R.color.mainColor
                  }
                  align={'center'}
                  transform={'none'}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View> */}

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
  tabsContainer: {
    width: '100%',
    height: 50,
    marginTop: R.unit.scale(30),
  },
});

export default RidesList;
