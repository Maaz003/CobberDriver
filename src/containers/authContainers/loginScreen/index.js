import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Platform, BackHandler} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '@store/auth/authSlice';
import {getUserData} from '@store/user/userSlice';
import {URL} from '@config/apiUrl';
import {Post} from '@axios/AxiosInterceptorFunction';
import Text from '@components/common/Text';
import Toast from '@components/utils/Toast';
import {Footer} from '@components/utils/Svg';
import TextInput from '@components/common/TextInput';
import Button from '@components/common/Button';
import R from '@components/utils/R';
import FormValidation from '@components/utils/FormValidation';
import PopUp from '@components/common/PopUp';
import AuthBoiler from '@components/layout/AuthBoiler/ScreenBoiler';

const originalWidth = 460;
const originalHeight = 175;
const aspectRatio = originalWidth / originalHeight;

function LoginScreen(props) {
  const dispatch = useDispatch();
  const loginURL = URL('auth/login');
  const {navigation} = props;
  const common = useSelector(state => state.common);

  const [authUser, setAuthUser] = useState({
    email: '',
    password: '',
  });
  const [errorField, setErrorField] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        console.log(common?.onBoard);
        if (common?.onBoard) {
          BackHandler.exitApp();
          return true;
        }
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [common?.onBoard]),
  );

  const onSubmit = async () => {
    setIsLoading(true);
    const reqData = {
      email: authUser?.email,
      password: authUser?.password,
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
          email: '',
          password: '',
        },
        ...obj,
      });
    } else {
      setErrorField({
        email: '',
        password: '',
      });
      const response = await Post(loginURL, reqData);
      const user = response?.data;
      // setIsLoading(false);
      if (user !== undefined) {
        let roleArray = user?.data?.user?.role;
        let role = roleArray?.includes('driver');
        if (role) {
          PopUp({
            heading: 'Logged In Successfully',
            bottomOffset: 0.7,
            visibilityTime: 3000,
            position: 'top',
          });
          dispatch(getUserData(user));
          dispatch(login(user));
          setIsLoading(false);
        } else {
          Toast.show({
            type: 'danger',
            title: 'Oops',
            message: 'This email is associated with driver',
          });
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthBoiler>
      <KeyboardAwareScrollView
        style={R.styles.container}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.contentView}>
          <Text
            variant={'h1'}
            font={'Sequel551'}
            gutterBottom={5}
            color={R.color.white}
            style={{width: '100%'}}
            align={'left'}
            transform={'none'}>
            Welcome to{' '}
            <Text color={R.color.mainColor} transform={'none'}>
              Cobber{' '}
            </Text>
            {'\n'}Driver App
          </Text>
          <Text
            variant={'body2'}
            font={'PoppinsMedium'}
            gutterTop={20}
            gutterBottom={25}
            color={R.color.white}
            align={'left'}
            style={{width: '100%'}}
            transform={'none'}>
            Signup as a Driver and{' '}
            <Text color={R.color.mainColor} transform={'none'}>
              Get Started
            </Text>
          </Text>

          <TextInput
            secureText={false}
            placeholder={'Email'}
            onChangeText={text => {
              setAuthUser({...authUser, email: text});
            }}
            color={R.color.white}
            value={authUser?.email}
            gutterBottom={24}
            widthInPercent={'100%'}
            iconName={'user'}
            iconType={'FontAwesome'}
            formError={errorField?.email}
          />
          <TextInput
            secureText={true}
            placeholder={'Password'}
            onChangeText={text => {
              setAuthUser({...authUser, password: text});
            }}
            color={R.color.white}
            value={authUser?.password}
            gutterBottom={20}
            widthInPercent={'100%'}
            iconName={'locked'}
            iconType={'Fontisto'}
            formError={errorField?.password}
          />
          <Button
            value="Login"
            bgColor={R.color.mainColor}
            width={'100%'}
            size={'lg'}
            variant={'h6'}
            color={'black'}
            borderRadius={100}
            borderColor={R.color.mainColor}
            loader={isLoading}
            disabled={isLoading}
            loaderColor={R.color.black}
            onPress={onSubmit}
            borderWidth={1}
          />

          <View style={styles.forgetPassView}>
            <Text
              variant={'body2'}
              font={'PoppinsMedium'}
              gutterTop={R.unit.scale(10)}
              color={R.color.white}
              align={'right'}
              onPress={() => navigation.navigate('ForgetPassword')}
              style={{
                width: '100%',
                paddingVertical: 10,
              }}
              transform={'none'}>
              Forgot Password?{' '}
            </Text>
          </View>
        </View>

        <View style={styles.footerImage}>
          <View
            style={{
              ...R.styles.twoItemsRow,
              justifyContent: 'center',
            }}>
            <Text
              variant={'body2'}
              font={'PoppinsMedium'}
              color={R.color.white}
              align={'center'}
              transform={'none'}>
              Don't have an account?
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
              onPress={() => navigation.navigate('Step1')}
              transform={'none'}>
              Signup{' '}
            </Text>
          </View>
          <View style={styles.svgView}>
            <Footer
              width="100%"
              height="100%"
              viewBox={`0 0 ${originalWidth} ${originalHeight}`}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </AuthBoiler>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  contentView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: R.unit.scale(10),
  },
  footerImage: {
    width: R.unit.width(1),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgView: {
    aspectRatio,
    height: R.unit.height(0.2),
    width: R.unit.width(1),
    marginBottom: Platform.OS === 'ios' ? 0 : R.unit.scale(-25),
  },
  forgetPassView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
