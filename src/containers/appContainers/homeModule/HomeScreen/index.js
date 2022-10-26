import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, Alert, BackHandler, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {confirmDropOff} from '@store/user/userSlice';
import R from '@components/utils/R';
import {useFocusEffect} from '@react-navigation/native';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import HomeMap from '@components/view/screen/Home/PickUp/HomeMap';
import HomeHeader from '@components/view/screen/Home/HomeHeader';
import RidesList from '@components/view/screen/Home/PickUp/RidesList';
import CurrentLocation from '@components/utils/CurrentLocation';

function HomeScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const headerProps = {
    isHeader: true,
    isSubHeader: false,
  };

  useEffect(() => {
    if (!user?.pickupLoc) {
      CurrentLocation({actionCall: dispatch, flag: true});
    }
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
      <View style={R.styles.mainLayout}>
        <HomeHeader onPress={onPress} iconName={'menu'} />
        <HomeMap />
        {user?.locationLoader && (
          <View style={R.styles.loaderView}>
            <ActivityIndicator size="large" color={R.color.mainColor} />
          </View>
        )}
        <RidesList navigation={props.navigation} />
      </View>
    </ScreenBoiler>
  );
}

export default HomeScreen;
