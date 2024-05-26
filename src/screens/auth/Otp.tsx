/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import SvgIcons from '../../helpers/SvgIcons';
import {commonStyles} from '../../styles/styles';
import {SCREEN} from '../../utils/screenConstants';
import Button from '../../components/common/Button';
import {colors, fontSize, hp, wp} from '../../utils';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Shadow from '../../components/common/Shadow';

const Otp = ({navigation}: any) => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (code: string) => {
    setOtp(code);
  };

  const handleOtpComplete = (code: string) => {
    console.log(`OTP is ${code}`);
  };

  return (
    <View style={commonStyles.root}>
      <SafeAreaView />
      <View style={{marginTop: hp(42)}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{
            alignSelf: 'flex-start',
            position: 'absolute',
            top: 10,
            zIndex: 999,
          }}>
          <SvgIcons iconName={'backArrow'} />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.black,
            fontFamily: font.semiBold,
            fontSize: fontSize(20),
            lineHeight: hp(36),
            textAlign: 'center',
            letterSpacing: -0.5,
          }}>
          Hi, Quaid Johar
        </Text>
        <Text
          style={{
            color: colors.black,
            fontFamily: font.semiBold,
            fontSize: fontSize(15),
            lineHeight: hp(36),
            textAlign: 'center',
            letterSpacing: -0.5,
          }}>
          OTP sent to <Text style={{color: colors.green}}>+91 7000980933</Text>
        </Text>
      </View>
      {/* <SvgIcons iconName={'otpImg'} /> */}
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        extraScrollHeight={hp(50)}>
        <Image
          source={icons.otpImg}
          style={{
            width: wp(288),
            height: hp(258),
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: 30,
          }}
        />
        <Text
          style={{
            marginTop: 55,
            textAlign: 'center',
            color: colors.black,
            fontFamily: font.semiBold,
            fontSize: fontSize(14),
            lineHeight: hp(18),
          }}>
          Verify 4- digit sincerity PIN
        </Text>
        <Shadow shadowStyle={{shadowColor: colors.cyan}}>
          <OTPInputView
            style={styles.otpInput}
            pinCount={4}
            code={otp}
            onCodeChanged={handleOtpChange}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={handleOtpComplete}
          />
        </Shadow>
        <Button
          title="VERIFY"
          buttonStyle={{marginBottom: 5}}
          onPress={() => {
            navigation.navigate(SCREEN.BOTTOMTABS);
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  otpInput: {
    width: '80%',
    height: hp(150),
    alignSelf: 'center',
    color: colors.black,
  },
  underlineStyleBase: {
    width: wp(53),
    height: hp(58),
    borderWidth: 1,
    backgroundColor: colors.white,
    borderRadius: wp(10),
    borderColor: colors.darkGrey,
  },
  underlineStyleHighLighted: {
    // borderColor: '#03DAC6',
  },
});
