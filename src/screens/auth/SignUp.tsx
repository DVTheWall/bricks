/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import SvgIcons from '../../helpers/SvgIcons';
import {commonStyles} from '../../styles/styles';
import {SCREEN} from '../../utils/screenConstants';
import Shadow from '../../components/common/Shadow';
import Button from '../../components/common/Button';
import {colors, fontSize, hp, wp} from '../../utils';
import TextInputComp from '../../components/common/TextInput';
import StepIndicator from '../../components/other/StepIndicator';
import {useDispatch} from 'react-redux';
import {signUpUser} from '../../store/action/authActions';
import {resetStack} from '../../helpers/globalFunctions';

const SignUp = ({navigation}: any) => {
  const dispatch = useDispatch();

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

  const [isLoading, setIsLoading] = useState(false);

  const clearStates = () => {
    setFullName('');
    setMobileNumber('');
    setEmail('');
    setGender('');
    setMaritalStatus('');
    setAddress('');
    setCity('');
    setState('');
    setPan('');
    setPanName('');
    setAdhar('');
  };

  const data = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];

  const data1 = [
    {label: 'Single', value: 'Single'},
    {label: 'Married', value: 'Married'},
  ];

  const onVerifyPress = () => {
    if (stepCount === 1 || stepCount === 2) {
      setStepCount(stepCount + 1);
    } else {
      let signUpData = {
        full_name: fullName,
        mobile_number: mobileNumber,
        is_terms_agreed: isTermsChecked ? '1' : '0',
        dob: '03-02-1995',
        email: email,
        gender: gender,
        marital_status: maritalStatus,
        address: address,
        city: city,
        state: state,
        pan_card: pan,
        name_on_pan: panName,
        aadhar_card_number: adhar,
      };
      setIsLoading(true);
      const request = {
        // need to make it dynamic
        data: signUpData,
        onSuccess: (res: any | []) => {
          // console.log('res============', res);
          setIsLoading(false);
          resetStack(SCREEN.LOGIN);
          clearStates();
        },
        onFail: (err: any) => {
          // console.log('ERR=====', err);
          setIsLoading(false);
        },
      };
      dispatch(signUpUser(request) as never);
    }
  };

  return (
    <View style={commonStyles.root}>
      <SafeAreaView />
      <View style={styles.headerContainer}>
        <View style={commonStyles.flexRow}>
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
          <Text style={styles.headerText}>
            {stepCount === 3 ? 'E-KYC' : 'Sign Up'}
          </Text>
        </View>
        {stepCount === 3 && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.skipBtn}
            onPress={() => navigation.navigate(SCREEN.BOTTOMTABS)}>
            <Text style={styles.skipText}>{'Skip Now'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.indicatorView}>
        <StepIndicator
          step={1}
          isLine
          bgColor={stepCount > 1 ? colors.green : colors.primary}
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
          <Text style={styles.labelText}>
            {'Gender'}
            <Text style={{...styles.labelText, color: colors.redNeon}}>
              {' *'}
            </Text>
          </Text>
          <Shadow shadowStyle={{shadowColor: colors.cyan}}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Select Gender'}
              searchPlaceholder="Search..."
              value={gender}
              onChange={(item: any) => {
                setGender(item.value);
              }}
              itemTextStyle={styles.selectedTextStyle}
              containerStyle={{
                backgroundColor: colors.white,
                borderBottomLeftRadius: wp(10),
                borderBottomRightRadius: wp(10),
              }}
            />
          </Shadow>
          <Text style={styles.errText}>{''}</Text>
          <Text style={styles.labelText}>
            {'Marital Status'}
            <Text style={{...styles.labelText, color: colors.redNeon}}>
              {' *'}
            </Text>
          </Text>
          <Shadow shadowStyle={{shadowColor: colors.cyan}}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data1}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Select Marital Status'}
              searchPlaceholder="Search..."
              value={maritalStatus}
              onChange={(item: any) => {
                setMaritalStatus(item.value);
              }}
              itemTextStyle={styles.selectedTextStyle}
              containerStyle={{
                backgroundColor: colors.white,
                borderBottomLeftRadius: wp(10),
                borderBottomRightRadius: wp(10),
              }}
            />
          </Shadow>
          <Text style={styles.errText}>{''}</Text>
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
        loader={isLoading}
        title={stepCount === 3 ? 'VERIFY' : 'NEXT'}
        buttonStyle={styles.btnStyle}
        onPress={onVerifyPress}
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
    justifyContent: 'space-between',
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
    alignSelf: 'center',
    paddingHorizontal: wp(10),
    marginTop: hp(24),
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
  dropdown: {
    height: hp(48),
    borderRadius: wp(10),
    borderWidth: wp(0.5),
    justifyContent: 'center',
    paddingHorizontal: wp(16),
    borderColor: colors.darkGrey,
    backgroundColor: colors.white,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: colors.darkGrey,
    fontSize: fontSize(16),
    fontFamily: font.semiBold,
  },
  selectedTextStyle: {
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: font.semiBold,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  labelText: {
    lineHeight: hp(18),
    color: colors.black,
    marginBottom: hp(5),
    fontSize: fontSize(14),
    fontFamily: font.semiBold,
  },
  errText: {
    marginTop: hp(2),
    color: colors.red,
    alignSelf: 'flex-end',
    fontSize: fontSize(10),
  },
});
