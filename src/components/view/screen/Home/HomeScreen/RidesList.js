import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {createRideSession} from '@store/ride/rideSlice';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import CustomerCard from './CustomerCard';
import BottomSheet from '@components/common/BottomSheet';
import {newRides} from '@store/rides/ridesSlice';
import TruckLoader from '@components/common/TruckLoader';
import TruckError from '@components/common/TruckError';

function RidesList() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const rides = useSelector(state => state.rides);
  const user = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [rideRequests, setRideRequests] = useState([]);
  const userToken = user?.userToken;

  useEffect(() => {
    getNewRides();
  }, [isFocused]);

  const getNewRides = async () => {
    if (user?.user?.driverInfo?.isInRide) {
      //INSTANT RIDE SESSION
      if (user?.user?.driverInfo?.currentRide) {
        let currentRideSession = user?.user?.driverInfo?.currentRide;
        console.log(
          'currentRideSession',
          JSON.stringify(currentRideSession, null, 2),
        );
        let rideSessionStatus;
        let inRideStatus;
        let rideType = currentRideSession?.isSchedule ? 'schedule' : 'instant';

        if (currentRideSession?.status === 'accepted') {
          rideSessionStatus = 'notstarted';
          inRideStatus = 'accepted';
        }
        if (currentRideSession?.status === 'in-ride') {
          rideSessionStatus = 'pickupstarted';
          inRideStatus = 'started';
        }
        if (currentRideSession?.status === 'completed') {
          rideSessionStatus = 'dropoffended';
          inRideStatus = 'ended';
        }

        const location = {
          pickUpLocation: currentRideSession?.pickUpAddress,
          dropOffLocation: currentRideSession?.dropOffAddress,
          pickUpLoc: {
            latitude: currentRideSession?.pickUpLocation?.coordinates[1],
            longitude: currentRideSession?.pickUpLocation?.coordinates[0],
          },
          dropOffLoc: {
            latitude: currentRideSession?.dropOffLocation?.coordinates[1],
            longitude: currentRideSession?.dropOffLocation?.coordinates[1],
          },
        };

        let {
          pickUpLocation,
          dropOffLocation,
          pickUpAddress,
          dropOffAddress,
          ...rideSessionData
        } = currentRideSession;
        rideSessionData = {...rideSessionData, location};

        const dataRide = {
          data: {
            ...rideSessionData,
            rideStatus: rideSessionStatus,
            type: rideType,
          },
          inRide: inRideStatus,
        };

        await dispatch(createRideSession(dataRide));
      }
    } else {
      console.log('ELKSE RRsadkljlbjsadhlsial', rides?.newRides);
      setLoading(true);
      await dispatch(
        newRides({
          token: userToken,
        }),
      );
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (rides?.newRides) {
      if (active === 0) {
        let updatedArr = rides?.newRides?.data?.rides?.map(item => {
          return {
            ...item,
            isScheduled: false,
          };
        });
        setRideRequests(updatedArr);
      } else {
        let updatedArr = rides?.newRides?.data?.schedulingRides?.map(item => {
          return {
            ...item,
            isScheduled: true,
          };
        });
        setRideRequests(updatedArr);
      }
    }
  }, [active, rides?.newRides?.data]);

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
            <TruckLoader
              containerStyles={{
                height: R.unit.height(0.5),
                width: '100%',
              }}
              overlayColor={R.color.charcoalShade2}
            />
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
                ListEmptyComponent={() => {
                  return (
                    <TruckError
                      headingColor={R.color.lightSilverShade2}
                      subTextColor={R.color.lightSilverShade2}
                      heading={`You have no ${
                        active === 0 ? 'Instant' : 'Scheduled'
                      } rides yet`}
                      subText={`As soon as the there is a ${
                        active === 0 ? 'Instant' : 'Scheduled'
                      } request it will appear in this list.`}
                    />
                  );
                }}
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
  },
  tabsContainer: {
    width: '100%',
    height: 50,
    marginTop: R.unit.scale(30),
  },
});

export default RidesList;
