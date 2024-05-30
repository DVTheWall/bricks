/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {commonStyles} from '../../styles/styles';
import Header from '../../components/common/Header';
import {colors, fontSize, hp, wp} from '../../utils';
import {font} from '../../utils/fonts';
import Shadow from '../../components/common/Shadow';
import Button from '../../components/common/Button';
import {SCREEN} from '../../utils/screenConstants';
import TextInputComp from '../../components/common/TextInput';
import {icons} from '../../utils/icons';
import Wallet from '../../components/common/Wallet';

type Props = {};

const InvestScreen = ({navigation}: any) => {
  const [isMonthlyActive, setIsMonthlyActive] = useState(false);
  const [sqft, setSqft] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setHidden(false);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={commonStyles.container}>
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

      <View style={{flex: 1, marginTop: hp(30)}}>
        {isMonthlyActive && (
          <ScrollView style={{}}>
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
                <Image
                  source={icons.info}
                  style={{height: wp(16), width: wp(16), resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    fontFamily: font.semiBold,
                    fontSize: fontSize(10),
                    marginLeft: wp(5),
                    color: colors.mediumGrey,
                  }}>
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
            <Text
              style={{
                fontFamily: font.semiBold,
                fontSize: fontSize(12),
                lineHeight: hp(15),
                marginLeft: wp(16),
                marginTop: hp(27),
                color: colors.mediumGrey,
                marginBottom: hp(12),
              }}>
              {'Pay with'}
            </Text>
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
    lineHeight: hp(36),
    fontSize: fontSize(24),
    fontFamily: font.semiBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
  tabContainer: {
    height: hp(44),
    marginHorizontal: wp(16),
    backgroundColor: colors.tabBg,
    marginTop: hp(20),
    borderRadius: wp(8),
    padding: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: wp(6),
  },
  tabText: {
    fontFamily: font.semiBold,
    fontSize: fontSize(14),
  },
  tabSeperator: {
    height: hp(20),
    width: wp(1),
    backgroundColor: colors.white,
    marginHorizontal: wp(12),
  },
  btnContainer: {
    paddingHorizontal: wp(15),
    paddingVertical: hp(8),
  },
  btn: {
    borderRadius: wp(4),
  },
  textInputLabel: {
    fontSize: fontSize(12),
    lineHeight: hp(15),
    color: colors.mediumGrey,
  },
  customTextBox: {
    borderRadius: wp(4),
    borderColor: colors.borderColor,
    marginBottom: hp(12),
  },
  inputContainer: {
    borderBottomWidth: wp(0.5),
    borderColor: colors.borderColor,
    paddingHorizontal: wp(16),
  },
});
