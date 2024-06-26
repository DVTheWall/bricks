/* eslint-disable handle-callback-err */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import {colors, fontSize, hp, wp} from '../../utils';
import {removeAsyncStorage, resetStack} from '../../helpers/globalFunctions';
import {useDispatch, useSelector} from 'react-redux';
import {walletProfile} from '../../store/action/profileActions';
import Loader from '../../components/common/Loader';
import {SCREEN} from '../../utils/screenConstants';

const ListItem = ({onPress, title, iconName}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
      <Image source={iconName} style={styles.upChevronStyle} />
      <Text style={styles.listItemTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const Profile = () => {
  const {walletProfileData} = useSelector((state: any) => state.data);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const getWalletProfileData = () => {
    setIsLoading(true);
    const request = {
      // need to make it dynamic
      data: {customer: '9548456788'},
      onSuccess: (res: any | []) => {
        setIsLoading(false);
      },
      onFail: (err: any) => {
        setIsLoading(false);
      },
    };
    dispatch(walletProfile(request) as never);
  };

  useEffect(() => {
    getWalletProfileData();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getWalletProfileData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Loader visible={isLoading} />
      <Header
        title={'Profile'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <View style={styles.boxView}>
        <Text style={styles.userNameText}>
          {walletProfileData[0]?.customer_name}
        </Text>
      </View>

      <ScrollView
        // bounces={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.boxView}>
          <Text style={styles.boxTitleText}>{'Wallet'}</Text>
          <View style={styles.walletBoxView}>
            <View style={commonStyles.flexRow}>
              <Text style={styles.amountText}>
                {walletProfileData[0]?.wallet_amount
                  ? `₹${walletProfileData[0]?.wallet_amount}`
                  : '₹0.0'}
              </Text>
              <Image source={icons.arrowUp} style={styles.upChevronStyle} />
            </View>
            <Text style={styles.walletDescText}>
              {'Added 0.0% more last week'}
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
          <ListItem
            title={'Sign Out'}
            iconName={icons.logout}
            onPress={() => {
              removeAsyncStorage();
              resetStack(SCREEN.WELCOME);
            }}
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
