import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../screens/auth/Welcome';
import Login from '../screens/auth/Login';
import Otp from '../screens/auth/Otp';
import SignUp from '../screens/auth/SignUp';
import BottomTabs from './BottomTabNavigation';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Otp: undefined;
  SignUp: undefined;
  BottomTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Welcome'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Welcome'} component={Welcome} />
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'Otp'} component={Otp} />
      <Stack.Screen name={'SignUp'} component={SignUp} />
      <Stack.Screen name={'BottomTabs'} component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
