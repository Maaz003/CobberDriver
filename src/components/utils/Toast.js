import {showMessage} from 'react-native-flash-message';

const show = ({title, message, type = 'success', duration}) => {
  // 'info' | 'danger' | 'success' | 'warning' | 'default'
  showMessage({
    message: title ? title : '',
    description: message ? message : ' ',
    type: type,
    hideStatusBar: true,
    duration: duration ? duration : 2000,
    autoHide: true,
  });
};

export default {
  show,
};
