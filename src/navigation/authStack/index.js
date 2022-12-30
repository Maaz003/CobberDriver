import React from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '@containers/authContainers/loginScreen';
import OTPVerifyScreen from '@containers/authContainers/SignupModule/OTPVerifyscreen';
import SuccessfullScreen from '@containers/authContainers/SignupModule/succesfullScreen';
import OnBoardingStep1 from '@containers/authContainers/onBoardingStep1';
import OnBoardingStep2 from '@containers/authContainers/onBoardingStep2';
import ForgetPasswordScreen from '@containers/authContainers/forgetPasswordScreen';
import Step1Screen from '@containers/authContainers/SignupModule/Step1Screen';
import Step2Screen from '@containers/authContainers/SignupModule/Step2Screen';
import Step3Screen from '@containers/authContainers/SignupModule/Step3Screen';
import {
  requestLocationPermission,
  requestLocationPermissionIOS,
} from '@components/utils/Validators';
// import {useNavigation} from '@react-navigation/native';

const AuthStack = () => {
  const common = useSelector(state => state.common);
  const Stack = createNativeStackNavigator();

  const checkForLocation = () => {
    console.log('RUYN-0---- AUTH');
    if (Platform.OS === 'ios') {
      requestLocationIOS();
    } else {
      requestLocation();
    }
  };

  const requestLocation = async () => {
    let granted = await requestLocationPermission();
  };

  const requestLocationIOS = async () => {
    let granted = await requestLocationPermissionIOS();
  };

  return (
    <NavigationContainer onStateChange={checkForLocation}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={common?.onBoard ? 'Login' : 'OnBoardStep1'}>
        <Stack.Screen name="OnBoardStep1" component={OnBoardingStep1} />
        <Stack.Screen name="OnBoardStep2" component={OnBoardingStep2} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{gestureEnabled: common?.onBoard ? false : true}}
        />
        <Stack.Screen name="Step1" component={Step1Screen} />
        <Stack.Screen
          name="Step2"
          options={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            animationDuration: 10,
          }}
          component={Step2Screen}
        />
        <Stack.Screen
          name="Step3"
          options={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            animationDuration: 10,
          }}
          component={Step3Screen}
        />
        <Stack.Screen name="VerfiySucess" component={SuccessfullScreen} />
        <Stack.Screen
          name="Verification"
          component={OTPVerifyScreen}
          options={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            animationDuration: 10,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
