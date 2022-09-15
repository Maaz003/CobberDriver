/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import AppNavigator from './src/navigation/index';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/store/index';
import {persistStore} from 'redux-persist';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {enableLatestRenderer} from 'react-native-maps';

import {Provider, useDispatch} from 'react-redux';
import {AppState, LogBox, Platform} from 'react-native';
import {
  requestLocationPermission,
  requestLocationPermissionIOS,
} from '@components/utils/Validators';
import CurrentLocation from '@components/utils/CurrentLocation';
// import {fcmSerice} from './src/store/notificationService/fcmService';
// import {localNotificationService} from './src/store/notificationService/localNotificationService';

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

  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestLocationIOS();
    } else {
      requestLocation();
    }
  }, []);

  const requestLocation = async () => {
    let granted = await requestLocationPermission();
  };

  const requestLocationIOS = async () => {
    let granted = await requestLocationPermissionIOS();
  };

  enableLatestRenderer();

  // useEffect(() => {
  //   fcmSerice.registerAppWithFCM();
  //   fcmSerice.register(onRegister, onNotification, onOpenNotification);
  //   localNotificationService.configure(onOpenNotification);
  //   function onRegister(token) {
  //     // console.log('first App Register : ', token);
  //   }
  //   function onNotification(notify) {
  //     // console.log('second onNotification : ', notify);
  //     const options = {
  //       soundName: 'default',
  //       playSound: true,
  //     };
  //     localNotificationService.showNotification(
  //       0,
  //       notify.title,
  //       notify.body,
  //       notify,
  //       options,
  //     );
  //   }
  //   function onOpenNotification(notify) {
  //     // console.log('OPEN NOTIFICA', notify);
  //   }

  //   return () => {
  //     // console.log('App unRegister');
  //     fcmSerice.unRegister();
  //     localNotificationService.unregister();
  //   };
  // }, []);

  const AppWrapper = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      CurrentLocation({actionCall: dispatch});
    }, []);

    return <AppNavigator />;
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
