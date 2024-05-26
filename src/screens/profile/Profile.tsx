import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import {colors, fontSize, hp, wp} from '../../utils';

const ListItem = ({onPress, title, iconName}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
      <Image source={iconName} style={styles.upChevronStyle} />
      <Text style={styles.listItemTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const Profile = () => {
  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Header
        title={'Profile'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <View style={styles.boxView}>
        <Text style={styles.userNameText}>{'@akshat.ybl234'}</Text>
      </View>

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.boxView}>
          <Text style={styles.boxTitleText}>{'Wallet'}</Text>
          <View style={styles.walletBoxView}>
            <View style={commonStyles.flexRow}>
              <Text style={styles.amountText}>{'₹5000'}</Text>
              <Image source={icons.arrowUp} style={styles.upChevronStyle} />
            </View>
            <Text style={styles.walletDescText}>
              {'Added 0.3% more last week'}
            </Text>
            <View style={styles.walletBtnContainer}>
              <Button
                title="Add money"
                onPress={() => {}}
                buttonStyle={styles.addMoneyBtn}
                textStyle={styles.addMoneyText}
              />
              <View style={styles.spaceBtwnBtn} />
              <Button
                title="Withdraw"
                onPress={() => {}}
                buttonStyle={{
                  ...styles.addMoneyBtn,
                  backgroundColor: colors.mediumDarkBorder,
                }}
                textStyle={{...styles.addMoneyText, color: colors.semiGrey}}
              />
            </View>
          </View>
        </View>

        <View style={styles.boxView}>
          <Text style={styles.boxTitleText}>{'Account'}</Text>
          <ListItem
            title={'Personal Details'}
            iconName={icons.userSquare}
            onPress={() => {}}
          />
          <ListItem
            title={'Accounts'}
            iconName={icons.user}
            onPress={() => {}}
          />
          <ListItem
            title={'Manage KYC'}
            iconName={icons.cardTick}
            onPress={() => {}}
          />
          <ListItem
            title={'Security'}
            iconName={icons.shieldTick}
            onPress={() => {}}
          />
        </View>

        <View style={styles.boxView}>
          <Text style={styles.boxTitleText}>{'Preferences'}</Text>
          <ListItem
            title={'Notifications'}
            iconName={icons.notificationBing}
            onPress={() => {}}
          />
        </View>

        <View style={styles.boxView}>
          <Text style={styles.boxTitleText}>{'Help'}</Text>
          <ListItem
            title={'Contact Us'}
            iconName={icons.headphone}
            onPress={() => {}}
          />
        </View>
        <View style={styles.footerStyle} />
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customTitleStyle: {
    lineHeight: hp(36),
    letterSpacing: -0.5,
    fontSize: fontSize(24),
    fontFamily: font.semiBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
  userNameText: {
    marginLeft: wp(16),
    lineHeight: hp(21),
    color: colors.black,
    letterSpacing: -0.5,
    fontSize: fontSize(16),
    fontFamily: font.semiBold,
  },
  addMoneyBtn: {
    height: null,
    marginTop: hp(5),
    paddingVertical: wp(8),
    paddingHorizontal: wp(8),
  },
  addMoneyText: {
    fontSize: fontSize(11),
    fontFamily: font.semiBold,
  },
  spaceBtwnBtn: {
    width: wp(30),
  },
  boxView: {
    paddingBottom: hp(24),
    borderBottomWidth: wp(1),
    borderColor: colors.borderColor,
  },
  boxTitleText: {
    padding: wp(16),
    lineHeight: hp(13),
    color: colors.darkGrey,
    fontSize: fontSize(10),
    fontFamily: font.semiBold,
  },
  walletBoxView: {
    alignItems: 'center',
  },
  amountText: {
    lineHeight: hp(40),
    color: colors.green,
    fontSize: fontSize(32),
    fontFamily: font.semiBold,
  },
  upChevronStyle: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  walletDescText: {
    lineHeight: hp(14),
    fontSize: fontSize(11),
    color: colors.mediumGrey,
    fontFamily: font.semiBold,
  },
  walletBtnContainer: {
    marginTop: hp(16),
    alignItems: 'center',
    flexDirection: 'row',
  },
  listItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: hp(16),
    paddingHorizontal: wp(24),
  },
  listItemTitle: {
    paddingLeft: wp(24),
    color: colors.black,
    letterSpacing: -0.5,
    fontSize: fontSize(13),
    fontFamily: font.semiBold,
  },
  footerStyle: {
    height: hp(40),
  },
});
