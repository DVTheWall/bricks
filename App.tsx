import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';

import {colors} from './src/utils';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
