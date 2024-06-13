import {createRef} from 'react';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {localStore} from '../api/constants';

export const navigationRef = createRef();

export const isValidEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailPattern.test(email);
};

export const setAsyncStorage = async (key: string, value: string) => {
  const item = await AsyncStorage.setItem(key, JSON.stringify(value));
  return item;
};

export const getAsyncStorage = async (key: string) => {
  const item: any = await AsyncStorage.getItem(key);
  return JSON.parse(item);
};

export const removeAsyncStorage = async () => await AsyncStorage.clear();

export const getAuthTokenAsString = async () => {
  let token = await getAsyncStorage(localStore.token);
  const header = {
    Authorization: 'Bearer ' + JSON.stringify(token),
  };
  return header;
};

export const resetStack = (name: string, params?: any) =>
  //@ts-ignore
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: name, params: params}],
    }),
  );

export const currentTime = new Date();
