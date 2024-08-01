/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import storage from './src/store';
import { colors } from './src/utils';
import RootNavigator from './src/navigation/RootNavigator';
import {
  getAsyncStorage,
  navigationRef,
  resetStack,
} from './src/helpers/globalFunctions';
import { localStore } from './src/api/constants';
import { SCREEN } from './src/utils/screenConstants';
import { PersistGate } from 'redux-persist/integration/react';
import { PERMISSIONS, request } from 'react-native-permissions';

const { persistor, store } = storage();

const App = () => {
  const getToken = async () => {
    const token = await getAsyncStorage(localStore.token);
    if (token !== null) {
      resetStack(SCREEN.BOTTOMTABS);
    }
  };

  useEffect(() => {
    getToken();

    setTimeout(() => {
      SplashScreen.hide();
      askForNotification()
    }, 3000);
  }, []);

  const askForNotification = async () => {
    let result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <RootNavigator />
          </NavigationContainer>
        </PersistGate>
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
