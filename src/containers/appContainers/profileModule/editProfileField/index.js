import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CountryFlag from 'react-native-country-flag';
import {URL, apiHeader} from '@config/apiUrl';
import {Patch} from '@axios/AxiosInterceptorFunction';
import {updateUser, updateUserToken} from '@store/user/userSlice';
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import TextInput from '@components/common/TextInput';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Toast from '@components/utils/Toast';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import CountryListModal from '@components/view/modal/CountryListModal';
import OTPModal from '@components/view/modal/OTPModal';
import FormValidation from '@components/utils/FormValidation';

function EditProfileField(props) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {title, fieldValue} = props.route.params;
  const user = useSelector(state => state.user);
  const userToken = user?.userToken;
  const {navigation} = props;
  const headerProps = {
    isSubHeader: true,
    mainHeading: 'Profile',
    isBack: false,
    isCustomBack: 'Profile',
  };
  const Header = apiHeader(userToken, false);
  const [text, setText] = useState(fieldValue);
  const [phoneNumber, setPhoneNumber] = useState(fieldValue);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  useEffect(() => {
    setText(fieldValue);
  }, [isFocused]);

  const [countryCode, setCountryCode] = useState(user?.user?.countryCode);
  const [dialCode, setDialCode] = useState(user?.user?.dialCode);
  const [isModal, setIsModal] = useState(false);
  const [isOtpModal, setIsOtpModal] = useState(false);
  const [code, setCode] = useState(0);
  const [errorField, setErrorField] = useState({
    text: '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  useEffect(() => {
    setText(fieldValue);
  }, [isFocused]);

  function handleBackButtonClick() {
    navigation.navigate('Profile');
    setText('');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [isFocused]);

  const countryDropDown = childData => {
    let dataObj = '';
    dataObj = childData;
    setCountryCode(dataObj?.code);
    setDialCode(dataObj?.dial_code);
  };

  const openCountryListModal = () => {
    setIsModal(!isModal);
  };

  const openPhoneVerifyModal = () => {
    setIsOtpModal(!isOtpModal);
  };

  const formCompleted = () => {
    if (title === 'Name') {
      updateName();
    } else if (title === 'Password') {
      updatePassword();
    } else {
      updateNumber();
    }
  };

  const updateName = async () => {
    setIsLoading(true);
    const reqData = {
      text: text,
    };

    const formError = FormValidation(reqData);
    if (formError) {
      setIsLoading(false);
      const obj = {};
      formError?.errorArr?.map(item => {
        obj[item] = formError?.message;
      });
      setErrorField({
        ...{
          text: '',
        },
        ...obj,
      });
    } else {
      setErrorField({
        text: '',
      });
      const updateURL = URL('users/updateMe');
      const userData = {
        displayName: text,
      };

      const response = await Patch(updateURL, userData, Header);
      if (response !== undefined) {
        const user = response?.data?.user;
        dispatch(updateUser(user));
        Toast.show({
          title: 'Hurrah!',
          message: 'Profile Updated Successfully',
          type: 'success',
        });
        setIsLoading(false);
        navigation.navigate('Profile');
      } else {
        setIsLoading(false);
      }
    }
  };

  const updateNumber = async () => {
    setIsLoading(true);
    const reqData = {
      dialCode: dialCode,
      phoneNumber: phoneNumber,
    };

    const formError = FormValidation(reqData);
    if (formError) {
      setIsLoading(false);
      const obj = {};
      formError?.errorArr?.map(item => {
        obj[item] = formError?.message;
      });
      setErrorField({
        ...{
          phoneNumber: '',
        },
        ...obj,
      });
    } else {
      setErrorField({
        phoneNumber: '',
      });
      try {
        const updatePhone = URL('auth/updateContact');
        const userData = {
          dialCode: dialCode,
          countryCode: countryCode,
          contact: phoneNumber,
        };
        const response = await Patch(updatePhone, userData, Header);
        if (response !== undefined) {
          const user = response?.data?.data;
          setCode(response?.data?.data?.verificationCode);
          dispatch(updateUser(user));
          Toast.show({
            title: 'Verify Number',
            message: 'A code has been sent on your number',
            type: 'success',
          });
          setIsLoading(false);
          openPhoneVerifyModal();
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        Toast.show({
          title: 'Ooops!',
          message: 'Profile Not Updated',
          type: 'danger',
        });
        setIsLoading(false);
      }
    }
  };

  const updatePassword = async () => {
    setIsLoading(true);
    const reqData = {
      oldPassword: password?.oldPassword,
      password: password?.newPassword,
      confirmPassword: password?.confirmNewPassword,
    };

    const formError = FormValidation(reqData);
    if (formError) {
      setIsLoading(false);
      const obj = {};
      formError?.errorArr?.map(item => {
        obj[item] = formError?.message;
      });
      setErrorField({
        ...{
          oldPassword: '',
          password: '',
          confirmPassword: '',
        },
        ...obj,
      });
    } else {
      setErrorField({
        oldPassword: '',
        password: '',
        confirmPassword: '',
      });
      try {
        const updatePswd = URL('auth/updateMyPassword');
        const userData = {
          passwordCurrent: password?.oldPassword,
          password: password?.newPassword,
          passwordConfirm: password?.confirmNewPassword,
        };
        const response = await Patch(updatePswd, userData, Header);
        if (response !== undefined) {
          dispatch(updateUser(response?.data?.user));
          dispatch(updateUserToken(response?.data?.token));
          Toast.show({
            title: 'Hurrah!',
            message: 'Password Updated Successfully',
            type: 'success',
          });
          setIsLoading(false);
          navigation.navigate('Profile');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        Toast.show({
          title: 'Ooops!',
          message: 'Profile Not Updated',
          type: 'danger',
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          alignItems: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'space-between',
          justifyContent: 'space-between',
          paddingBottom: Platform.OS === 'ios' ? 50 : 50,
        }}>
        <View style={{width: '100%'}}>
          <Text
            variant={'h2'}
            font={'PoppinsMedium'}
            gutterTop={5}
            gutterBottom={20}
            color={R.color.charcoalShade}
            align={'left'}
            transform={'capitalize'}>
            Update your {title}
          </Text>
          {title === 'Name' ? (
            <TextInput
              secureText={false}
              placeholder={'Name'}
              onChangeText={value => {
                setText(value);
              }}
              value={text}
              title={title}
              borderRadius={0}
              inputWidth={0.93}
              formError={errorField.text}
              backgroundColor={R.color.lightSilver}
              borderColor={R.color.lightSilver}
              placeholdercolor={R.color.black}
              inputContainerStyles={{
                borderBottomWidth: R.unit.scale(1.5),
                borderBottomColor: R.color.black,
              }}
            />
          ) : title === 'Number' ? (
            <View
              style={{
                ...R.styles.twoItemsRow,
                alignItems: 'stretch',
              }}>
              <View>
                <Text
                  variant={'body2'}
                  font={'semiBold'}
                  color={R.color.inputTitle}
                  gutterBottom={3}
                  transform={'none'}>
                  Dial Code
                </Text>
                <View style={styles.countryFlag}>
                  <CountryFlag
                    isoCode={countryCode ? countryCode : 'de'}
                    size={20}
                  />
                  <Text
                    variant={'body2'}
                    font={'bold'}
                    color={R.color.black}
                    align={'center'}
                    style={{marginLeft: R.unit.scale(5)}}
                    transform={'none'}>
                    {dialCode}
                  </Text>
                  <TouchableOpacity onPress={openCountryListModal}>
                    <Icon
                      name={'arrow-drop-down'}
                      type={'MaterialIcons'}
                      color={R.color.black}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TextInput
                secureText={false}
                placeholder={'Number'}
                onChangeText={value => {
                  setPhoneNumber(value);
                }}
                color={R.color.black}
                value={phoneNumber}
                inputWidth={R.unit.height(1) > 900 ? 0.76 : 0.6}
                width={R.unit.height(1) > 900 ? 0.76 : 0.6}
                borderRadius={0}
                title={'Number'}
                keyboardType={'phone-pad'}
                backgroundColor={R.color.lightSilver}
                borderColor={R.color.lightSilver}
                placeholdercolor={R.color.black}
                inputContainerStyles={{
                  borderBottomWidth: R.unit.scale(1.5),
                  borderBottomColor: R.color.black,
                  flex: 1,
                  marginLeft: R.unit.scale(10),
                  paddingTop: 0,
                }}
                formError={errorField?.phoneNumber}
                // errorMTop={8}
                errorMBottom={-20}
              />
            </View>
          ) : (
            <>
              <TextInput
                secureText={true}
                placeholder={'Old Password'}
                onChangeText={value => {
                  setPassword({...password, oldPassword: value});
                }}
                value={password?.oldPassword}
                borderRadius={0}
                gutterBottom={24}
                title={'Old Password'}
                inputWidth={0.92}
                widthInPercent={'100%'}
                formError={errorField?.oldPassword}
                backgroundColor={R.color.lightSilver}
                borderColor={R.color.lightSilver}
                placeholdercolor={R.color.black}
                inputContainerStyles={{
                  borderBottomWidth: R.unit.scale(1.5),
                  borderBottomColor: R.color.black,
                }}
                eyeColor={R.color.black}
              />
              <TextInput
                secureText={true}
                placeholder={'New Password'}
                onChangeText={value => {
                  setPassword({...password, newPassword: value});
                }}
                value={password?.newPassword}
                borderRadius={0}
                gutterBottom={24}
                inputWidth={0.92}
                widthInPercent={'100%'}
                title={'New Password'}
                fontSize={14}
                formError={errorField?.password}
                backgroundColor={R.color.lightSilver}
                borderColor={R.color.lightSilver}
                placeholdercolor={R.color.black}
                inputContainerStyles={{
                  borderBottomWidth: R.unit.scale(1.5),
                  borderBottomColor: R.color.black,
                }}
                eyeColor={R.color.black}
              />
              <TextInput
                secureText={true}
                placeholder={'Confirm New Password'}
                onChangeText={value => {
                  setPassword({
                    ...password,
                    confirmNewPassword: value,
                  });
                }}
                value={password?.confirmNewPassword}
                borderRadius={0}
                inputWidth={0.92}
                widthInPercent={'100%'}
                gutterBottom={24}
                formErrorText={'Empty Field'}
                title={'Confirm New Password'}
                fontSize={14}
                formError={errorField?.confirmPassword}
                backgroundColor={R.color.lightSilver}
                borderColor={R.color.lightSilver}
                placeholdercolor={R.color.black}
                inputContainerStyles={{
                  borderBottomWidth: R.unit.scale(1.5),
                  borderBottomColor: R.color.black,
                }}
                eyeColor={R.color.black}
              />
            </>
          )}
        </View>

        <Button
          value={title === 'Number' ? 'Next' : 'Update'}
          bgColor={R.color.mainColor}
          width={'100%'}
          size={'lg'}
          gutterTop={R.unit.scale(20)}
          height={50}
          variant={'h6'}
          font={'bold'}
          color={'black'}
          borderRadius={100}
          borderColor={R.color.mainColor}
          loader={isLoading}
          disabled={isLoading}
          loaderColor={R.color.black}
          onPress={formCompleted}
          borderWidth={1}
        />
        <CountryListModal
          isVisibleModal={isModal}
          loaderParentCall={countryDropDown}
        />
        <OTPModal
          isVisibleModal={isOtpModal}
          loaderParentCall={countryDropDown}
          otpCode={code}
          {...props}
        />
      </KeyboardAwareScrollView>
    </ScreenBoiler>
  );
}
export default EditProfileField;

const styles = StyleSheet.create({
  container: {
    width: R.unit.width(1),
    paddingTop: R.unit.scale(30),
    paddingHorizontal: R.unit.scale(20),
    backgroundColor: R.color.lightSilver,
  },
  buttonLayout: {
    width: '100%',
    marginBottom: 0,
    flexGrow: 0,
    overflow: 'scroll',
    paddingBottom: R.unit.scale(20),
    paddingHorizontal: R.unit.scale(17),
  },
  profilePictureLayout: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: R.unit.scale(60),
  },
  profileImage: {
    width: R.unit.scale(190),
    height: R.unit.scale(190),
    borderRadius: R.unit.scale(120),
    borderWidth: R.unit.scale(4),
    borderColor: R.color.blackShade2,
  },
  uploadIcon: {
    color: 'white',
    alignSelf: 'center',
    fontSize: R.unit.scale(22, 0.6),
    left: R.unit.scale(50),
    backgroundColor: '#707070',
    width: R.unit.scale(30),
    height: R.unit.scale(40),
    marginLeft: R.unit.scale(10),
    borderRadius: R.unit.scale(100),
    padding: R.unit.scale(4, 0.3),
  },
  countryFlag: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: R.unit.scale(40),
    width: R.unit.scale(100),
    borderColor: R.color.black,
    borderBottomWidth: R.unit.scale(1.5),
    paddingHorizontal: R.unit.scale(10),
  },
});
