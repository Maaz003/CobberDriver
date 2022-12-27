import React, {useCallback, useEffect, useRef} from 'react';
import {ActivityIndicator, Alert, BackHandler, View} from 'react-native';
import {_SOCKET_REF} from '@store/extra/extraSlice';
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';
import {apiUrl} from '@config/apiUrl';
import {confirmDropOff} from '@store/user/userSlice';
import R from '@components/utils/R';
import {useFocusEffect} from '@react-navigation/native';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import HomeMap from '@components/view/screen/Home/HomeScreen/HomeMap';
import MapHeader from '@components/view/screen/Home/MapHeader';
import RidesList from '@components/view/screen/Home/HomeScreen/RidesList';
import CurrentLocation from '@components/utils/CurrentLocation';
import TruckLoader from '@components/common/TruckLoader';

function HomeScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const user = useSelector(state => state.user);

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
    headerColor: R.color.charcoalShade2,
  };

  const fetchLiveLocation = () => {
    CurrentLocation({actionCall: dispatch, flag: 'home'});
    // if (socketRef?.current) {
    // socketRef.current = io(apiUrl);
    // socketRef.current.emit('location', async data => {
    //   console.log('ASDASDSADAS SOCKET', data?.ride);
    // });
    // }
  };

  useEffect(() => {
    if (!user?.pickupLoc) {
      fetchLiveLocation();
    }
  }, []);

  useEffect(() => {
    socketRef.current = io(apiUrl);
    socketRef.current.emit('join', {id: user?.user?._id});
  }, []);

  useEffect(() => {
    let locationTimer = setInterval(fetchLiveLocation, 30000);
    return () => clearInterval(locationTimer);
  }, []);

  const onPress = () => {
    navigation.toggleDrawer();
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {text: 'Cancel'},
          {
            text: 'Yes',
            onPress: () => {
              dispatch(confirmDropOff(undefined));
              BackHandler.exitApp();
            },
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      {user?.locationLoader && <TruckLoader />}
      <View style={R.styles.mainLayout}>
        <MapHeader onPress={onPress} iconName={'menu'} />
        <HomeMap />
        <RidesList />
      </View>
    </ScreenBoiler>
  );
}

export default HomeScreen;
