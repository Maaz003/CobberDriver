import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import R from '@components/utils/R';
import {pinLocation, locationLoader} from '@store/user/userSlice';
import Icon from '@components/common/Icon';
import {
  requestLocationPermission,
  statusLocationPermission,
} from '@components/utils/Validators';
import Toast from '@components/utils/Toast';
import CurrentLocation from '@components/utils/CurrentLocation';

function LiveLocation(props) {
  const dispatch = useDispatch();

  const checkLocationAccess = async () => {
    if (Platform.OS === 'android') {
      let granted = await statusLocationPermission();
      if (granted) {
        dispatch(locationLoader(true));
        CurrentLocation({actionCall: dispatch, flag: true});
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
        CurrentLocation({actionCall: dispatch, flag: true});
        dispatch(pinLocation(false));
      } else {
        Toast.show({
          type: 'danger',
          title: 'Location Permission Error',
          message:
            'In order to fetch current location. Go to settings and change access',
          duration: 2000,
        });
      }
    }
  };

  const fetchLocationPermission = async () => {
    let request = await requestLocationPermission();
  };

  return (
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
  );
}

export default LiveLocation;

const styles = StyleSheet.create({
  iconView: {
    backgroundColor: R.color.charcoalShade2,
    padding: R.unit.scale(10),
    borderRadius: R.unit.scale(10),
    borderColor: R.color.black,
  },
});
