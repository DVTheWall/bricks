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
import BrokersTab from './TabNavigationBroker';
import PropertyDetailsBroker from '../screens/brokers/property/PropertyDetailsBroker';
import CustomerDetails from '../screens/brokers/customers/CustomerDetails';
import AddCustomer from '../screens/brokers/customers/AddCustomer';
import PropertyList from '../screens/brokers/property/PropertyList';
import OrderDetails from '../screens/brokers/orders/OrderDetails';
import AddOrders from '../screens/brokers/orders/AddOrders';

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
  BrokersTab: undefined;
  PropertyDetailsBroker: undefined;
  CustomerDetails: undefined;
  AddCustomer: undefined;
  PropertyList: undefined;
  OrderDetails: undefined;
  AddOrders: undefined;
  Home: undefined;
  PdfViewer: undefined;
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
      <Stack.Screen name={'BottomTabs'} component={BottomTabs} />
      <Stack.Screen name={'Welcome'} component={Welcome} />
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'Otp'} component={Otp} />
      <Stack.Screen name={'SignUp'} component={SignUp} />
      <Stack.Screen name={'BrokersTab'} component={BrokersTab} />
      <Stack.Screen name={'Notification'} component={Notification} />
      <Stack.Screen name={'Payment'} component={Payment} />
      <Stack.Screen name={'PropertyDetails'} component={PropertyDetails} />
      <Stack.Screen name={'InvestScreen'} component={InvestScreen} />
      <Stack.Screen name={'CustomerDetails'} component={CustomerDetails} />
      <Stack.Screen name={'AddCustomer'} component={AddCustomer} />
      <Stack.Screen name={'PropertyList'} component={PropertyList} />
      <Stack.Screen name={'OrderDetails'} component={OrderDetails} />
      <Stack.Screen name={'AddOrders'} component={AddOrders} />
      <Stack.Screen
        name={'PropertyDetailsBroker'}
        component={PropertyDetailsBroker}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
