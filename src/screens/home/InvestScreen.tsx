/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import Wallet from '../../components/common/Wallet';
import Header from '../../components/common/Header';
import Shadow from '../../components/common/Shadow';
import Button from '../../components/common/Button';
import {colors, fontSize, hp, wp} from '../../utils';
import TextInputComp from '../../components/common/TextInput';

const InvestScreen = () => {
  const [sqft, setSqft] = useState('');
  const [amount, setAmount] = useState('');
  const [isMonthlyActive, setIsMonthlyActive] = useState(false);

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
            {shadowOpacity: !isMonthlyActive ? 0.1 : 0},
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
            {shadowOpacity: isMonthlyActive ? 0.1 : 0},
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
        {isMonthlyActive && (
          <ScrollView>
            <View style={styles.inputContainer}>
              <TextInputComp
                label="Enter the Number of Sqft"
                value={sqft}
                onChangeText={text => setSqft(text)}
                customLabelStyle={styles.textInputLabel}
                customShadowStyle={{shadowOpacity: 0}}
                customTextBoxStyle={styles.customTextBox}
              />
              <TextInputComp
                label="Total Amount"
                value={amount}
                onChangeText={text => setAmount(text)}
                customLabelStyle={styles.textInputLabel}
                customShadowStyle={{shadowOpacity: 0}}
                customTextBoxStyle={[styles.customTextBox, {marginBottom: 0}]}
              />
              <View style={[commonStyles.flexRow, {marginBottom: hp(32)}]}>
                <Image source={icons.info} style={commonStyles.icon16} />
                <Text style={styles.totalAmountText}>
                  {'Total amount updates based on square footage selected.'}
                </Text>
              </View>
              <TextInputComp
                label="This event will repeat every month on:"
                value="11/12/2023"
                onChangeText={() => {}}
                customLabelStyle={styles.textInputLabel}
                customShadowStyle={{shadowOpacity: 0}}
                customTextBoxStyle={styles.customTextBox}
              />
            </View>
            <Text style={styles.paywithText}>{'Pay with'}</Text>
            <Wallet />
          </ScrollView>
        )}
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Invest Now"
          onPress={() => {}}
          buttonStyle={styles.btn}
          shadowStyle={{shadowOpacity: 0}}
        />
      </View>
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
    marginBottom: hp(12),
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
});
