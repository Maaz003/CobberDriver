import React, {useEffect, useState} from 'react';
import {
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {tempRidesSet} from '@store/common/commonSlice';
import {reportData} from '@components/constants';
import {useDispatch, useSelector} from 'react-redux';
import {rideSession} from '@store/user/userSlice';
import {scheduledRides} from '@store/scheduleRides/scheduleSlice';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import TextInput from '@components/common/TextInput';
import CheckBoxLine from '@components/common/CheckBoxLine';

function CancelBookingModal(props) {
  const {title = 'Booking', isScheduled, itemId, cancellationComplete} = props;
  const dispatch = useDispatch();
  const schedule = useSelector(state => state.schedule);
  const common = useSelector(state => state.common);
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [text, setText] = useState('');
  const [activeIndex, setActiveIndex] = useState();
  const [showInputField, setShowInputField] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  useEffect(() => {
    if (activeIndex) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [activeIndex]);

  const checkBoxPress = id => {
    const updatedObj = reportData?.find(item => item.id === id);
    setActiveIndex(id);
    if (updatedObj.title.includes('Other')) {
      setShowInputField(true);
    } else {
      setShowInputField(false);
    }
  };

  const cancelRide = async () => {
    if (isScheduled) {
      if (itemId) {
        if (schedule?.scheduledRides?.length > 0) {
          let tempArr = schedule?.scheduledRides?.filter(
            item => item.id !== itemId,
          );
          dispatch(scheduledRides(tempArr));
          setIsBlur(false);
          setActiveIndex(undefined);
          cancellationComplete();
        }
      }
    } else {
      let commonTemparr = JSON.parse(JSON.stringify(common.tempRides));
      let objFound = commonTemparr.find(item => item.id === itemId);
      objFound.isCancelled = true;
      const dataRide = {data: undefined, inRide: 'finished'};
      await dispatch(rideSession(dataRide));
      await dispatch(tempRidesSet(commonTemparr));
    }
  };

  return (
    <>
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
          <TouchableOpacity
            onPress={() => setIsBlur(false)}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}></TouchableOpacity>
          <>
            <SafeAreaView style={styles.modalView}>
              <KeyboardAwareScrollView
                showsHorizontalScrollIndicator={false}
                style={{width: '100%'}}
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <View style={styles.notch} />
                  <View style={[R.styles.rowView, styles.header]}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => {
                        setIsBlur(false);
                      }}>
                      <Icon
                        type={'Ionicons'}
                        name={'close'}
                        color={R.color.blackShade3}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.contentView}>
                  <Text
                    variant={'h4'}
                    font={'Sequel651'}
                    color={R.color.blackShade3}
                    align={'left'}
                    gutterBottom={24}
                    numberOfLines={2}
                    style={{width: '100%'}}
                    transform={'none'}>
                    Cancel {title}
                  </Text>

                  {reportData?.map((item, index) => {
                    return (
                      <CheckBoxLine
                        key={index}
                        onPress={() => checkBoxPress(item.id)}
                        text={item.title}
                        selected={item.id === activeIndex}
                        textColor={
                          item.id === activeIndex
                            ? R.color.black
                            : R.color.gray4
                        }
                        containerStyles={{
                          marginBottom: R.unit.scale(16),
                          marginTop: 0,
                        }}
                      />
                    );
                  })}

                  <Text
                    variant={'body2'}
                    font={'InterSemiBold'}
                    color={'red'}
                    align={'left'}
                    gutterTop={24}
                    style={{width: '100%'}}
                    transform={'none'}>
                    PLEASE NOTE!{' '}
                    <Text
                      variant={'body2'}
                      font={'InterRegular'}
                      color={R.color.gray4}
                      align={'left'}
                      gutterBottom={24}
                      numberOfLines={2}
                      style={{width: '100%'}}
                      transform={'none'}>
                      Since less than 24 hours are left before the start of the
                      ride, we{' '}
                      <Text
                        variant={'body2'}
                        font={'InterSemiBold'}
                        color={R.color.blackLightShade}
                        align={'left'}
                        gutterBottom={24}
                        numberOfLines={2}
                        style={{width: '100%'}}
                        transform={'none'}>
                        will not be able to refund the payment.
                      </Text>
                    </Text>
                  </Text>

                  {showInputField && (
                    <TextInput
                      secureText={false}
                      onChangeText={text => {
                        setText(text);
                      }}
                      placeholder={'Details'}
                      placeholdercolor={R.color.gray4}
                      titleColor={R.color.black}
                      color={R.color.black}
                      value={text}
                      gutterTop={24}
                      gutterBottom={56}
                      isRightTitle={false}
                      backgroundColor={'white'}
                      multiline={true}
                      numberOfLines={60}
                      borderWidth={1}
                      borderColor={R.color.gray}
                      borderRadius={10}
                      height={148}
                    />
                  )}
                </View>
                <View style={[R.styles.rowView, styles.footerButton]}>
                  <Button
                    value={'Cancel'}
                    bgColor={R.color.white}
                    width={'30%'}
                    size={'lg'}
                    variant={'body2'}
                    font={'PoppinsMedium'}
                    color={R.color.blackShade2}
                    disabled={false}
                    loaderColor={R.color.white}
                    rippleColor={R.color.white}
                    onPress={() => {
                      setIsBlur(false);
                    }}
                  />
                  <Button
                    value={'Submit'}
                    bgColor={R.color.mainColor}
                    width={'40%'}
                    size={'lg'}
                    variant={'body2'}
                    font={'PoppinsMedium'}
                    color={R.color.blackShade2}
                    borderColor={R.color.mainColor}
                    disabled={disabled}
                    borderRadius={10}
                    loaderColor={R.color.white}
                    btnWrapperStyles={{marginLeft: R.unit.scale(20)}}
                    onPress={cancelRide}
                  />
                </View>
              </KeyboardAwareScrollView>
            </SafeAreaView>
          </>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    height: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopRightRadius: R.unit.scale(10),
    borderTopLeftRadius: R.unit.scale(10),
  },
  notch: {
    backgroundColor: R.color.gray4,
    width: '15%',
    height: R.unit.scale(5),
    borderRadius: R.unit.scale(100),
    marginTop: R.unit.scale(8),
  },
  header: {
    paddingVertical: R.unit.scale(16),
    paddingHorizontal: R.unit.scale(10),
    width: '100%',
  },
  contentView: {
    marginTop: R.unit.scale(16),
    width: '100%',
    paddingHorizontal: R.unit.scale(16),
    alignItems: 'center',
    flex: 1,
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.scale(40),
    marginBottom: R.unit.scale(16),
  },
  footerButton: {
    borderTopColor: R.color.gray2,
    borderTopWidth: R.unit.scale(0.75),
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: R.unit.scale(16),
    paddingTop: R.unit.scale(16),
    paddingBottom: R.unit.scale(Platform.OS === 'ios' ? 0 : 16),
    backgroundColor: R.color.white,
  },
});

export default CancelBookingModal;
