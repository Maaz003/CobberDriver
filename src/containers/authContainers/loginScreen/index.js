import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Platform, PixelRatio} from 'react-native';
import {useDispatch} from 'react-redux';
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

const originalWidth = 460;
const originalHeight = 175;
const aspectRatio = originalWidth / originalHeight;

function LoginScreen(props) {
  const dispatch = useDispatch();
  const loginURL = URL('auth/login');
  const {navigation} = props;
  const [authUser, setAuthUser] = useState({
    email: '',
    password: '',
  });
  const [errorField, setErrorField] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

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
      if (user !== undefined) {
        let roleArray = user?.data?.user?.role;
        let role = roleArray?.includes('customer');
        if (role) {
          Toast.show({
            title: 'Logged In Successfully',
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
    <ScrollView
      style={{
        ...R.styles.container,
        ...styles.mainLayout,
      }}
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        // paddingBottom: 0,
      }}>
      <View style={styles.formView}>
        <Text
          variant={'h5'}
          font={'bold'}
          gutterBottom={R.unit.scale(5)}
          color={R.color.white}
          style={{width: '100%'}}
          align={'left'}
          transform={'none'}>
          Welcome to
        </Text>
        <Text
          variant={'extraLargeTitle'}
          font={'bold'}
          gutterBottom={R.unit.scale(10)}
          color={R.color.white}
          align={'left'}
          style={{width: '100%'}}
          transform={'none'}>
          Cobber
        </Text>
        <Text
          variant={'h5'}
          font={'bold'}
          gutterBottom={R.unit.scale(25)}
          color={R.color.white}
          align={'left'}
          style={{width: '100%'}}
          transform={'none'}>
          Login into your existing account{' '}
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
          font={'bold'}
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
            font={'bold'}
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
            font={'bold'}
            color={R.color.white}
            align={'center'}
            transform={'none'}>
            Don't have an account?
          </Text>
          <Text
            variant={'body2'}
            font={'bold'}
            color={R.color.mainColor}
            align={'center'}
            style={{
              paddingVertical: R.unit.scale(10),
              marginLeft: R.unit.scale(5),
            }}
            onPress={() => navigation.navigate('Signup')}
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
    </ScrollView>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: R.color.black,
    paddingHorizontal: 0,
  },
  formView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: R.unit.scale(16),
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
