import moment from 'moment';
import {Linking, Platform} from 'react-native';
import {Patch, Get} from '@axios/AxiosInterceptorFunction';
import {apiHeader, URL} from '@config/apiUrl';
import {updateUser} from '@store/user/userSlice';
import DeviceInfo from 'react-native-device-info';

export function stringTrim(value, index = 2) {
  if (value !== undefined) {
    const parts = value && value.split(',');
    const firstTwo = parts.slice(0, index);
    const result = firstTwo.join(',');
    return result;
  }
}

export function fareRoundOff(value) {
  return Math.abs(value) > 999
    ? Math.sign(value) * (Math.abs(value) / 1000).toFixed(1) + 'k'
    : Math.sign(value) * Math.abs(value);
}

export function timeFormatSchedule(value) {
  let formatted = moment(value).calendar({
    sameDay: '[Today], hh:mm A',
    nextDay: '[Tomorrow], hh:mm A',
    nextWeek: 'Do MMM, hh:mm A',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'Do MMM, hh:mm A',
  });

  return formatted;
}

export const calculateDelta = points => {
  let minX, maxX, minY, maxY;
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  points.map(point => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX + 0.12;
  const deltaY = maxY - minY + 0.12;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY,
  };
};

export const openDirections = (type, location) => {
  let latitude;
  let longitude;
  let label;

  if (type === 'Pickup') {
    latitude = String(location.pickUpLoc.latitude);
    longitude = String(location.pickUpLoc.longitude);
    label = location.pickUpLocation;
  } else {
    latitude = String(location.dropOffLoc.latitude);
    longitude = String(location.dropOffLoc.latitude);
    label = location.dropOffLocation;
  }

  const url = Platform.select({
    ios: 'maps:' + latitude + ',' + longitude + '?q=' + label,
    android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
  });

  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      return Linking.openURL(url);
    } else {
      const browser_url =
        'https://www.google.de/maps/@' +
        latitude +
        ',' +
        longitude +
        '?q=' +
        label;
      return Linking.openURL(browser_url);
    }
  });
};

export const openCall = data => {
  let phoneNumber = `tel:${data}`;
  Linking.openURL(phoneNumber);
};

export const getUpdatedProfile = async props => {
  try {
    const {actionCall, authToken} = props;
    const getUpdatedProfileURL = URL('users/profile');
    const response = await Get(getUpdatedProfileURL, authToken);
    const user = response?.data?.data?.user;
    if (response?.data !== undefined) {
      await actionCall(updateUser(user));
    }
  } catch (error) {
    // console.log('Cannot get profile', error);
  }
};

export const updateRideStartSession = async (
  rideId,
  token,
  status,
  timeEnd,
) => {
  const header = apiHeader(token, false);
  if (status === 'in-ride') {
    const startRideUrl = URL(`rides/start/${rideId}`);
    const reqBody = {
      estimatedRideEnd: timeEnd,
    };
    const response = await Patch(startRideUrl, reqBody, header);
    return response?.data;
  }
  if (status === 'completed') {
    const complete = URL(`rides/complete/${rideId}`);
    const reqBody = {
      status: 'completed',
    };
    const response = await Patch(complete, reqBody, header);
    return response?.data;
  }
  if (status === 'decline') {
    const declineUrl = URL(`rides/decline/${rideId}`);
    const response = await Patch(declineUrl, undefined, header);
    return response?.data;
  }

  const respondRideUrl = URL(`rides/${rideId}`);
  const reqBody = {
    status: status,
  };
  const response = await Patch(respondRideUrl, reqBody, header);
  return response?.data;
};

export const getDeviceID = async props => {
  let res;
  await DeviceInfo.getUniqueId().then(uniqueId => {
    res = uniqueId;
  });
  if (res) {
    return res;
  }
};

export const updateScheduleRideStartSession = async (url, token, reqBody) => {
  const header = apiHeader(token, false);
  const respondRideUrl = URL(url);
  const response = await Patch(respondRideUrl, reqBody, header);
  return response?.data;
};

export default {
  stringTrim,
  timeFormatSchedule,
  calculateDelta,
  openDirections,
  updateRideStartSession,
  updateScheduleRideStartSession,
  fareRoundOff,
  getUpdatedProfile,
  getDeviceID,
};
