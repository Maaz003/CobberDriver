import React, {useEffect, useState} from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

function ScheduleRideModal(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const {scheduleTime, locType} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [date, setDate] = useState(
    locType === 'Pick-Up' && user?.scheduledTime?.pickUpTime !== undefined
      ? new Date(user?.scheduledTime?.pickUpTime)
      : locType === 'Drop-Off' && user?.scheduledTime?.pickUpTime !== undefined
      ? new Date(user?.scheduledTime?.pickUpTime)
      : new Date(),
  );
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  useEffect(() => {
    if (!day) {
      let formattedDate = dateFormat(date);
      setDay(formattedDate);
    }
  }, [day]);

  useEffect(() => {
    if (!time) {
      let formattedDate = timeFormat(date);
      setTime(formattedDate);
    }
  }, [time]);

  const selectedDate = selectedDate => {
    const currentDate = selectedDate;
    setShow(false);

    // let formatted = new Date(
    //   moment(currentDate).add(moment().utcOffset(), 'minutes'),
    // );
    setDate(currentDate);
    let formattedDate = dateFormat(currentDate);
    let formattedTime = timeFormat(currentDate);
    setTime(formattedTime);
    setDay(formattedDate);
  };

  const dateFormat = date => {
    let dateString = moment(date).format('ddd, Do MMM');
    return dateString;
  };

  const timeFormat = date => {
    let current = moment(date).format('hh:mm A');
    let ahead = moment(date).add(6, 'hours').format('hh:mm A');
    const timeString = `${current} - ${ahead}`;
    return timeString;
  };

  const submitTime = () => {
    let rideTime = {
      day,
      time,
      date,
    };
    scheduleTime(rideTime);
    setIsBlur(false);
  };

  const showMode = currentMode => {
    setShow(true);
    setOpen(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      // visible={true}
      visible={modalVisible}
      onRequestClose={() => setIsBlur(false)}
      onShow={() => {
        setIsBlur(true);
      }}>
      <View style={styles.centeredView}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          <TouchableOpacity
            onPress={() => setIsBlur(false)}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <Text
              variant={'h5'}
              font={'bold'}
              gutterBottom={
                user?.scheduledTime && locType === 'Drop-Off' ? 20 : 40
              }
              color={R.color.white}
              align={'center'}
              transform={'none'}>
              Schedule a {locType} Window
            </Text>
            {user?.scheduledTime && (
              <>
                {locType === 'Drop-Off' && (
                  <>
                    <Text
                      variant={'body1'}
                      font={'regular'}
                      gutterBottom={30}
                      color={R.color.mainColor}
                      align={'center'}
                      style={{
                        fontStyle: 'italic',
                      }}
                      transform={'none'}>
                      Pickup :{' '}
                      {moment(user?.scheduledTime?.pickUpTime).format(
                        'Do MMM HH:mm:a',
                      )}
                    </Text>
                  </>
                )}
              </>
            )}

            <TouchableOpacity onPress={showDatepicker}>
              <Text
                variant={'body1'}
                font={'regular'}
                gutterBottom={32}
                color={R.color.white}
                style={{paddingHorizontal: 20}}
                align={'center'}
                transform={'none'}>
                {day}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={showTimepicker}>
              <Text
                variant={'body1'}
                font={'regular'}
                gutterBottom={32}
                color={R.color.white}
                align={'center'}
                transform={'none'}>
                {time}
              </Text>
            </TouchableOpacity>

            <Button
              value={`Confirm ${locType} time`}
              bgColor={R.color.mainColor}
              width={'75%'}
              size={'xmd'}
              variant={'body2'}
              font={'semiBold'}
              color={R.color.black}
              borderRadius={10}
              onPress={submitTime}
              borderColor={R.color.mainColor}
              loaderColor={'white'}
            />

            {/* {Platform.OS === 'ios' ? (
              <View style={{backgroundColor: 'red'}}>
                {show && (
                  <DatePicker
                    date={date}
                    minuteInterval={30}
                    mode={mode}
                    modal={true}
                    open={open}
                    minimumDate={
                      locType === 'Drop-Off'
                        ? new Date(moment(user?.scheduledTime?.pickUpTime))
                        : new Date()
                    }
                    onConfirm={date => {
                      setOpen(false);
                      selectedDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                    textColor={R.color.black}
                    title={`Set ${mode}`}
                    confirmText={'Set'}
                    cancelText={'Clear'}
                    is24hourSource={true}
                    androidVariant={'nativeAndroid'}
                    maximumDate={
                      locType === 'Drop-Off'
                        ? moment(user?.scheduledTime?.pickUpTime).endOf('day')
                        : new Date(2300, 10, 20)
                    }
                  />
                )}
              </View>
            ) : ( */}
            <>
              {show && (
                <DatePicker
                  date={date}
                  minuteInterval={30}
                  mode={mode}
                  modal={true}
                  open={open}
                  minimumDate={
                    locType === 'Drop-Off'
                      ? new Date(moment(user?.scheduledTime?.pickUpTime))
                      : new Date()
                  }
                  onConfirm={date => {
                    setOpen(false);
                    selectedDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                  textColor={
                    Platform.OS === 'ios' ? R.color.mainColor : R.color.black
                  }
                  title={`Set ${mode}`}
                  confirmText={'Set'}
                  cancelText={'Clear'}
                  is24hourSource={true}
                  androidVariant={'nativeAndroid'}
                  maximumDate={
                    locType === 'Drop-Off'
                      ? new Date(
                          moment(user?.scheduledTime?.pickUpTime).endOf('day'),
                        )
                      : new Date(2300, 10, 20)
                  }
                />
              )}
            </>
            {/* )} */}
          </View>
        </>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: R.color.blackShade2,
    width: '100%',
    paddingHorizontal: R.unit.scale(16),
    paddingVertical: R.unit.scale(35),
    borderTopRightRadius: R.unit.scale(20),
    borderTopLeftRadius: R.unit.scale(20),
  },
});

export default ScheduleRideModal;
