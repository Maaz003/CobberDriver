import moment from 'moment';
import {Linking, Platform} from 'react-native';

export function stringTrim(value, index = 2) {
  if (value !== undefined) {
    const parts = value && value.split(',');
    const firstTwo = parts.slice(0, index);
    const result = firstTwo.join(',');
    return result;
  }
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
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${data}`;
  } else {
    phoneNumber = `telprompt:${data}`;
  }
  Linking.openURL(phoneNumber);
};

export default {
  stringTrim,
  timeFormatSchedule,
  calculateDelta,
  openDirections,
};
