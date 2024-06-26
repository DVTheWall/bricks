import {Platform, Dimensions} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// console.log('DIME----', screenHeight, screenWidth);

export const wp = (val: number) => {
  return widthPercentageToDP((val * 100) / screenWidth);
};

export const hp = (val: number) => {
  return heightPercentageToDP((val * 100) / screenHeight);
};

export const fontSize = (val: number) => RFValue(val, 812);

export const isIos = Platform.OS === 'ios' ? true : false;

export const deviceType = Platform.OS === 'ios' ? 'ios' : 'android';
