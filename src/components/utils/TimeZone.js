import moment from 'moment-timezone';

const convertTime = (time, format = 'hh:mm A') => {
  let convertedTime = moment(time).tz('America/Chicago').format(format);
  return convertedTime;
};

export default convertTime;
