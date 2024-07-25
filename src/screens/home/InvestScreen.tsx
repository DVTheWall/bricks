/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { font } from '../../utils/fonts';
import { icons } from '../../utils/icons';
import { commonStyles } from '../../styles/styles';
import Wallet from '../../components/common/Wallet';
import Header from '../../components/common/Header';
import Shadow from '../../components/common/Shadow';
import Button from '../../components/common/Button';
import { colors, fontSize, hp, wp } from '../../utils';
import TextInputComp from '../../components/common/TextInput';
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { investNowAction } from '../../store/action/ordersActions';
import { SCREEN } from '../../utils/screenConstants';

const InvestScreen = ({ route, navigation }: any) => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state: any) => state.auth);

  const { propertyData } = route?.params;

  const [sqft, setSqft] = useState('');
  const [sqftErr, setSqftErr] = useState('');
  const [orderType, setOrderType] = useState('');
  const [orderTypeErr, setOrderTypeErr] = useState('');
  const [repeatDate, setRepeatDate] = useState(new Date());
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [isMonthlyActive, setIsMonthlyActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const orderTypeData = [
    { label: 'Buy', value: 'Buy' },
    { label: 'Sell', value: 'Sell' },
  ];

  const isValidated = () => {
    if (sqft === '') {
      setSqftErr('Please enter Sqft');
      return false;
    }
    if (orderType === '') {
      return false;
    }
    return true;
  };

  const onOneTimeOrderPress = () => {
    const data = {
      customer_name: userData?.mobile_no,
      date: moment(repeatDate)?.format('YYYY-MM-DD'),
      property_id: propertyData?.property_name,
      order_type: orderType,
      number_of_sqft: Number(sqft),
      total_amount: Number(propertyData?.rate) * Number(sqft),
    };
    if (isValidated() && !isMonthlyActive) {
      setIsLoading(true);
      const request = {
        data: data,
        onSuccess: (res: any | []) => {
          setIsLoading(false);
          let dataSuccess = {
            orderID: res?.data?.data?.order,
            isSucceed: true,
            title: 'Order Creation Successful',
            desc: 'Your order has successfully been Completed.',
          };
          navigation.navigate(SCREEN.PAYMENTSUCCESS, dataSuccess);
        },
        onFail: (error: any) => {

          const colonIndex = error?.response?.data?.exception?.indexOf(':')
          const extractedString = error?.response?.data?.exception?.substring(colonIndex + 1).trim();

          setIsLoading(false);
          let dataFailed = {
            orderID: undefined,
            isSucceed: false,
            title: 'Order Creation Failed',
            desc: extractedString,
          };
          navigation.navigate(SCREEN.PAYMENTSUCCESS, dataFailed);
        },
      };
      dispatch(investNowAction(request) as never);
    }
  };

  const onInvestNowMonthlyPress = () => { };

  return (
    <View style={commonStyles.container}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={false}
        backgroundColor={colors.white}
      />
      <SafeAreaView />
      <Header
        isBackButton
        title={'Invest Now'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <View style={styles.tabContainer}>
        <Shadow
          shadowStyle={[
            styles.tabShadow,
            { shadowOpacity: !isMonthlyActive ? 0.1 : 0 },
          ]}>
          <TouchableOpacity
            onPress={() => setIsMonthlyActive(false)}
            style={[
              styles.tabView,
              {
                backgroundColor: isMonthlyActive
                  ? colors.transparent
                  : colors.white,
              },
            ]}>
            <Text
              style={[
                styles.tabText,
                {
                  color: !isMonthlyActive ? colors.lightBlack : colors.tabText,
                },
              ]}>
              {'One-time order'}
            </Text>
          </TouchableOpacity>
        </Shadow>
        <View style={styles.tabSeperator} />
        <Shadow
          shadowStyle={[
            styles.tabShadow,
            { shadowOpacity: isMonthlyActive ? 0.1 : 0 },
          ]}>
          <TouchableOpacity
            onPress={() => setIsMonthlyActive(true)}
            style={[
              styles.tabView,
              {
                backgroundColor: !isMonthlyActive
                  ? colors.transparent
                  : colors.white,
              },
            ]}>
            <Text
              style={[
                styles.tabText,
                {
                  color: isMonthlyActive ? colors.lightBlack : colors.tabText,
                },
              ]}>
              {'Monthly'}
            </Text>
          </TouchableOpacity>
        </Shadow>
      </View>

      <View style={styles.tabContainerMonthlyActive}>
        {!isMonthlyActive ? (
          <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
            <View style={styles.inputContainer}>
              <TextInputComp
                label="Enter the Number of Sqft"
                value={sqft}
                keyboardType="number-pad"
                onChangeText={text => setSqft(text)}
                customLabelStyle={styles.textInputLabel}
                customShadowStyle={{ shadowOpacity: 0 }}
                customTextBoxStyle={styles.customTextBox}
                error={sqftErr}
              />
              <TextInputComp
                label="Total Amount (₹)"
                value={`${Number(propertyData?.rate) * Number(sqft)}`}
                editable={false}
                // keyboardType="number-pad"
                // onChangeText={text => setAmount(text)}
                customLabelStyle={styles.textInputLabel}
                customShadowStyle={{ shadowOpacity: 0 }}
                customTextBoxStyle={[styles.customTextBox, { marginBottom: 0 }]}
              // error={amountErr}
              />
              <View style={[commonStyles.flexRow, { marginBottom: hp(32) }]}>
                <Image source={icons.info} style={commonStyles.icon16} />
                <Text style={styles.totalAmountText}>
                  {'Total amount updates based on square footage selected.'}
                </Text>
              </View>
              <Text
                style={{
                  ...styles.textInputLabel,
                  marginBottom: hp(5),
                  fontFamily: font.semiBold,
                }}>
                {'Order Type'}
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={commonStyles.icon20}
                data={orderTypeData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select Order Type'}
                value={orderType}
                onChange={(item: any) => {
                  setOrderType(item.value);
                }}
                itemTextStyle={styles.selectedTextStyle}
                containerStyle={{
                  backgroundColor: colors.white,
                  borderBottomLeftRadius: wp(10),
                  borderBottomRightRadius: wp(10),
                }}
              />
              <Text style={styles.errText}>
                {orderType === '' ? orderTypeErr : ''}
              </Text>
              <TextInputComp
                label={`This event will repeat every month on:`}
                value={moment(repeatDate)?.format('DD/MM/YYYY')}
                isRightIcon
                customLabelStyle={styles.textInputLabel}
                customShadowStyle={{ shadowOpacity: 0 }}
                customTextBoxStyle={styles.customTextBox}
                rightIconSource={icons.calendar}
                editable={false}
                rightIconTintColor={colors.darkGrey}
                onRightIconPress={() => setIsDatePicker(true)}
              />
            </View>
            <Text style={styles.paywithText}>{'Pay with'}</Text>
            <Wallet />
          </KeyboardAwareScrollView>
        ) : (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
              style={{
                fontSize: fontSize(20),
                fontFamily: font.semiBold,
                color: colors.darkGrey,
                marginBottom: hp(40),
              }}>
              {'Coming soon...'}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Invest Now"
          loader={isLoading}
          disable={isLoading}
          onPress={
            !isMonthlyActive ? onOneTimeOrderPress : onInvestNowMonthlyPress
          }
          buttonStyle={styles.btn}
          shadowStyle={{ shadowOpacity: 0 }}
        />
      </View>
      {isDatePicker && (
        <DatePicker
          modal
          open={isDatePicker}
          date={repeatDate}
          onConfirm={date => {
            setIsDatePicker(false);
            setRepeatDate(date);
          }}
          onCancel={() => {
            setIsDatePicker(false);
          }}
          buttonColor={colors.primary}
          mode="date"
          // maximumDate={new Date()}
          dividerColor={colors.primary}
          title={'Select Date'}
        />
      )}
      <SafeAreaView />
    </View>
  );
};

export default InvestScreen;

const styles = StyleSheet.create({
  customTitleStyle: {
    fontSize: fontSize(24),
    fontFamily: font.semiBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
  tabContainer: {
    height: hp(44),
    padding: wp(4),
    marginTop: hp(20),
    borderRadius: wp(8),
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(16),
    backgroundColor: colors.tabBg,
  },
  tabShadow: {
    flex: 1,
    shadowRadius: 3,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: hp(1),
    },
  },
  tabView: {
    height: '100%',
    borderRadius: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: fontSize(14),
    fontFamily: font.semiBold,
  },
  tabSeperator: {
    width: wp(1),
    height: hp(20),
    marginHorizontal: wp(12),
    backgroundColor: colors.white,
  },
  btnContainer: {
    paddingVertical: hp(8),
    paddingHorizontal: wp(15),
  },
  btn: {
    borderRadius: wp(4),
  },
  textInputLabel: {
    lineHeight: hp(15),
    fontSize: fontSize(12),
    color: colors.mediumGrey,
  },
  customTextBox: {
    borderRadius: wp(4),
    // marginBottom: hp(12),
    borderColor: colors.borderColor,
  },
  inputContainer: {
    paddingHorizontal: wp(16),
    borderBottomWidth: wp(0.5),
    borderColor: colors.borderColor,
  },
  totalAmountText: {
    marginLeft: wp(5),
    fontSize: fontSize(10),
    color: colors.mediumGrey,
    fontFamily: font.semiBold,
  },
  paywithText: {
    marginTop: hp(27),
    marginLeft: wp(16),
    lineHeight: hp(15),
    marginBottom: hp(12),
    fontSize: fontSize(12),
    color: colors.mediumGrey,
    fontFamily: font.semiBold,
  },
  tabContainerMonthlyActive: {
    flex: 1,
    marginTop: hp(30),
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
  dropdown: {
    height: hp(48),
    // borderRadius: wp(10),
    borderWidth: wp(0.5),
    justifyContent: 'center',
    paddingHorizontal: wp(16),
    // borderColor: colors.darkGrey,
    // backgroundColor: colors.white,
    borderRadius: wp(4),
    borderColor: colors.borderColor,
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
});
