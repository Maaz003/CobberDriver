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

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function ScheduledRidesScreen(props) {
  const {navigation} = props;
  const isFocused = useIsFocused();
  const schedule = useSelector(state => state.schedule);
  const user = useSelector(state => state.user);
  const userToken = user?.userToken;
  const [rides, setRides] = useState(new Array(schedule?.scheduledRides));
  const [upcomingRides, setUpcomingRides] = useState([]);
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
    {id: 0, name: 'Completed'},
    {id: 1, name: 'Cancelled'},
    {id: 2, name: 'Upcoming'},
  ];

  useEffect(() => {
    getScheduledRides(true);
  }, [isFocused]);

  const getScheduledRides = async showLoader => {
    showLoader && setLoading(true);
    const scheduledRidesUrl = URL(`scheduling-rides/driver?status=upcoming`);
    const response = await Get(scheduledRidesUrl, userToken);
    let results = response?.data?.data.slice(0);
    if (results.length > 0) {
      setRides(results);
    }
    showLoader && setLoading(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getScheduledRides(false);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderItem = ({item, index}) => {
    return <ScheduleCard key={index} item={item} rideDay={item.createdAt} />;
  };

  const selectTab = index => {
    setTab(index);
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      {loading && <TruckLoader />}

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 50 : 100,
          alignItems: 'center',
        }}>
        <View style={[R.styles.rowView, styles.tabLayout]}>
          {tabContent?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => selectTab(item?.id)}
                style={[
                  styles.tab,
                  {
                    backgroundColor:
                      item?.id === tab ? R.color.mainColor : R.color.black,
                  },
                  {
                    borderColor:
                      item?.id === tab ? R.color.mainColor : R.color.black,
                  },
                ]}>
                <Text
                  variant={'body4'}
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
          data={rides}
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
                  tab === 0 ? 'completed' : 'cancelled'
                } rides yet`}
                subText={`As soon as the there is a ${
                  tab === 0 ? 'completed' : 'cancelled'
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
    padding: R.unit.scale(5),
    paddingHorizontal: R.unit.scale(20),
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
