import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {apiHeader, URL} from '@config/apiUrl';
import {Patch} from '@axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '@store/user/userSlice';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Button from '@components/common/Button';
import Toast from '@components/utils/Toast';
import OTPInput from '@components/common/OTP';

function OTPModal(props) {
  const {navigation, otpCode} = props;
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [code, setCode] = useState(otpCode);
  const [codeError, setCodeError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPinReady, setIsPinReady] = useState(false);

  const userToken = user?.userToken;
  const Header = apiHeader(userToken, false);
  const maximumCodeLength = 4;

  useEffect(() => {
    setModalVisible(!modalVisible);
    setCode(otpCode);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const onSubmit = async () => {
    setIsLoading(true);
    if (!code || code?.length < 4) {
      setCodeError(true);
    } else {
      const reqData = {
        otp: code,
      };
      const verifyOTPUrl = URL('auth/verifyContact');
      const response = await Patch(verifyOTPUrl, reqData, Header);
      if (response !== undefined) {
        dispatch(updateUser(response?.data?.data?.user));

        Toast.show({
          title: 'Verified Success!',
          message: 'New phone number is verified successfully',
        });
        navigation.navigate('Profile');
        setIsBlur(false);
      }
      setCodeError(false);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={modalVisible}
      // visible={true}
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
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}></TouchableOpacity>
        </View>
        <>
          <View style={[styles.modalView]}>
            <Text
              variant={'h2'}
              font={'bold'}
              gutterTop={20}
              color={R.color.black}
              align={'center'}
              transform={'none'}>
              Verify Number
            </Text>
            <OTPInput
              code={code}
              setCode={setCode}
              maximumLength={maximumCodeLength}
              setIsPinReady={setIsPinReady}
              inputStyles={{borderBottomColor: R.color.charcoalShade2}}
            />
            <Button
              value={'Verify'}
              bgColor={R.color.mainColor}
              width={'60%'}
              size={'xxmd'}
              gutterTop={R.unit.scale(20)}
              variant={'h6'}
              font={'bold'}
              disabled={isLoading || code?.length < 4}
              color={'black'}
              borderRadius={100}
              borderColor={R.color.mainColor}
              loader={isLoading}
              loaderColor={'white'}
              onPress={onSubmit}
              borderWidth={1}
            />
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
    paddingHorizontal: R.unit.scale(20),
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    height: R.unit.height(0.4),
    borderRadius: 10,
  },
  header: {
    paddingHorizontal: 0,
    backgroundColor: R.color.charcoalShade,
    marginBottom: R.unit.scale(10),
  },

  description: {
    fontSize: 18,
    fontFamily: 'Nunnito-SemiBold',
    color: R.color.mainColor,
    padding: R.unit.scale(10),
    marginLeft: R.unit.scale(-10),
    width: R.unit.width(0.97),
  },
  listRow: {
    padding: R.unit.scale(10),
  },
  otpInputContainerStyles: {
    marginTop: R.unit.scale(30),
    height: R.unit.scale(150),
    alignItems: 'center',
  },
  otpInputStyles: {
    fontSize: 40,
    color: R.color.black,
    marginHorizontal: R.unit.scale(5),
    fontFamily: 'Nunito-Bold',
    paddingHorizontal: 10,
    color: R.color.mainColor,
    backgroundColor: R.color.white,
    borderBottomWidth: 2,
    borderBottomColor: R.color.black,
  },
});

export default OTPModal;
