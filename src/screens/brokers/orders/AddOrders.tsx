/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {font} from '../../../utils/fonts';
import {commonStyles} from '../../../styles/styles';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import {colors, fontSize, hp, wp} from '../../../utils';
import TextInputComp from '../../../components/common/TextInput';

const AddOrders = () => {
  const [property, setProperty] = useState('');
  const [customer, setCustomer] = useState('');
  const [sqft, setSqft] = useState('');
  const [perSqftAmount, setPerSqftAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [address, setAddresss] = useState('');

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Header
        isBackButton
        title={'Add Order'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <View style={commonStyles.flex}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          style={{
            paddingHorizontal: wp(16),
            paddingTop: hp(12),
          }}>
          <TextInputComp
            label={`Property`}
            value={property}
            onChangeText={text => setProperty(text)}
            customLabelStyle={styles.customLabelStyle}
            customTextBoxStyle={styles.customTextBoxStyle}
            customShadowStyle={styles.customShadowStyle}
            customInputStyle={styles.customInputStyle}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            label={`Customer`}
            value={customer}
            onChangeText={text => setCustomer(text)}
            customLabelStyle={styles.customLabelStyle}
            customTextBoxStyle={styles.customTextBoxStyle}
            customShadowStyle={styles.customShadowStyle}
            customInputStyle={styles.customInputStyle}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            label={`Sqft`}
            value={sqft}
            onChangeText={text => setSqft(text)}
            customLabelStyle={styles.customLabelStyle}
            customTextBoxStyle={styles.customTextBoxStyle}
            customShadowStyle={styles.customShadowStyle}
            customInputStyle={styles.customInputStyle}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            label={`Per Sqft Amount`}
            value={perSqftAmount}
            onChangeText={text => setPerSqftAmount(text)}
            customLabelStyle={styles.customLabelStyle}
            customTextBoxStyle={styles.customTextBoxStyle}
            customShadowStyle={styles.customShadowStyle}
            customInputStyle={styles.customInputStyle}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            label={`Total Amount`}
            value={totalAmount}
            onChangeText={text => setTotalAmount(text)}
            customLabelStyle={styles.customLabelStyle}
            customTextBoxStyle={styles.customTextBoxStyle}
            customShadowStyle={styles.customShadowStyle}
            customInputStyle={styles.customInputStyle}
            // error={`You're not register please sign up`}
          />
          <TextInputComp
            label={`Address`}
            value={address}
            multiline={true}
            onChangeText={text => setAddresss(text)}
            customLabelStyle={styles.customLabelStyle}
            customTextBoxStyle={styles.addressTextBoxStyle}
            customShadowStyle={styles.customShadowStyle}
            customInputStyle={styles.addressInputStyle}
            // error={`You're not register please sign up`}
          />
        </KeyboardAwareScrollView>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title={'Send Order Request'}
          textStyle={styles.btnText}
          buttonStyle={styles.btnStyle}
          shadowStyle={{shadowOpacity: 0}}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default AddOrders;

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
    paddingTop: hp(24),
    paddingBottom: hp(43),
    paddingHorizontal: wp(16),
  },
  customLabelStyle: {
    color: colors.grey,
    marginBottom: hp(8),
    fontSize: fontSize(16),
    fontFamily: font.qMedium,
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
  customInputStyle: {
    fontFamily: font.qMedium,
  },
  addressTextBoxStyle: {
    height: null,
    borderRadius: wp(6),
    borderColor: colors.darkBorder,
  },
  addressInputStyle: {
    maxHeight: hp(150),
    minHeight: hp(100),
    paddingVertical: wp(12),
    fontFamily: font.qMedium,
  },
});
