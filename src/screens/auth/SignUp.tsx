/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

import {useDispatch} from 'react-redux';
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
import ToastAlert from '../../components/common/Alert';
import {signUpUser} from '../../store/action/authActions';
import TextInputComp from '../../components/common/TextInput';
import StepIndicator from '../../components/other/StepIndicator';
import {
  isValidPan,
  resetStack,
  isValidEmail,
} from '../../helpers/globalFunctions';

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

  const [nameErr, setNameErr] = useState('');
  const [numberErr, setNumberErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [genderErr, setGenderErr] = useState('');
  const [maritalErr, setMaritalErr] = useState('');
  const [addressErr, setAddressErr] = useState('');
  const [cityErr, setCityErr] = useState('');
  const [stateErr, setStateErr] = useState('');
  const [panNumErr, setPanNumErr] = useState('');
  const [panNameErr, setPanNameErr] = useState('');
  const [adharErr, setAdharErr] = useState('');

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

  const step1Validation = () => {
    if (fullName === '') {
      setNameErr('Please enter your full name');
      return false;
    }
    if (mobileNumber === '') {
      setNumberErr('Please enter your mobile number');
      return false;
    }
    if (mobileNumber?.length !== 10) {
      setNumberErr('Mobile number should contain 10 digits.');
      return false;
    }
    if (!isTermsChecked) {
      ToastAlert({
        toastType: 'info',
        description: 'Please check agree our terms & conditions to continue',
      });
      return false;
    }
    return true;
  };

  const step2Validation = () => {
    if (email === '') {
      setEmailErr('Please enter your email');
      return false;
    }
    if (!isValidEmail(email)) {
      setEmailErr('Please enter valid email address');
      return false;
    }
    if (gender === '') {
      setGenderErr('Please select your gender');
      return false;
    }
    if (maritalStatus === '') {
      setMaritalErr('Please select your marital status');
      return false;
    }
    if (address === '') {
      setAddressErr('Please enter your address');
      return false;
    }
    if (city === '') {
      setCityErr('Please enter your city');
      return false;
    }
    if (state === '') {
      setStateErr('Please enter your state');
      return false;
    }
    return true;
  };

  const step3Validation = () => {
    if (pan === '') {
      setPanNumErr('Please enter your PAN number');
      return false;
    }
    if (!isValidPan(pan)) {
      setPanNumErr('Please enter valid PAN number');
      return false;
    }
    if (panName === '') {
      setPanNameErr('Please enter name on PAN');
      return false;
    }
    if (adhar === '') {
      setAdharErr('Please enter your Adhar number');
      return false;
    }
    if (adhar?.length !== 12) {
      setAdharErr('Adhar number should contain 12 digits');
      return false;
    }
    return true;
  };

  const handleBlur = (field: string) => {
    if (field === 'fullName' && fullName !== '') {
      setNameErr('');
    }
    if (
      field === 'mobileNumber' &&
      mobileNumber !== '' &&
      mobileNumber?.length === 10
    ) {
      setNumberErr('');
    }
    if (field === 'email' && email !== '' && isValidEmail(email)) {
      setEmailErr('');
    }
    if (field === 'address' && address !== '') {
      setAddressErr('');
    }
    if (field === 'city' && city !== '') {
      setCityErr('');
    }
    if (field === 'state' && state !== '') {
      setStateErr('');
    }
    if (field === 'pan' && pan !== '' && isValidPan(pan)) {
      setPanNumErr('');
    }
    if (field === 'panName' && panName !== '') {
      setPanNameErr('');
    }
    if (field === 'adhar' && adhar !== '' && adhar?.length === 12) {
      setAdharErr('');
    }
  };

  const onVerifyPress = () => {
    if (stepCount === 1) {
      if (step1Validation()) {
        setStepCount(stepCount + 1);
      }
    } else if (stepCount === 2) {
      if (step2Validation()) {
        setStepCount(stepCount + 1);
      }
    } else {
      if (step3Validation()) {
        const signUpData = {
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
            setIsLoading(false);
            resetStack(SCREEN.LOGIN, {
              isFromSignUp: true,
              data: signUpData,
            });
            clearStates();
          },
          onFail: (err: any) => {
            setIsLoading(false);
          },
        };
        dispatch(signUpUser(request) as never);
      }
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
        <View style={commonStyles.flex}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            style={styles.inputContainer}>
            <View style={commonStyles.flex}>
              <TextInputComp
                isMandetory
                label={`Full Name`}
                placeholder={`Full Name`}
                value={fullName}
                onChangeText={text => setFullName(text)}
                error={nameErr}
                onBlur={() => handleBlur('fullName')}
              />
              <TextInputComp
                isMandetory
                label={`Mobile Number`}
                placeholder={`Mobile Number`}
                value={mobileNumber}
                onChangeText={text => setMobileNumber(text)}
                error={numberErr}
                maxLength={10}
                onBlur={() => handleBlur('mobileNumber')}
                keyboardType={'numeric'}
              />
            </View>
          </KeyboardAwareScrollView>
          <View style={{alignItems: 'flex-end'}}>
            <View style={commonStyles.flexRowOnly}>
              <TouchableOpacity
                onPress={() => setIsDescChecked(!isDescChecked)}
                style={styles.checkBoxStyle}>
                {isDescChecked && (
                  <Image source={icons.checkMark} style={commonStyles.icon12} />
                )}
              </TouchableOpacity>
              <Text style={styles.termsText}>
                {
                  'By Sign Up You Authorized Bricks To Contact(Email, Call, Message, WhatsApp) You Propose Of Sign Up And Sharing Information Of Our Services, Even Though You May Be Registration On Dnd.'
                }
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: hp(25)}}>
              <TouchableOpacity
                onPress={() => setIsTermsChecked(!isTermsChecked)}
                style={styles.checkBoxStyle}>
                {isTermsChecked && (
                  <Image source={icons.checkMark} style={commonStyles.icon12} />
                )}
              </TouchableOpacity>
              <Text style={styles.termsText}>
                {'I Agree '}
                <Text style={{color: colors.blue}} onPress={() => {}}>
                  {'Terms & Privacy Policy'}
                </Text>
              </Text>
            </View>
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
            error={emailErr}
            onBlur={() => handleBlur('email')}
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
              iconStyle={commonStyles.icon20}
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
          <Text style={styles.errText}>{gender === '' ? genderErr : ''}</Text>
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
              iconStyle={commonStyles.icon20}
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
          <Text style={styles.errText}>
            {maritalStatus === '' ? maritalErr : ''}
          </Text>
          <TextInputComp
            isMandetory
            label={`Address`}
            placeholder={`Address`}
            value={address}
            onChangeText={text => setAddress(text)}
            error={addressErr}
            onBlur={() => handleBlur('address')}
          />
          <TextInputComp
            isMandetory
            label={`City`}
            placeholder={`City`}
            value={city}
            onChangeText={text => setCity(text)}
            error={cityErr}
            onBlur={() => handleBlur('city')}
          />
          <TextInputComp
            isMandetory
            label={`State`}
            placeholder={`State`}
            value={state}
            onChangeText={text => setState(text)}
            error={stateErr}
            onBlur={() => handleBlur('state')}
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
            error={panNumErr}
            onBlur={() => handleBlur('pan')}
          />
          <TextInputComp
            isMandetory
            label={`Name on PAN`}
            placeholder={`Name on PAN`}
            value={panName}
            onChangeText={text => setPanName(text)}
            error={panNameErr}
            onBlur={() => handleBlur('panName')}
          />
          <TextInputComp
            isMandetory
            label={`Aadhaar Number`}
            placeholder={`Aadhaar Number`}
            value={adhar}
            onChangeText={text => setAdhar(text)}
            error={adharErr}
            maxLength={12}
            onBlur={() => handleBlur('adhar')}
          />
        </KeyboardAwareScrollView>
      )}

      <Button
        loader={isLoading}
        disable={isLoading}
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
    marginTop: hp(24),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    marginLeft: wp(16),
    lineHeight: hp(36),
    color: colors.black,
    textAlign: 'center',
    letterSpacing: -0.5,
    fontSize: fontSize(24),
    fontFamily: font.semiBold,
  },
  inputContainer: {
    flex: 1,
    marginTop: hp(24),
    paddingBottom: hp(50),
  },
  btnStyle: {
    marginTop: hp(24),
    marginBottom: hp(24),
  },
  indicatorView: {
    marginTop: hp(24),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(10),
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
  checkBoxStyle: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(2),
    alignItems: 'center',
    borderWidth: wp(0.5),
    justifyContent: 'center',
    borderColor: colors.black,
  },
  termsText: {
    flex: 1,
    marginLeft: wp(7),
    lineHeight: hp(21),
    fontSize: fontSize(13),
    color: colors.mediumGrey,
    fontFamily: font.semiBold,
  },
});
