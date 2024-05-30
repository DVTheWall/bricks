import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome from '../screens/auth/Welcome';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
import SignUp from '../screens/auth/SignUp';
import BottomTabs from './BottomTabNavigation';
import Notification from '../screens/notification/Notification';
import Payment from '../screens/payment/Payment';
import PropertyDetails from '../screens/home/PropertyDetails';
import InvestScreen from '../screens/home/InvestScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Otp: undefined;
  SignUp: undefined;
  BottomTabs: undefined;
  Notification: undefined;
  Payment: undefined;
  PropertyDetails: undefined;
  InvestScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Welcome'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={'Welcome'} component={Welcome} />
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'Otp'} component={Otp} />
      <Stack.Screen name={'SignUp'} component={SignUp} />
      <Stack.Screen name={'BottomTabs'} component={BottomTabs} />
      <Stack.Screen name={'Notification'} component={Notification} />
      <Stack.Screen name={'Payment'} component={Payment} />
      <Stack.Screen name={'PropertyDetails'} component={PropertyDetails} />
      <Stack.Screen name={'InvestScreen'} component={InvestScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
