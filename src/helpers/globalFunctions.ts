import {createRef} from 'react';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {localStore} from '../api/constants';
import {icons} from '../utils/icons';
import {colors} from '../utils';

export const navigationRef = createRef();

export const isValidEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailPattern.test(email);
};

export const isValidPan = (email: string) => {
  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panPattern.test(email);
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

export const getCatogoryItemData = (category_name: string) => {
  switch (category_name) {
    case 'Hotel':
      return {icon: icons.office, bgColor: colors.greenNeon};
    case 'School':
      return {icon: icons.school, bgColor: colors.darkYellow};
    case 'Villa':
      return {icon: icons.office, bgColor: colors.blueNeon};
    case 'Office':
      return {icon: icons.office, bgColor: colors.greenNeon};
    case 'Hospital':
      return {icon: icons.hospital, bgColor: colors.blueNeon};
    default:
      return {icon: icons.office, bgColor: colors.greenNeon};
  }
};
