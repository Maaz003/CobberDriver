import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import R from '@components/utils/R';
import {pinLocation, locationLoader} from '@store/user/userSlice';
import Icon from '@components/common/Icon';
import {
  requestLocationPermission,
  statusLocationPermission,
  requestLocationPermissionIOS,
} from '@components/utils/Validators';
import Toast from '@components/utils/Toast';
import CurrentLocation from '@components/utils/CurrentLocation';
import {openSettings} from 'react-native-permissions';

function LiveLocation(props) {
  const dispatch = useDispatch();

  const checkLocationAccess = async () => {
    if (Platform.OS === 'android') {
      let granted = await statusLocationPermission();
      if (granted) {
        dispatch(locationLoader(true));
        CurrentLocation({actionCall: dispatch, flag: 'home'});
        dispatch(pinLocation(false));
      } else {
        Toast.show({
          type: 'danger',
          title: 'Location Permission Error',
          message:
            'In order to fetch current location. Allow Location Permission ',
          duration: 2000,
        });
        fetchLocationPermission();
      }
    } else {
      let granted = await statusLocationPermission();
      if (granted) {
        dispatch(locationLoader(true));
        CurrentLocation({actionCall: dispatch, flag: 'home'});
        dispatch(pinLocation(false));
      } else {
        // openSettings().catch(() => console.warn('cannot open settings'));
        Toast.show({
          type: 'danger',
          title: 'Location Permission Error',
          message:
            'In order to fetch current location. Go to settings and change access',
          duration: 2000,
        });
        // fetchLocationPermissionIOS();
      }
    }
  };

  const fetchLocationPermission = async () => {
    let request = await requestLocationPermission();
  };

  const fetchLocationPermissionIOS = async () => {
    let request = await requestLocationPermissionIOS();
  };

  return (
    <View style={styles.locationView}>
      <TouchableOpacity
        onPress={checkLocationAccess}
        activeOpacity={0.9}
        style={styles.iconView}>
        <Icon
          name={'crosshairs-gps'}
          type={'MaterialCommunityIcons'}
          size={20}
          color={R.color.white}
        />
      </TouchableOpacity>
    </View>
  );
}

export default LiveLocation;

const styles = StyleSheet.create({
  locationView: {
    zIndex: 99999,
    width: R.unit.width(0.97),
    paddingVertical: R.unit.scale(10),
    position: 'absolute',
    bottom:
      R.unit.height(1) > 800
        ? R.unit.width(1) - R.unit.scale(170)
        : R.unit.width(1) - R.unit.scale(150),
    right: R.unit.scale(0),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: R.unit.scale(5),
  },
  iconView: {
    backgroundColor: R.color.charcoalShade2,
    padding: R.unit.scale(10),
    borderRadius: R.unit.scale(10),
    borderColor: R.color.black,
  },
});
