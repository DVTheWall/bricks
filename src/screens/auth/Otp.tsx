/* eslint-disable handle-callback-err */
/* eslint-disable quotes */
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
import ToastAlert from '../../components/common/Alert';
import {resetStack} from '../../helpers/globalFunctions';
import {verifyOtp} from '../../store/action/authActions';
import {useDispatch} from 'react-redux';

const Otp = ({navigation, route}: any) => {
  const {number} = route?.params;
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (code: string) => {
    setOtp(code);
  };

  const handleOtpComplete = (code: string) => {
    console.log(`OTP is ${code}`);
  };

  const onVerifyPress = () => {
    if (otp?.length !== 4) {
      ToastAlert({
        toastType: 'error',
        title: 'Invalid!',
        description: 'Please enter correct OTP',
      });
      return;
    }
    const data = {
      number: number,
      otp: otp,
    };
    setIsLoading(true);
    const request = {
      data: data,
      onSuccess: (res: any | []) => {
        // console.log('VEIRFY OTP RES========', JSON.stringify(res));
        setIsLoading(false);
        if (res.data.message === 'success') {
          resetStack(SCREEN.BOTTOMTABS);
        } else {
          ToastAlert({
            toastType: 'error',
            title: 'Invalid!',
            description: 'Please enter correct OTP',
          });
        }
      },
      onFail: (err: any) => {
        setIsLoading(false);
      },
    };
    dispatch(verifyOtp(request) as never);
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
          OTP sent to{' '}
          <Text style={{color: colors.green}}>{`+91 ${number}`}</Text>
        </Text>
      </View>
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
            marginTop: hp(58),
          }}
        />
        <Text
          style={{
            marginTop: hp(55),
            textAlign: 'center',
            color: colors.black,
            fontFamily: font.semiBold,
            fontSize: fontSize(14),
            lineHeight: hp(18),
          }}>
          Verify 4- digit sincerity PIN
        </Text>
        <Shadow shadowStyle={{shadowColor: colors.cyan, marginTop: hp(12)}}>
          <OTPInputView
            style={styles.otpInput}
            pinCount={4}
            code={otp}
            onCodeChanged={handleOtpChange}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={handleOtpComplete}
            selectionColor="red"
          />
        </Shadow>
        <Button
          loader={isLoading}
          title="VERIFY"
          buttonStyle={{marginTop: hp(40)}}
          onPress={onVerifyPress}
        />
        <View style={{height: hp(10)}} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  otpInput: {
    width: '80%',
    height: hp(58),
    alignSelf: 'center',
    color: colors.black,
  },
  underlineStyleBase: {
    width: wp(53),
    height: hp(58),
    borderWidth: wp(0.5),
    backgroundColor: colors.white,
    borderRadius: wp(10),
    borderColor: colors.otpInputBorder,
  },
  underlineStyleHighLighted: {
    // borderColor: '#03DAC6',
  },
});
