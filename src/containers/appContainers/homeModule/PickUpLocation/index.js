import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, BackHandler, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  scheduledRideTime,
  confirmPickUp,
  confirmDropOff,
} from '@store/user/userSlice';
import R from '@components/utils/R';
import {useFocusEffect} from '@react-navigation/native';
import {getAddressFromCoordinates} from '@components/utils/CurrentLocation';
import PickUpLocationCard from '@components/view/screen/Home/PickUp/PickUpLocationCard';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import PickUpMap from '@components/view/screen/Home/PickUp/PickUpMap';
import HomeHeader from '@components/view/screen/Home/HomeHeader';
import LiveLocation from '@components/view/screen/Home/PickUp/LiveLocation';

function PickUpLocation(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

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
              let reqData = undefined;
              dispatch(scheduledRideTime(reqData));
              let CooOrdiantes = undefined;
              dispatch(confirmDropOff(CooOrdiantes));

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

  useEffect(() => {
    if (user?.pickupLoc === undefined) {
      getAddress();
    }
  }, []);

  const getAddress = async () => {
    let response = await getAddressFromCoordinates(initialLat, initialLong);
    dispatch(confirmPickUp(response));
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <View style={R.styles.mainLayout}>
        <HomeHeader onPress={onPress} iconName={'menu'} />
        <PickUpMap />
        {/* <LiveLocation /> */}
        {user?.locationLoader && (
          <View style={R.styles.loaderView}>
            <ActivityIndicator
              size="large"
              color={R.color.mainColor}
              style={{marginTop: R.unit.scale(280)}}
            />
          </View>
        )}
        <PickUpLocationCard navigation={props.navigation} />
      </View>
    </ScreenBoiler>
  );
}

export default PickUpLocation;
