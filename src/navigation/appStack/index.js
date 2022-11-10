import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';
import Contact from '@containers/appContainers/contactScreen/Contactus';
import CustomDrawer from '@components/layout/customDrawer';
import Profile from '@containers/appContainers/profileModule/profile';
import History from '@containers/appContainers/historyModule/historyScreen';
import {ChatScreen} from '@components/common/Chats';
import EditProfileField from '@containers/appContainers/profileModule/editProfileField';
import FAQScreen from '@containers/appContainers/FAQScreen';
import PrivacyPolicyScreen from '@containers/appContainers/PrivacyPolicyScreen';
import HomeScreen from '@containers/appContainers/homeModule/HomeScreen';
import OnGoingRideScreen from '@containers/appContainers/homeModule/OnGoingRideScreen';
import RideCompletedScreen from '@containers/appContainers/homeModule/RideCompletedScreen';
import EarningsScreen from '@containers/appContainers/EarningsScreen';
import RideDetailsScreen from '@containers/appContainers/homeModule/RidesDetails';
import RideRequestsScreen from '@containers/appContainers/homeModule/RidesRequests';
//SCHEDULE MODULE
import ScheduledRidesScreen from '@containers/appContainers/ScheduledRidesModule/ScheduledRidesScreen';
import ScheduleRideRequestsScreen from '@containers/appContainers/ScheduledRidesModule/ScheduleRideRequests';
import ScheduleRideDetailsScreen from '@containers/appContainers/ScheduledRidesModule/ScheduleRideDetails';
import PaymentScreen from '@containers/appContainers/PaymentScreen';

const AppStack = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  const user = useSelector(state => state.user);

  const DrawerNavigator = () => {
    return (
      <NavigationContainer
        ref={navigationService.navigationRef}
        independent={true}>
        <Drawer.Navigator
          drawerPosition="left"
          screenOptions={{
            headerShown: false,
            swipeEnabled: user?.inRide === 'scheduleEnded' ? false : true,
            drawerType: 'slide',
          }}
          drawerStyle={{
            backgroundColor: 'black',
            width: '10%',
          }}
          initialRouteName={
            user?.inRide === 'scheduleEnded' ? 'ScheduledRides' : 'HomeScreen'
          }
          drawerContent={props => <CustomDrawer {...props} />}>
          <Drawer.Screen name="HomeScreen" component={HomeStackNavigator} />
          <Drawer.Screen name="Contact" component={Contact} />
          <Drawer.Screen name="History" component={History} />
          <Drawer.Screen
            name="ScheduledRides"
            component={ScheduleStackNavigator}
          />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="FAQ" component={FAQScreen} />
          <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          <Drawer.Screen name="Payment" component={PaymentScreen} />
          <Drawer.Screen name="Earnings" component={EarningsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };

  const initalRoute = () => {
    if (user?.inRide === 'started' || user?.inRide === 'accepted') {
      return 'OnGoingRide';
    } else if (user?.inRide === 'ended') {
      return 'RideCompleted';
    } else {
      return 'Home';
    }
  };

  const HomeStackNavigator = props => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={initalRoute()}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="OnGoingRide"
          options={{
            animation: 'slide_from_right',
          }}
          component={OnGoingRideScreen}
        />
        <Stack.Screen name="RideCompleted" component={RideCompletedScreen} />
        <Stack.Screen name="RideRequests" component={RideRequestsScreen} />
        <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
        <Stack.Screen
          name="EditField"
          options={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            animationDuration: 200,
          }}
          component={EditProfileField}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    );
  };

  const ScheduleStackNavigator = props => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ScheduleRides" component={ScheduledRidesScreen} />
        <Stack.Screen
          name="ScheduleRideRequests"
          component={ScheduleRideRequestsScreen}
        />
        <Stack.Screen
          name="ScheduleRideDetails"
          component={ScheduleRideDetailsScreen}
        />
      </Stack.Navigator>
    );
  };

  return <DrawerNavigator />;
};
export default AppStack;
