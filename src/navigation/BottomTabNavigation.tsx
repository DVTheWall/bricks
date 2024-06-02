/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text, View} from 'react-native';
import Home from '../screens/home/Home';
import Market from '../screens/market/Market';
import Portfolio from '../screens/portfolio/Portfolio';
import Transaction from '../screens/transaction/Transaction';
import Profile from '../screens/profile/Profile';
import {icons} from '../utils/icons';
import {SCREEN} from '../utils/screenConstants';
import {colors, fontSize, hp, isIos, wp} from '../utils';
import {font} from '../utils/fonts';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = icons.home;
          } else if (route.name === 'Market') {
            iconName = icons.market;
          } else if (route.name === 'Portfolio') {
            iconName = icons.portfolio;
          } else if (route.name === 'Transaction') {
            iconName = icons.transaction;
          } else if (route.name === 'Profile') {
            iconName = icons.profile;
          }

          return (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeTabIndicator} />}
              <Image
                source={iconName}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? colors.primary : colors.semiGrey,
                  resizeMode: 'contain',
                }}
              />
            </View>
          );
        },
        tabBarLabel: ({focused}) => {
          let label;
          if (route.name === 'Home') {
            label = SCREEN.HOME;
          } else if (route.name === 'Market') {
            label = SCREEN.MARKET;
          } else if (route.name === 'Portfolio') {
            label = SCREEN.PORTFOLIO;
          } else if (route.name === 'Transaction') {
            label = SCREEN.TRANSACTION;
          } else if (route.name === 'Profile') {
            label = SCREEN.PROFILE;
          }

          return (
            <Text
              style={{
                color: focused ? colors.black : colors.semiGrey,
                fontSize: fontSize(10),
                fontFamily: focused ? font.bold : font.semiBold,
                marginBottom: 5,
              }}>
              {label}
            </Text>
          );
        },
        tabBarStyle: styles.tabBar,
        // tabBarActiveTintColor: 'blue',
        // tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Market" component={Market} />
      <Tab.Screen name="Portfolio" component={Portfolio} />
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

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
    top: isIos ? hp(-9) : hp(-11),
    width: '80%',
    height: hp(4),
    backgroundColor: colors.primary,
    borderRadius: wp(100),
  },
});
