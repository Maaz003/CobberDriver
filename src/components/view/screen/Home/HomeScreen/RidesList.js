import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import CustomerCard from './CustomerCard';
import BottomSheet from '@components/common/BottomSheet';
import {BottomSheetScrollView, BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {newRides} from '@store/rides/ridesSlice';
import {useIsFocused} from '@react-navigation/native';
import Loader from '@components/common/Loader';

function RidesList() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const common = useSelector(state => state.common);
  const rides = useSelector(state => state.rides);
  const user = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [rideRequests, setRideRequests] = useState([]);
  const userToken = user?.userToken;

  useEffect(() => {
    getNewRides();
  }, []);

  const getNewRides = async () => {
    setLoading(true);
    // console.log('SUER', user?.userToken);
    await dispatch(newRides(userToken));
    setLoading(false);
  };

  // console.log('rides?.newRides', JSON.stringify(rides, null, 2));

  // useEffect(() => {
  //   if (active === 0) {
  //     let updatedArr = rides?.newRides?.data?.rides?.map(item => {
  //       return {
  //         ...item,
  //         isScheduled: false,
  //       };
  //     });
  //     setRideRequests(updatedArr);
  //   } else {
  //     let updatedArr = rides?.newRides?.data?.schedulingRides?.map(item => {
  //       return {
  //         ...item,
  //         isScheduled: true,
  //       };
  //     });
  //     setRideRequests(updatedArr);
  //   }
  // }, [active]);

  const tabChange = index => {
    setActive(index);
    getNewRides();
  };

  const tabs = [
    {index: 0, title: 'Instant'},
    {index: 1, title: 'Schedule'},
  ];

  const renderItem = ({item, index}) => {
    return <CustomerCard item={item} key={index} />;
  };

  return (
    <BottomSheet
      onSwipeBottomSheet={() => null}
      initalHeight={R.unit.width(1) > 900 ? 0.09 : 0.13}>
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

        <View style={[R.styles.rowView, styles.tabsContainer]}>
          {tabs?.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => tabChange(item.index)}
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
        </View>

        <View style={styles.scrollViewContainer}>
          {loading ? (
            <View
              style={{
                paddingTop: R.unit.height(0.24),
              }}>
              <Loader color={R.color.mainColor} />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                paddingBottom: R.unit.height(0.44),
              }}>
              <BottomSheetFlatList
                showsVerticalScrollIndicator={false}
                data={rideRequests}
                keyExtractor={i => i}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
              />
            </View>
          )}
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
    flexGrow: 1,
  },
  contentContainer: {
    flexGrow: 1,
    borderRadius: R.unit.scale(12),
    // paddingBottom: R.unit.scale(152),
  },
  tabsContainer: {
    width: '100%',
    height: 50,
    marginTop: R.unit.scale(30),
  },
});

export default RidesList;
