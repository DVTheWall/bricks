/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import store from './src/store';
import {colors} from './src/utils';
import RootNavigator from './src/navigation/RootNavigator';
import {navigationRef} from './src/helpers/globalFunctions';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
          <RootNavigator />
        </NavigationContainer>
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
