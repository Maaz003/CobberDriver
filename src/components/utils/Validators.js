import {PermissionsAndroid, Platform} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {
  check,
  PERMISSIONS,
  request,
  openSettings,
} from 'react-native-permissions';
import {View, StyleSheet, Button, Alert} from 'react-native';

const emailREX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,256}))$/;

const onlyAlphaREX = /^[a-zA-Z]+$/;

export default {
  emailREX,
  onlyAlphaREX,
};

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cobber App Location Permission',
        message:
          'Cobber App needs access to your Location ' +
          'for better experience.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert(
        'Location Permission',
        `You haven't enabled location access. For enabling location go to user settings and grant location access`,
        [{text: 'OK', onPress: () => RNExitApp.exitApp()}],
        {cancelable: false},
      );

      return false;
    }
  } catch (err) {
    // console.warn(err);
  }
};

export const requestLocationPermissionIOS = async () => {
  try {
    const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, {
      title: 'Cobber App Location Permission',
      message: 'Cobber would like access to your location ',
    });

    if (granted === 'granted') {
      return true;
    } else {
      Alert.alert(
        'Location Permission',
        `You haven't enabled location access. For enabling location go to user settings and grant location access`,
        [{text: 'OK', onPress: () => RNExitApp.exitApp()}],
        {cancelable: false},
      );
      return false;
    }
  } catch (err) {}
};

export const statusLocationPermission = async () => {
  if (Platform.OS == 'android') {
    const permissionAndroid = await PermissionsAndroid.check(
      'android.permission.ACCESS_FINE_LOCATION',
    );
    if (permissionAndroid) {
      return true;
    } else {
      return false;
    }
  } else {
    const perm = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (perm === 'granted') {
      return true;
    } else {
      return false;
    }
  }
};
