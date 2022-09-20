import React from 'react';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '@containers/authContainers/loginScreen';
import signupScreen from '@containers/authContainers/SignupModule/signupScreen';
import OTPVerifyScreen from '@containers/authContainers/SignupModule/OTPVerifyscreen';
import SuccessfullScreen from '@containers/authContainers/SignupModule/succesfullScreen';
import OnBoardingStep1 from '@containers/authContainers/onBoardingStep1';
import OnBoardingStep2 from '@containers/authContainers/onBoardingStep2';
import ForgetPasswordScreen from '@containers/authContainers/forgetPasswordScreen';

const AuthStack = () => {
  const common = useSelector(state => state.common);
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={common?.isStep1 ? 'OnBoardStep1' : 'OnBoardStep1'}>
        <Stack.Screen name="OnBoardStep1" component={OnBoardingStep1} />
        <Stack.Screen name="OnBoardStep2" component={OnBoardingStep2} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={signupScreen} />
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
