/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import React, {useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {font} from '../../utils/fonts';
import SvgIcons from '../../helpers/SvgIcons';
import {commonStyles} from '../../styles/styles';
import {SCREEN} from '../../utils/screenConstants';
import Button from '../../components/common/Button';
import {colors, fontSize, hp, wp} from '../../utils';
import ToastAlert from '../../components/common/Alert';
import TextInputComp from '../../components/common/TextInput';
import {login, sendOtp} from '../../store/action/authActions';

const Login = ({navigation, route}: any) => {
  const dispatch = useDispatch();

  const isFromSignUp = route?.params?.isFromSignUp || false;
  const mobile_number = route?.params?.data?.mobile_number || '';

  const [isLoading, setIsLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isSignupError, setIsSignupError] = useState(false);

  useLayoutEffect(() => {
    if (isFromSignUp) {
      setMobileNumber(mobile_number);
    }
  }, []);

  const onContinuePress = () => {
    if (mobileNumber?.length !== 10) {
      ToastAlert({
        toastType: 'error',
        title: 'Invalid!',
        description: 'Mobile number should contains 10 digits',
      });
      return;
    }
    const data = {mobile: mobileNumber};
    setIsLoading(true);
    const loginRequest = {
      data: data,
      onSuccess: (res: any | []) => {
        if (res?.data?.message === 'Logged In') {
          const otpRequest = {
            data: data,
            onSuccess: (response: any | []) => {
              if (response?.data?.message) {
                navigation.navigate(SCREEN.OTP, data);
              }
              setIsLoading(false);
              setMobileNumber('');
            },
            onFail: (err: any) => {
              setIsLoading(false);
            },
          };
          dispatch(sendOtp(otpRequest) as never);
        }
      },
      onFail: (err: any) => {
        setIsSignupError(true);
        setIsLoading(false);
      },
    };
    dispatch(login(loginRequest) as never);
  };

  return (
    <View style={commonStyles.root}>
      <SafeAreaView />
      <View style={styles.logoContainer}>
        <SvgIcons iconName={'logo'} />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.skipBtn}
          onPress={() => navigation.navigate(SCREEN.BOTTOMTABS)}>
          <Text style={styles.skipText}>{'Skip Now'}</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid
        extraScrollHeight={hp(50)}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <View style={styles.loginImgContainer}>
          <SvgIcons iconName={'loginImg'} />
        </View>
        <View style={styles.bottomContainer}>
          <TextInputComp
            isMandetory
            label={`Mobile Number`}
            placeholder={`Mobile Number`}
            value={mobileNumber}
            keyboardType={'numeric'}
            maxLength={10}
            onChangeText={text => setMobileNumber(text)}
            error={isSignupError ? `You're not register please sign up` : ''}
          />
          <Button
            disable={isLoading}
            loader={isLoading}
            title="CONTINUE"
            buttonStyle={styles.btnStyle}
            onPress={onContinuePress}
          />
          {!isFromSignUp && (
            <Text style={styles.accText}>
              {`Don't Have an Account?`}
              <Text
                style={{color: colors.blue}}
                onPress={() => {
                  navigation.navigate(SCREEN.SIGNUP);
                }}>
                {' Sign-up'}
              </Text>
            </Text>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: hp(42),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipBtn: {
    borderWidth: wp(0.5),
    borderRadius: wp(100),
    paddingVertical: hp(7),
    borderColor: colors.blue,
    paddingHorizontal: wp(12),
  },
  skipText: {
    color: colors.blue,
    fontFamily: font.bold,
    fontSize: fontSize(10),
  },
  loginImgContainer: {
    marginTop: hp(82),
    alignItems: 'center',
  },
  bottomContainer: {
    marginTop: hp(70),
  },
  btnStyle: {
    marginTop: hp(7),
    marginBottom: hp(12),
  },
  accText: {
    lineHeight: hp(18),
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize(14),
    fontFamily: font.regular,
  },
});
