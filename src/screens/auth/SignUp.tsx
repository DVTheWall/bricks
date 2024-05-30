/* eslint-disable quotes */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {font} from '../../utils/fonts';
import SvgIcons from '../../helpers/SvgIcons';
import {commonStyles} from '../../styles/styles';
import Button from '../../components/common/Button';
import {colors, fontSize, hp, wp} from '../../utils';
import TextInputComp from '../../components/common/TextInput';
import StepIndicator from '../../components/other/StepIndicator';
import {SCREEN} from '../../utils/screenConstants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {icons} from '../../utils/icons';

const SignUp = ({navigation}: any) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [pan, setPan] = useState('');
  const [panName, setPanName] = useState('');
  const [adhar, setAdhar] = useState('');

  const [stepCount, setStepCount] = useState(1);

  const [isDescChecked, setIsDescChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  return (
    <View style={commonStyles.root}>
      <SafeAreaView />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (stepCount === 2 || stepCount === 3) {
              setStepCount(stepCount - 1);
            } else {
              navigation.goBack();
            }
          }}
          style={{}}>
          <SvgIcons iconName={'backArrow'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>

      <View style={styles.indicatorView}>
        <StepIndicator
          step={1}
          isLine
          bgColor={stepCount > 1 && colors.green}
        />
        <StepIndicator
          step={2}
          isLine
          bgColor={
            stepCount < 2
              ? colors.xLightGrey
              : stepCount > 2
              ? colors.green
              : colors.primary
          }
        />
        <StepIndicator
          step={3}
          bgColor={
            stepCount < 3
              ? colors.xLightGrey
              : stepCount > 3
              ? colors.green
              : colors.primary
          }
        />
      </View>

      {stepCount === 1 && (
        <View style={{flex: 1}}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            style={styles.inputContainer}>
            <View style={{flex: 1}}>
              <TextInputComp
                isMandetory
                label={`Full Name`}
                placeholder={`Full Name`}
                value={fullName}
                onChangeText={text => setFullName(text)}
                // error={`You're not register please sign up`}
              />
              <TextInputComp
                isMandetory
                label={`Mobile Number`}
                placeholder={`Mobile Number`}
                value={mobileNumber}
                onChangeText={text => setMobileNumber(text)}
                // error={`You're not register please sign up`}
              />
            </View>
          </KeyboardAwareScrollView>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setIsDescChecked(!isDescChecked)}
              style={{
                height: wp(20),
                width: wp(20),
                borderRadius: wp(2),
                borderColor: colors.black,
                borderWidth: wp(0.5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isDescChecked && (
                <Image
                  source={icons.checkMark}
                  style={{width: wp(11), height: hp(9), resizeMode: 'contain'}}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                marginLeft: wp(7),
                fontSize: fontSize(13),
                lineHeight: hp(21),
                fontFamily: font.semiBold,
                color: colors.mediumGrey,
              }}>
              {
                'By Sign Up You Authorized Bricks To Contact(Email, Call, Message, WhatsApp) You Propose Of Sign Up And Sharing Information Of Our Services, Even Though You May Be Registration On Dnd.'
              }
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: hp(25)}}>
            <TouchableOpacity
              onPress={() => setIsTermsChecked(!isTermsChecked)}
              style={{
                height: wp(20),
                width: wp(20),
                borderRadius: wp(2),
                borderColor: colors.black,
                borderWidth: wp(0.5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isTermsChecked && (
                <Image
                  source={icons.checkMark}
                  style={{width: wp(11), height: hp(9), resizeMode: 'contain'}}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                marginLeft: wp(7),
                fontSize: fontSize(13),
                lineHeight: hp(21),
                fontFamily: font.semiBold,
                color: colors.mediumGrey,
              }}>
              {'I Agree '}
              <Text style={{color: colors.blue}} onPress={() => {}}>
                {'Terms & Privacy Policy'}
              </Text>
            </Text>
          </View>
        </View>
      )}
      {stepCount === 2 && (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          style={styles.inputContainer}>
          <TextInputComp
            isMandetory
            label={`Email Address`}
            placeholder={`Email Address*`}
            value={email}
            onChangeText={text => setEmail(text)}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            isMandetory
            label={`Gender`}
            placeholder={`Male`}
            value={gender}
            onChangeText={text => setGender(text)}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            isMandetory
            label={`Martial Status`}
            placeholder={`Single`}
            value={maritalStatus}
            onChangeText={text => setMaritalStatus(text)}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            isMandetory
            label={`Address`}
            placeholder={`Address`}
            value={address}
            onChangeText={text => setAddress(text)}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            isMandetory
            label={`City`}
            placeholder={`City`}
            value={city}
            onChangeText={text => setCity(text)}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            isMandetory
            label={`State`}
            placeholder={`State`}
            value={state}
            onChangeText={text => setState(text)}
            // error={`You're not register please sign up`}
          />
        </KeyboardAwareScrollView>
      )}
      {stepCount === 3 && (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          style={styles.inputContainer}>
          <TextInputComp
            isMandetory
            label={`PAN Number`}
            placeholder={`PAN Number`}
            value={pan}
            onChangeText={text => setPan(text)}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            isMandetory
            label={`Name on PAN`}
            placeholder={`Name on PAN`}
            value={panName}
            onChangeText={text => setPanName(text)}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            isMandetory
            label={`Aadhaar Number`}
            placeholder={`Aadhaar Number`}
            value={adhar}
            onChangeText={text => setAdhar(text)}
            // error={`You're not register please sign up`}
          />
        </KeyboardAwareScrollView>
      )}

      <Button
        title={stepCount === 3 ? 'VERIFY' : 'NEXT'}
        buttonStyle={styles.btnStyle}
        onPress={() => {
          if (stepCount === 1 || stepCount === 2) {
            setStepCount(stepCount + 1);
          } else {
            navigation.navigate(SCREEN.BOTTOMTABS);
          }
        }}
      />
      <SafeAreaView />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(24),
  },
  headerText: {
    color: colors.black,
    fontFamily: font.semiBold,
    fontSize: fontSize(24),
    lineHeight: hp(36),
    textAlign: 'center',
    letterSpacing: -0.5,
    marginLeft: wp(16),
  },
  inputContainer: {
    flex: 1,
    marginTop: hp(24),
    paddingBottom: hp(50),
  },
  btnStyle: {
    marginBottom: hp(24),
    marginTop: hp(24),
  },
  indicatorView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(10),
    marginTop: hp(24),
  },
});
