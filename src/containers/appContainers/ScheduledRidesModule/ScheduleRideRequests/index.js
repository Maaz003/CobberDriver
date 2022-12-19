import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {createRideSession} from '@store/user/userSlice';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import RideRequestsCard from '@components/view/screen/Home/RideRequestsCard';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Button from '@components/common/Button';

function ScheduleRideRequestsScreen(props) {
  const {navigation} = props;
  const {data, status} = props.route.params;
  const dispatch = useDispatch();
  const [showEndButton, setShowEndButton] = useState(false);
  const [ridesData, setRidesData] = useState([]);
  let showNewRequestStatus = ['pending', 'in-ride'];

  console.log('FORU IN 2222', status);

  useEffect(() => {
    let tempArr =
      status === 'completed'
        ? data?.rides
        : status === 'cancelled'
        ? data?.cancelledRides
        : data?.rides;
    setRidesData(tempArr);
  }, [data]);

  const headerProps = {
    isMainHeader: true,
    isSubHeader: false,
    mainHeading: 'Payment',
  };

  const backPress = () => {
    navigation.goBack();
  };

  const finishRide = () => {
    const dataRide = {data: undefined, inRide: 'finished'};
    dispatch(createRideSession(dataRide));
  };

  return (
    <ScreenBoiler props={props} headerProps={headerProps} backPress={backPress}>
      <View style={[styles.mainLayout, R.styles.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <View style={styles.contentView}>
            <Text
              variant={'h4'}
              font={'Sequel551'}
              color={R.color.blackShade3}
              align={'left'}
              transform={'none'}>
              Schedule Rides
            </Text>

            {showNewRequestStatus?.includes(status) && (
              <>
                {data?.requestedRides?.length !== 0 && (
                  <View style={styles.moreRequestsControlSection}>
                    <TouchableOpacity
                      style={styles.moreRequestsControlButton}
                      activeOpacity={0.6}
                      onPress={() =>
                        navigation.navigate('NewScheduleRideRequests', {
                          data: data,
                        })
                      }>
                      <Text
                        variant={'body3'}
                        font={'PoppinsRegular'}
                        color={R.color.blackShade3}
                        align={'right'}
                        transform={'capitalize'}>
                        New Requests
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.badge}>
                      <Text
                        variant={'body4'}
                        font={'PoppinsSemiBold'}
                        color={R.color.white}
                        align={'center'}
                        transform={'capitalize'}>
                        {data?.requestedRides?.length}
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}
            {ridesData?.map((item, index, arr) => {
              return (
                <RideRequestsCard
                  item={item}
                  index={index}
                  arr={arr}
                  key={index}
                  mainRideId={data?._id}
                  screenType={'History'}
                />
              );
            })}

            {showEndButton && (
              <Button
                value={'Complete Ride'}
                bgColor={R.color.cancelColor}
                width={'100%'}
                size={'lg'}
                gutterTop={30}
                color={R.color.white}
                borderColor={R.color.cancelColor}
                disabled={false}
                loaderColor={R.color.white}
                borderWidth={1}
                borderRadius={10}
                onPress={finishRide}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </ScreenBoiler>
  );
}
export default ScheduleRideRequestsScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(10),
    flex: 1,
    marginTop: R.unit.scale(16),
  },
  contentView: {
    width: '100%',
    justifyContent: 'center',
  },
  moreRequestsControlSection: {
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  moreRequestsControlButton: {
    backgroundColor: R.color.gray2,
    paddingHorizontal: R.unit.scale(14),
    paddingVertical: R.unit.scale(10),
    borderRadius: R.unit.scale(8),
  },

  badge: {
    position: 'absolute',
    right: -5,
    top: -8,
    backgroundColor: R.color.cancelColor,
    height: R.unit.scale(18),
    width: R.unit.scale(18),
    borderRadius: R.unit.scale(18),
    justifyContent: 'center',
  },
});
