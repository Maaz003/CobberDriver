import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigation/index';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import store from './src/store/index';
import {persistStore} from 'redux-persist';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {enableLatestRenderer} from 'react-native-maps';
import Toast from 'react-native-toast-message';
import {Notifications} from 'react-native-notifications';
import LocalNotification from '@components/utils/Notifications';

import {Provider, useDispatch, useSelector} from 'react-redux';
import {AppState, LogBox, Platform, TouchableOpacity, View} from 'react-native';
import {
  requestLocationPermission,
  requestLocationPermissionIOS,
  statusLocationPermission,
} from '@components/utils/Validators';
import CurrentLocation from '@components/utils/CurrentLocation';
import Icon from '@components/common/Icon';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import {setFcmToken} from '@store/misc/miscSlice';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  let persistor = persistStore(store);
  useEffect(() => {
    SplashScreen.hide();
  });

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  // useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     requestLocationIOS();
  //   } else {
  //     requestLocation();
  //   }
  // }, []);

  const requestLocation = async () => {
    let granted = await requestLocationPermission();
  };

  const requestLocationIOS = async () => {
    let granted = await requestLocationPermissionIOS();
  };

  enableLatestRenderer();

  const toastConfig = {
    customToast: props => {
      const hideToast = () => {
        props.onPress();
      };
      return (
        <View
          style={{
            ...R.styles.popUpContainer,
            backgroundColor: props.props.bgColor,
          }}>
          <View
            style={{
              ...R.styles.twoItemsRow,
              flex: 1,
            }}>
            <View>{props.props.leftIcon}</View>
            <Text
              variant={'body4'}
              font={'PoppinsMedium'}
              color={props.props.textColor}
              align={'left'}
              numberOfLines={3}
              style={{marginLeft: R.unit.scale(8), width: '90%'}}
              transform={'none'}>
              {props.text1}
            </Text>
          </View>

          <TouchableOpacity
            onPress={hideToast}
            style={{padding: R.unit.scale(5)}}>
            {props.props.rightIcon ? (
              props.props.rightIcon
            ) : (
              <Icon
                type={'Ionicons'}
                name={'close'}
                color={R.color.mainColor}
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>
      );
    },
  };

  const AppWrapper = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [isAccess, setIsAccess] = useState(false);

    // useEffect(() => {
    //   LocalNotification({
    //     title: 'qwwwwwwww',
    //     text: '----------',
    //   });
    // }, []);

    const getToken = async () => {
      try {
        let deviceToken = await messaging().getToken();
        dispatch(setFcmToken(deviceToken));
        console.log('deviceToken', deviceToken);
      } catch (error) {
        console.log('ERROR', error);
      }
    };

    useEffect(() => {
      getToken();
    }, []);

    useEffect(() => {
      Notifications.registerRemoteNotifications();

      const messageSub = messaging().onMessage(async remoteMessage => {
        console.warn('DSSSSSSSSSSSSSSSSs======', remoteMessage?.notification);
        LocalNotification({
          title: remoteMessage?.notification?.title,
          text: remoteMessage?.notification?.body,
        });

        Notifications.events().registerNotificationOpened(
          (notification: Notification, completion) => {
            // WHEN APP IS IN FOREGROUND AND APP IS OPENED
            completion();
          },
        );
      });

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.warn(
          'BACKGROUND MESSGAE HANDLER WHJEN APP WILL BE IN BACKGROUND',
        );

        // Notifications.events().registerNotificationReceivedBackground()
      });

      messaging().onNotificationOpenedApp(async remoteMessage => {
        // WHEN APP IS OPENED FROM BACKGROUND THIS WILL RUN
        console.warn('bACKGROUND OPENED');
      });

      Notifications.getInitialNotification()
        .then(notify => {
          console.warn('WHEN APP IS KILLEDD-----');
        })
        .catch(err => {
          console.warn('ERRROR NOTIFICATION GET NOTI');
        });

      return messageSub;
    }, []);

    const getLiveLocation = async () => {
      try {
        let granted = await statusLocationPermission();
        if (granted) {
          dispatch(locationLoader(true));
          setIsAccess(true);
          if (!auth?.isAuth) {
            CurrentLocation({actionCall: dispatch});
          }
        } else {
          getLocationAccess();
        }
      } catch (error) {}
    };

    const getLocationAccess = async () => {
      if (Platform.OS === 'android') {
        let granted = await requestLocationPermission();
      } else {
        let granted = await requestLocationPermissionIOS();
      }
    };

    useEffect(() => {
      console.log('BEFORE AUTH UE');
      getLiveLocation();
    }, [isAccess === false]);

    return (
      <>
        <AppNavigator />
        {auth?.firstTimePop ? <Toast config={toastConfig} /> : null}
      </>
    );
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWrapper />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
