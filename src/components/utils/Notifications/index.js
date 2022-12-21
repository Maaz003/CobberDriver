import {Notifications} from 'react-native-notifications';

const LocalNotification = data => {
  const {title, text} = data;
  Notifications.postLocalNotification({
    title: title ? title : 'Local Notification Title',
    body: text ? text : 'Local notification!',
    sound: 'chime.aiff',
    silent: false,
    category: 'SOME_CATEGORY',
    userInfo: {},
    fireDate: new Date(),
  });
};

export default LocalNotification;
