import {Notifications} from 'react-native-notifications';

const LocalNotification = data => {
  const {title, text} = data;
  const date = new Date();
  // Platform.OS === 'android'
  // {
  //   Notifications.postLocalNotification({
  //     body: text ? text : 'Local notification!',
  //     title: title ? title : 'Local Notification Title',
  //     sound: 'chime.aiff',
  //     silent: false,
  //     category: 'SOME_CATEGORY',
  //     userInfo: {},
  //     fireDate: new Date(),
  //   });
  // }

  Notifications.postLocalNotification({
    body: text ? text : 'Local notification!',
    title: title ? title : 'Local Notification Title',
    sound: 'chime.aiff',
    silent: false,
    category: 'SOME_CATEGORY',
    userInfo: {},
    fireDate: new Date(date.setSeconds(date.getSeconds() + 10)).toISOString(),
  });
};

export default LocalNotification;
