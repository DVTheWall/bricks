/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {font} from '../utils/fonts';
import {icons} from '../utils/icons';
import {commonStyles} from '../styles/styles';
import {SCREEN} from '../utils/screenConstants';
import {colors, fontSize, hp, isIos, wp} from '../utils';
import PropertyList from '../screens/brokers/property/PropertyList';
import Dashboard from '../screens/brokers/dashboard/Dashboard';
import Customers from '../screens/brokers/customers/Customers';
import Orders from '../screens/brokers/orders/Orders';

const Tab = createBottomTabNavigator();

const BrokersTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = icons.home;
          } else if (route.name === 'Properties') {
            iconName = icons.buildingsTab;
          } else if (route.name === 'Customers') {
            iconName = icons.customers;
          } else if (route.name === 'Orders') {
            iconName = icons.orders;
          }

          return (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeTabIndicator} />}
              <Image
                source={iconName}
                style={{
                  ...commonStyles.icon24,
                  tintColor: focused ? colors.primary : colors.semiGrey,
                }}
              />
            </View>
          );
        },
        tabBarLabel: ({focused}) => {
          let label;
          if (route.name === 'Dashboard') {
            label = SCREEN.DASHBOARD;
          } else if (route.name === 'Properties') {
            label = SCREEN.PROPERTIES;
          } else if (route.name === 'Customers') {
            label = SCREEN.CUSTOMERS;
          } else if (route.name === 'Orders') {
            label = SCREEN.ORDERS;
          }

          return (
            <Text
              style={{
                marginBottom: hp(5),
                fontSize: fontSize(10),
                color: focused ? colors.black : colors.semiGrey,
                fontFamily: focused ? font.qBold : font.qSemiBold,
              }}>
              {label}
            </Text>
          );
        },
        tabBarStyle: styles.tabBar,
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Properties" component={PropertyList} />
      <Tab.Screen name="Customers" component={Customers} />
      <Tab.Screen name="Orders" component={Orders} />
    </Tab.Navigator>
  );
};

export default BrokersTab;

const styles = StyleSheet.create({
  tabBar: {
    padding: 0,
    borderTopWidth: wp(1),
    paddingHorizontal: wp(20),
    borderTopColor: '#dddddd',
    height: isIos ? hp(90) : hp(60),
    backgroundColor: colors.white,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  activeTabIndicator: {
    position: 'absolute',
    zIndex: 999,
    top: isIos ? hp(-10) : hp(-8),
    width: '70%',
    height: hp(4),
    borderRadius: wp(100),
    backgroundColor: colors.primary,
  },
});
