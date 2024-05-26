/* eslint-disable quotes */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {font} from '../../utils/fonts';
import SvgIcons from '../../helpers/SvgIcons';
import {commonStyles} from '../../styles/styles';
import {SCREEN} from '../../utils/screenConstants';
import Button from '../../components/common/Button';
import {colors, fontSize, hp, wp} from '../../utils';
import TextInputComp from '../../components/common/TextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = ({navigation}: any) => {
  const [mobileNumber, setMobileNumber] = useState('');

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
        extraScrollHeight={hp(40)}
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
            onChangeText={text => setMobileNumber(text)}
            error={`You're not register please sign up`}
          />
          <Button
            title="CONTINUE"
            buttonStyle={styles.btnStyle}
            onPress={() => {
              navigation.navigate(SCREEN.OTP);
            }}
          />
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
  },
  accText: {
    marginTop: hp(12),
    lineHeight: hp(18),
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize(14),
    fontFamily: font.regular,
  },
});
