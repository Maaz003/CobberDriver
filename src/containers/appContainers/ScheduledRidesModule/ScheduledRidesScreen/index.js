import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  FlatList,
  RefreshControl,
} from 'react-native';
import {URL} from '@config/apiUrl';
import {Get} from '@axios/AxiosInterceptorFunction';
import Text from '@components/common/Text';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import R from '@components/utils/R';
import {useSelector} from 'react-redux';
import ScheduleCard from '@components/view/screen/ScheduledRide/ScheduleCard';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import TruckLoader from '@components/common/TruckLoader';
import TruckError from '@components/common/TruckError';
import Toast from '@components/utils/Toast';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function ScheduledRidesScreen(props) {
  const {navigation} = props;
  const isFocused = useIsFocused();
  const user = useSelector(state => state.user);
  const userToken = user?.userToken;
  const [rides, setRides] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState(0);

  const headerProps = {
    isSubHeader: true,
    mainHeading: 'Scheduled Rides',
    headerColor: R.color.white,
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => (user?.inRide === 'scheduleEnded' ? true : false),
      );

      return () => backHandler.remove();
    }, [user?.inRide]),
  );

  const tabContent = [
    {id: 0, name: 'Accepted', status: ['pending', 'in-ride']},
    {id: 1, name: 'Completed', status: ['completed']},
    {id: 2, name: 'Cancelled', status: ['cancelled']},
  ];

  useEffect(() => {
    getScheduledRides(true);
  }, [isFocused]);

  const getScheduledRides = async showLoader => {
    try {
      showLoader && setLoading(true);
      const scheduledRidesUrl = URL(`scheduling-rides/driver`);
      const response = await Get(scheduledRidesUrl, userToken);
      let results = response?.data?.data;
      if (response !== undefined) {
        if (results.length > 0) {
          setRides(results);
          let status =
            tab === 0
              ? ['pending', 'in-ride']
              : tab === 1
              ? ['completed']
              : ['cancelled'];
          let updatedArray = results.filter(item =>
            status.includes(item.status),
          );
          let reversedArray = updatedArray?.reverse().slice(0);

          setHistory(reversedArray);
        } else {
          setLoading(false);
          setRides([]);
        }
      }
      showLoader && setLoading(false);
    } catch (error) {
      Toast.show({
        title: 'Oops! Something went wrong. Try again later',
        // message: 'Oops',
        type: 'danger',
      });
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getScheduledRides(false);
    setTab(0);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <ScheduleCard
        key={index}
        item={item}
        rideDay={item?.initialRideRequest?.pickUpTime}
      />
    );
  };

  const selectTab = item => {
    const {status, id} = item;
    setTab(id);
    let tempArr = rides.length > 0 ? rides.slice(0) : [];
    let updatedArray = tempArr.filter(item => status.includes(item.status));
    let reversedArray = updatedArray?.reverse().slice(0);

    setHistory(reversedArray);
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      {loading || refreshing ? <TruckLoader /> : null}

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 50 : 100,
          alignItems: 'center',
          flexGrow: 1,
        }}>
        <View style={[R.styles.rowView, styles.tabLayout]}>
          {tabContent?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => selectTab(item)}
                style={[
                  styles.tab,
                  {
                    backgroundColor:
                      item?.id === tab ? R.color.mainColor : R.color.black,
                    borderColor:
                      item?.id === tab ? R.color.mainColor : R.color.black,
                  },
                ]}>
                <Text
                  variant={'body3'}
                  font={'PoppinsRegular'}
                  gutterTop={2}
                  color={item?.id === tab ? R.color.black : R.color.white}
                  align={'left'}
                  transform={'none'}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}
          renderItem={renderItem}
          data={history}
          bounces={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={R.color.mainColor}
              colors={[R.color.blackShade2, R.color.white]}
              tintColor={R.color.mainColor}
            />
          }
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 50 : 100,
            alignItems: 'center',
            flexGrow: 1,
            paddingHorizontal: 0,
          }}
          ListEmptyComponent={() => {
            return (
              <TruckError
                heading={`You have no ${
                  tab === 0 ? 'accepted' : tab === 1 ? 'completed' : 'cancelled'
                } rides yet`}
                subText={`As soon as the there is a ${
                  tab === 0 ? 'accepted' : tab === 1 ? 'completed' : 'cancelled'
                } request it will appear in this list.`}
              />
            );
          }}
        />
      </ScrollView>
    </ScreenBoiler>
  );
}
export default ScheduledRidesScreen;

const styles = StyleSheet.create({
  container: {
    width: R.unit.width(1),
    paddingHorizontal: R.unit.scale(10),
    backgroundColor: R.color.lightSilver,
  },
  tabLayout: {
    alignItems: 'center',
    marginTop: R.unit.scale(10),
    width: '100%',
  },
  tab: {
    paddingHorizontal: R.unit.scale(20),
    paddingVertical: R.unit.scale(10),
    borderRadius: R.unit.scale(30),
    borderWidth: 1,
    borderColor: R.color.black,
  },
  historyCard: {
    width: R.unit.width(0.85),
    marginTop: R.unit.scale(20),
    borderRadius: R.unit.scale(20),
    paddingHorizontal: R.unit.scale(20),
    paddingVertical: R.unit.scale(10),
    backgroundColor: R.color.white,
    shadowColor: R.color.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  header: {
    paddingHorizontal: 0,
    marginBottom: R.unit.scale(10),
  },
  content: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  image: {
    width: R.unit.scale(60),
    height: R.unit.scale(60),
    borderRadius: R.unit.scale(100),
    borderWidth: R.unit.scale(2),
    borderColor: R.color.mainColor,
  },
  iconsColumn: {
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView: {
    width: '87%',
  },
});
