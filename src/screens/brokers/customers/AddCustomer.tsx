/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {font} from '../../../utils/fonts';
import {commonStyles} from '../../../styles/styles';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import Shadow from '../../../components/common/Shadow';
import {colors, fontSize, hp, wp} from '../../../utils';
import OTPInput from '../../../components/common/OtpInput';
import TextInputComp from '../../../components/common/TextInput';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [dob, setDob] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDatePicker, setIsDatePicker] = useState(false);

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Header
        isBackButton
        title={'Add Customer'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <View style={commonStyles.flex}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          style={{paddingHorizontal: wp(16), paddingTop: hp(12)}}>
          <TextInputComp
            label={`Name`}
            value={name}
            onChangeText={text => setName(text)}
            customLabelStyle={styles.customLabelStyle}
            customTextBoxStyle={styles.customTextBoxStyle}
            customShadowStyle={styles.customShadowStyle}
            customInputStyle={styles.customInputStyle}
            // error={`You're not register please sign up`}
          />
          <View style={styles.numberContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <TextInputComp
                  label={`Number`}
                  value={phoneNumber}
                  onChangeText={text => setPhoneNumber(text)}
                  customLabelStyle={styles.customLabelStyle}
                  customTextBoxStyle={styles.customTextBoxStyle}
                  customShadowStyle={styles.customShadowStyle}
                  customInputStyle={styles.customInputStyle}
                  // error={`You're not register please sign up`}
                />
              </View>
              <TouchableOpacity style={styles.sendOtpView}>
                <Text style={styles.sendOtpText}>{'Send OTP'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.customLabelStyle}>{'Enter OTP'}</Text>
            <OTPInput
              onOTPComplete={(otp: string) => console.log('OTP-----', otp)}
            />
          </View>
          <View style={{height: hp(16)}} />
          <TextInputComp
            label={`Email`}
            value={email}
            onChangeText={text => setEmail(text)}
            customLabelStyle={styles.customLabelStyle}
            customTextBoxStyle={styles.customTextBoxStyle}
            customShadowStyle={styles.customShadowStyle}
            customInputStyle={styles.customInputStyle}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            label={`DOB`}
            value={moment(dob)?.format('DD/MM/YYYY')}
            isRightIcon
            editable={false}
            // onChangeText={text => setDob(text)}
            onFocus={() => setIsDatePicker(true)}
            onRightIconPress={() => setIsDatePicker(true)}
            customLabelStyle={styles.customLabelStyle}
            customTextBoxStyle={styles.customTextBoxStyle}
            customShadowStyle={styles.customShadowStyle}
            customInputStyle={styles.customInputStyle}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            label={`Address`}
            value={address}
            onChangeText={text => setAddress(text)}
            customLabelStyle={styles.customLabelStyle}
            customTextBoxStyle={styles.customTextBoxStyle}
            customShadowStyle={styles.customShadowStyle}
            customInputStyle={styles.customInputStyle}
            // error={`You're not register please sign up`}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <TextInputComp
                label={`City`}
                value={city}
                onChangeText={text => setCity(text)}
                customLabelStyle={styles.customLabelStyle}
                customTextBoxStyle={styles.customTextBoxStyle}
                customShadowStyle={styles.customShadowStyle}
                customInputStyle={styles.customInputStyle}
                // error={`You're not register please sign up`}
              />
            </View>

            <View style={{width: wp(16)}} />
            <View style={{flex: 1}}>
              <TextInputComp
                label={`State`}
                value={state}
                onChangeText={text => setState(text)}
                customLabelStyle={styles.customLabelStyle}
                customTextBoxStyle={styles.customTextBoxStyle}
                customShadowStyle={styles.customShadowStyle}
                customInputStyle={styles.customInputStyle}
                // error={`You're not register please sign up`}
              />
            </View>
          </View>
          <View style={{height: hp(60)}} />
        </KeyboardAwareScrollView>
      </View>
      <Shadow shadowStyle={styles.btnContainerShadow}>
        <View style={styles.btnContainer}>
          <Button
            title={'Save'}
            textStyle={styles.btnText}
            buttonStyle={styles.btnStyle}
            shadowStyle={{shadowOpacity: 0}}
            onPress={() => {}}
          />
        </View>
      </Shadow>
      {isDatePicker && (
        <DatePicker
          modal
          open={isDatePicker}
          date={dob}
          onConfirm={date => {
            setIsDatePicker(false);
            setDob(date);
          }}
          onCancel={() => {
            setIsDatePicker(false);
          }}
          buttonColor={colors.primary}
          mode="date"
          maximumDate={new Date()}
          dividerColor={colors.primary}
          title={'Select Date of Birth'}
        />
      )}
    </View>
  );
};

export default AddCustomer;

const styles = StyleSheet.create({
  customTitleStyle: {
    fontSize: fontSize(24),
    fontFamily: font.qBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
  btnText: {
    fontSize: fontSize(16),
    fontFamily: font.qBold,
  },
  btnStyle: {
    height: hp(52),
    borderRadius: wp(4),
  },
  btnContainer: {
    paddingHorizontal: wp(16),
    paddingTop: hp(24),
    paddingBottom: hp(43),
    borderTopWidth: wp(1),
    borderTopRightRadius: wp(16),
    borderTopLeftRadius: wp(16),
    borderColor: colors.darkBorder,
    borderStartWidth: wp(1),
    borderEndWidth: wp(1),
    backgroundColor: colors.white,
  },
  btnContainerShadow: {
    shadowRadius: 20,
    shadowOpacity: 0.06,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: hp(-5),
    },
  },
  customLabelStyle: {
    color: colors.grey,
    fontSize: fontSize(16),
    fontFamily: font.qMedium,
    marginBottom: hp(8),
  },
  customTextBoxStyle: {
    height: hp(42),
    borderRadius: wp(6),
    borderColor: colors.darkBorder,
  },
  customShadowStyle: {
    shadowRadius: 3,
    shadowOpacity: 0.05,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: hp(1),
    },
  },
  numberContainer: {
    padding: wp(12),
    borderRadius: wp(12),
    borderWidth: wp(1),
    borderColor: colors.borderColor,
    backgroundColor: colors.tabBg,
  },
  sendOtpView: {
    marginLeft: wp(8),
    marginTop: hp(8),
  },
  sendOtpText: {
    color: colors.primary,
    fontSize: fontSize(14),
    fontFamily: font.qSemiBold,
    textDecorationLine: 'underline',
  },
  customInputStyle: {
    fontFamily: font.qMedium,
  },
});
