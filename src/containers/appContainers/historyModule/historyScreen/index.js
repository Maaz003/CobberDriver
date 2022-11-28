import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {URL} from '@config/apiUrl';
import {Get} from '@axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import Text from '@components/common/Text';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import R from '@components/utils/R';
import HistoryCard from '@components/view/cards/HistoryCard';
import {useIsFocused} from '@react-navigation/native';
import TruckLoader from '@components/common/TruckLoader';
import TruckError from '@components/common/TruckError';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function History(props) {
  const {navigation} = props;
  const isFocused = useIsFocused();
  const user = useSelector(state => state.user);
  const userToken = user?.userToken;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState(0);
  const [cancelledRides, setCancelledRides] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);
  const [rides, setRides] = useState([]);

  const headerProps = {
    isSubHeader: true,
    mainHeading: 'My Rides',
  };

  const tabContent = [
    {id: 0, name: 'Completed'},
    {id: 1, name: 'Cancelled'},
  ];

  useEffect(() => {
    getRidesHistory(true);
  }, [isFocused]);

  const getRidesHistory = async showLoader => {
    showLoader && setLoading(true);
    const historyUrl = URL(`rides`);
    const response = await Get(historyUrl, userToken);
    let results = response?.data?.data.slice(0);
    if (results.length > 0) {
      if (tab === 0) {
        let completedRes = results.filter(item => item.status === 'completed');
        setCompletedRides(completedRes);
        setRides(completedRes);
      } else {
        let cancelledRes = results.filter(item => item.status === 'cancelled');
        setCancelledRides(cancelledRes);
      }
    }
    showLoader && setLoading(false);
  };

  const renderItem = ({item, index}) => {
    return <HistoryCard key={index} item={item} />;
  };

  const selectTab = index => {
    setTab(index);
    let tempArr = index === 0 ? completedRides : cancelledRides;
    setRides(tempArr);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getRidesHistory(false);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <>
      <ScreenBoiler headerProps={headerProps} {...props}>
        {loading && <TruckLoader />}
        <View style={styles.container}>
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
                    variant={'body3'}
                    font={'PoppinsRegular'}
                    gutterTop={2}
                    color={item?.id === tab ? R.color.black : R.color.white}
                    align={'center'}
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
            // data={tab === 0 ? completedRides : cancelledRides}
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
        </View>
      </ScreenBoiler>
    </>
  );
}
export default History;

const styles = StyleSheet.create({
  container: {
    width: R.unit.width(1),
    paddingHorizontal: R.unit.scale(10),
    backgroundColor: R.color.lightSilver,
    flex: 1,
    alignItems: 'center',
  },
  tabLayout: {
    width: R.unit.width(1),
    padding: R.unit.scale(5),
    alignItems: 'center',
    marginTop: R.unit.scale(10),
    paddingHorizontal: R.unit.scale(20),
  },
  tab: {
    padding: R.unit.scale(12),
    paddingHorizontal: R.unit.scale(20),
    borderRadius: R.unit.scale(20),
    borderWidth: 1,
    borderColor: R.color.black,
    width: R.unit.width(0.4),
  },
});
