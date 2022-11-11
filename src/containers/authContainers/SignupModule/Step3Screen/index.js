import React, {useState} from 'react';
import {View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {URL} from '@config/apiUrl';
import {Post} from '@axios/AxiosInterceptorFunction';
import Text from '@components/common/Text';
import TextInput from '@components/common/TextInput';
import R from '@components/utils/R';
import FormValidation from '@components/utils/FormValidation';
import Icon from '@components/common/Icon';
import Loader from '@components/common/Loader';
import PopUp from '@components/common/PopUp';
import AuthBoiler from '@components/layout/AuthBoiler/ScreenBoiler';

function Step3Screen(props) {
  const {navigation} = props;
  const {step2Data} = props.route.params;
  const [authUser, setAuthUser] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorField, setErrorField] = useState({
    password: '',
    confirmPassword: '',
  });

  const convertFormData = () => {
    var formData = new FormData();

    const {
      picture,
      displayName,
      role,
      dialCode,
      country,
      state,
      countryCode,
      email,
      currentLocation,
      contact,
      pictures,
      model,
      color,
      vehicleId,
    } = step2Data;
    let driverPics = pictures;
    const [lat, long] = currentLocation.coordinates;
    formData.append('displayName', displayName);
    formData.append('role', role);
    formData.append('dialCode', dialCode);
    formData.append('countryCode', countryCode);
    formData.append('contact', contact);
    formData.append('email', email);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('latitude', lat);
    formData.append('longitude', long);
    formData.append('color', color);
    formData.append('model', model);
    formData.append('vehicle', vehicleId);
    formData.append('password', authUser?.password);
    formData.append('passwordConfirm', authUser?.confirmPassword);

    formData.append('photo', {
      uri: picture.path,
      type: picture.mime,
      name: new Date() + '_image',
    });

    formData.append('licenseCopy', {
      uri: driverPics[0].frontPicture.path,
      type: driverPics[0].frontPicture.mime,
      name: new Date() + '_image',
    });
    formData.append('licenseCopy', {
      uri: driverPics[0].backPicture.path,
      type: driverPics[0].backPicture.mime,
      name: new Date() + '_image',
    });
    formData.append('nicCopy', {
      uri: driverPics[1].frontPicture.path,
      type: driverPics[1].frontPicture.mime,
      name: new Date() + '_image',
    });
    formData.append('nicCopy', {
      uri: driverPics[1].backPicture.path,
      type: driverPics[1].backPicture.mime,
      name: new Date() + '_image',
    });
    formData.append('residenceProof', {
      uri: driverPics[2].frontPicture.path,
      type: driverPics[2].frontPicture.mime,
      name: new Date() + '_image',
    });
    formData.append('residenceProof', {
      uri: driverPics[2].backPicture.path,
      type: driverPics[2].backPicture.mime,
      name: new Date() + '_image',
    });
    return formData;
  };

  const onSubmit = async () => {
    if (authUser?.password !== authUser?.confirmPassword) {
      PopUp({
        heading: `Passwords Mismatch`,
        bottomOffset: 0.8,
        visibilityTime: 3000,
        position: 'top',
      });
    } else {
      setLoading(true);
      const formData = {
        password: authUser?.password,
        confirmPassword: authUser?.confirmPassword,
      };
      const formError = FormValidation(formData);
      if (formError) {
        const obj = {};
        formError?.errorArr?.map(item => {
          obj[item] = formError?.message;
        });
        setLoading(false);
        setErrorField({
          ...{
            password: '',
            confirmPassword: '',
          },
          ...obj,
        });
      } else {
        setErrorField({
          password: '',
          confirmPassword: '',
        });

        const userData = await convertFormData();
        const signUrl = URL('auth/driver-signup');
        const response = await Post(signUrl, userData);
        if (response !== undefined) {
          const code = response?.data?.data?.user?.verificationCode;
          navigation.navigate('Verification', {
            user: response?.data?.data?.user?._id,
          });
          PopUp({
            heading: `Registered Successfully. Meanwhile ${code}`,
            bottomOffset: 0.8,
            visibilityTime: 7000,
            position: 'top',
          });
        } else {
          setLoading(false);
        }
        setLoading(false);
      }
    }
  };

  return (
    <AuthBoiler>
      <KeyboardAwareScrollView
        style={R.styles.container}
        keyboardShouldPersistTaps={'always'}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          paddingBottom: R.unit.scale(50),
        }}>
        <View style={styles.formView}>
          <Text
            variant={'h2'}
            font={'Sequel451'}
            gutterBottom={30}
            color={R.color.white}
            align={'left'}
            transform={'none'}>
            Enter{' '}
            <Text
              variant={'h2'}
              font={'Sequel451'}
              gutterBottom={30}
              color={R.color.mainColor}
              align={'left'}
              transform={'none'}>
              Password
            </Text>
          </Text>

          <TextInput
            secureText={true}
            placeholder={`Password`}
            onChangeText={text => {
              setAuthUser({...authUser, password: text});
            }}
            color={R.color.white}
            value={authUser?.password}
            gutterBottom={24}
            widthInPercent={'100%'}
            iconName={'locked'}
            iconType={'Fontisto'}
            formError={errorField?.password}
          />

          <TextInput
            secureText={true}
            placeholder={`Confirm Password`}
            onChangeText={text => {
              setAuthUser({...authUser, confirmPassword: text});
            }}
            color={R.color.white}
            value={authUser?.confirmPassword}
            widthInPercent={'100%'}
            gutterBottom={24}
            iconName={'locked'}
            iconType={'Fontisto'}
            formError={errorField?.confirmPassword}
          />
          <View style={{...R.styles.twoItemsRow, justifyContent: 'center'}}>
            <Text
              variant={'body2'}
              font={'PoppinsMedium'}
              color={R.color.white}
              align={'center'}
              transform={'none'}>
              Already have an account?
            </Text>
            <Text
              variant={'body2'}
              font={'PoppinsMedium'}
              color={R.color.mainColor}
              align={'center'}
              style={{
                paddingVertical: R.unit.scale(10),
                marginLeft: R.unit.scale(5),
              }}
              onPress={() => navigation.navigate('Login')}
              transform={'none'}>
              Login
            </Text>
          </View>
        </View>
        <View style={styles.nextButtonLayout}>
          <TouchableNativeFeedback
            delayPressIn={0.1}
            delayPressOut={0.1}
            delayLongPress={0.1}
            onPress={() => navigation.goBack()}
            background={TouchableNativeFeedback.Ripple('#42700b', false, 27)}>
            <View
              style={{
                backgroundColor: R.color.mainColor,
                padding: R.unit.scale(15),
                borderRadius: R.unit.scale(100),
                overflow: 'hidden',
              }}>
              <Icon
                name={'arrowleft'}
                type={'AntDesign'}
                size={20}
                color={R.color.black}
              />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            delayPressIn={0.1}
            delayPressOut={0.1}
            delayLongPress={0.1}
            onPress={onSubmit}
            background={TouchableNativeFeedback.Ripple('#42700b', false, 27)}>
            <View
              style={{
                backgroundColor: R.color.mainColor,
                padding: R.unit.scale(15),
                borderRadius: R.unit.scale(100),
                overflow: 'hidden',
              }}>
              <Icon
                name={'arrowright'}
                type={'AntDesign'}
                size={20}
                color={R.color.black}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </KeyboardAwareScrollView>

      {loading && (
        <View style={styles.loaderContainer}>
          <Loader size={'large'} color={R.color.mainColor} />
        </View>
      )}
    </AuthBoiler>
  );
}
export default Step3Screen;

const styles = StyleSheet.create({
  formView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginTop: R.unit.scale(50),
    paddingHorizontal: R.unit.scale(10),
  },
  nextButtonLayout: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: R.unit.scale(10),
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
