/* eslint-disable react-native/no-inline-styles */
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
  RefreshControl,
  TouchableOpacity,
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
import {LOGOUT} from '../../store/types';
import ProfileListItem from '../../components/profile/ProfileListItem';
import Modal from 'react-native-modal';
import TextInputComp from '../../components/common/TextInput';
import {
  addMoney,
  addMoneyReject,
  withdrawMoney,
} from '../../store/action/transactionActions';
import axios from 'axios';
import {CFPaymentGatewayService} from 'react-native-cashfree-pg-sdk';
import {CFEnvironment, CFSession} from 'cashfree-pg-api-contract';

const Profile = ({navigation}: any) => {
  const {walletProfileData} = useSelector((state: any) => state.data);
  const {userData} = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isContactUsVisible, setIsContactUsVisible] = useState(false);
  const [moneyInputSheet, setMoneyInputSheet] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isNotificationON, setIsNotificationON] = useState(false);
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('Add');

  useEffect(() => {
    getWalletProfileData();
  }, []);

  const getWalletProfileData = () => {
    setIsLoading(true);
    const request = {
      data: {},
      onSuccess: (res: any | []) => {
        setIsLoading(false);
      },
      onFail: (err: any) => {
        setIsLoading(false);
      },
    };
    dispatch(walletProfile(request) as never);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getWalletProfileData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    CFPaymentGatewayService.setCallback({
      onVerify(orderID: string): void {
        let dataSuccess = {
          orderID: orderID,
          isSucceed: true,
          title: 'Payment Successful',
          desc: 'Your transaction has successfully been completed.\nCheck more details of this transaction in your transaction history.',
          isWithdrawal: false,
        };
        //@ts-ignore
        navigation.navigate(SCREEN.PAYMENTSUCCESS, dataSuccess);
        // setIsLoading(true);
        const request = {
          data: {
            amount: Number(amount),
            payment_reference_id: orderID,
          },
          onSuccess: (res: any | []) => {
            getWalletProfileData();
            // setIsLoading(false);
            setAmount('');
          },
          onFail: (err: any) => {
            // setIsLoading(false);
            setAmount('');
          },
        };
        dispatch(addMoney(request) as never);
      },
      //@ts-ignore
      onError(error: CFErrorResponse, orderID: string): void {
        let dataFailed = {
          orderID: orderID,
          isSucceed: false,
          title: 'Payment Failed',
          desc: 'Your transaction has been failed.\nCheck more details of this transaction in your transaction history.',
          isWithdrawal: false,
        };
        navigation.navigate(SCREEN.PAYMENTSUCCESS, dataFailed);
        const request = {
          data: {
            amount: Number(amount),
            payment_reference_id: orderID,
          },
          onSuccess: (res: any | []) => {
            getWalletProfileData();
            // setIsLoading(false);
            setAmount('');
          },
          onFail: (err: any) => {
            // setIsLoading(false);
            setAmount('');
          },
        };
        dispatch(addMoneyReject(request) as never);
      },
    });
    return () => {
      CFPaymentGatewayService.removeCallback();
    };
  }, [amount]);

  const onAddMoneyPress = async () => {
    setIsLoading(true);
    let data = JSON.stringify({
      order_amount: amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: 'USER123',
        customer_name: userData?.full_name,
        customer_email: userData?.email,
        customer_phone: `+91${userData?.mobile_no}`,
      },
      order_meta: {
        return_url: 'https://b8af79f41056.eu.ngrok.io?order_id=order_123',
      },
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://sandbox.cashfree.com/pg/orders',
      headers: {
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: data,
    };

    let payment_session_id: any;
    let order_id: any;

    await axios
      .request(config)
      .then(response => {
        payment_session_id = response?.data?.payment_session_id;
        order_id = response?.data?.order_id;
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });

    if (payment_session_id) {
      setMoneyInputSheet(false);
      try {
        const session = new CFSession(
          payment_session_id,
          order_id,
          CFEnvironment.SANDBOX,
        );
        setTimeout(() => {
          //@ts-ignore
          CFPaymentGatewayService.doWebPayment(JSON.stringify(session));
        }, 500);
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };

  const onWithdrawPress = () => {
    setIsLoading(true);
    const request = {
      data: {
        amount: Number(amount),
        payment_reference_id: '#28189165',
      },
      onSuccess: (res: any | []) => {
        setIsLoading(false);
        getWalletProfileData();
        setMoneyInputSheet(false);
        setAmount('');

        let dataSuccess = {
          orderID: res?.data?.data?.withdrawal_money_id,
          isSucceed: true,
          title: 'Withdrawal Successful',
          desc: res?.data?.message,
          isWithdrawal: true,
        };
        //@ts-ignore
        navigation.navigate(SCREEN.PAYMENTSUCCESS, dataSuccess);
      },
      onFail: (err: any, orderID: string) => {
        setIsLoading(false);
        setMoneyInputSheet(false);
        setAmount('');
        let dataFailed = {
          orderID: orderID,
          isSucceed: false,
          title: 'Withdrwal Failed',
          desc: 'Your transaction has been failed.\nCheck more details of this transaction in your transaction history.',
          isWithdrawal: true,
        };
        navigation.navigate(SCREEN.PAYMENTSUCCESS, dataFailed);
      },
    };
    //@ts-ignore
    dispatch(withdrawMoney(request) as never);
  };

  // const onMoneyTrasfferPress = () => {
  //   setIsLoading(true);
  //   const request = {
  //     data: {
  //       amount: Number(amount),
  //       payment_reference_id: '#28189165',
  //     },
  //     onSuccess: (res: any | []) => {
  //       setIsLoading(false);
  //       getWalletProfileData();
  //       setMoneyInputSheet(false);
  //       setAmount('');
  //     },
  //     onFail: (err: any) => {
  //       setIsLoading(false);
  //       setMoneyInputSheet(false);
  //       setAmount('');
  //     },
  //   };
  //   dispatch(
  //     transactionType === 'Add'
  //       ? (addMoney(request) as never)
  //       : (withdrawMoney(request) as never),
  //   );
  // };

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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.boxView}>
          <Text style={styles.boxTitleText}>{'Wallet'}</Text>
          <View style={styles.walletBoxView}>
            <View style={commonStyles.flexRow}>
              <Text
                style={{
                  ...styles.amountText,
                  color: walletProfileData[0]?.wallet_amount
                    ? colors.green
                    : colors.red,
                }}>
                {walletProfileData[0]?.wallet_amount
                  ? `₹${walletProfileData[0]?.wallet_amount}`
                  : '₹0.0'}
              </Text>
              <Image
                source={icons.arrowUp}
                style={{
                  ...styles.upChevronStyle,
                  tintColor: walletProfileData[0]?.wallet_amount
                    ? colors.green
                    : colors.red,
                }}
              />
            </View>
            <Text style={styles.walletDescText}>
              {'Added 0.0% more last week'}
            </Text>
            <View style={styles.walletBtnContainer}>
              <Button
                title="Add money"
                onPress={() => {
                  setTransactionType('Add');
                  setMoneyInputSheet(true);
                }}
                buttonStyle={styles.addMoneyBtn}
                textStyle={styles.addMoneyText}
              />
              <View style={styles.spaceBtwnBtn} />
              <Button
                title="Withdraw"
                onPress={() => {
                  setTransactionType('Withdraw');
                  setMoneyInputSheet(true);
                }}
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
          <ProfileListItem
            title={'Personal Details'}
            iconName={icons.userSquare}
            onPress={() => {}}
          />
          <ProfileListItem
            title={'Accounts'}
            iconName={icons.user}
            onPress={() => {}}
          />
          <ProfileListItem
            title={'Manage KYC'}
            iconName={icons.cardTick}
            onPress={() => {}}
          />
          {/* <ProfileListItem
            title={'Security'}
            iconName={icons.shieldTick}
            onPress={() => {}}
          /> */}
          <ProfileListItem
            title={'Sign Out'}
            iconName={icons.logout}
            onPress={() => {
              dispatch({type: LOGOUT});
              removeAsyncStorage();
              resetStack(SCREEN.WELCOME);
            }}
          />
        </View>

        <View style={styles.boxView}>
          <Text style={styles.boxTitleText}>{'Preferences'}</Text>
          <ProfileListItem
            title={'Notifications'}
            iconName={icons.notificationBing}
            onPress={() => {}}
            switchValue={isNotificationON}
            onSwitchToggle={() => setIsNotificationON(!isNotificationON)}
          />
        </View>

        <View style={styles.boxView}>
          <Text style={styles.boxTitleText}>{'Help'}</Text>
          <ProfileListItem
            title={'Contact Us'}
            iconName={icons.headphone}
            onPress={() => setIsContactUsVisible(true)}
          />
        </View>
        <View style={styles.footerStyle} />
      </ScrollView>
      <Modal
        isVisible={moneyInputSheet}
        style={styles.modalAmount}
        onBackdropPress={() => setMoneyInputSheet(false)}
        avoidKeyboard>
        <View style={styles.containerAmountSheet}>
          <TextInputComp
            value={amount}
            autoFocus
            onChangeText={text => setAmount(text)}
            label={`Enter amount you want to ${transactionType}`}
            maxLength={8}
            keyboardType="number-pad"
          />
          <Button
            title={`${transactionType} Money`}
            onPress={
              transactionType === 'Add' ? onAddMoneyPress : onWithdrawPress
            }
            loader={isLoading}
          />
        </View>
      </Modal>
      <Modal
        isVisible={isContactUsVisible}
        onBackdropPress={() => setIsContactUsVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{'Contact Us'}</Text>
          <Text style={styles.modalContentText}>
            {'Email us on:  '}
            <Text style={{color: colors.blue}}>{'abcd@email.com'}</Text>
          </Text>
          <Text style={styles.modalContentText}>
            {'Call us on:  '}
            <Text style={{color: colors.blue}}>{'9898875465'}</Text>
          </Text>
          <TouchableOpacity
            style={{padding: wp(8), alignSelf: 'center'}}
            onPress={() => setIsContactUsVisible(false)}>
            <Text style={{...styles.modalContentText, color: colors.primary}}>
              {'Close'}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  footerStyle: {
    height: hp(40),
  },
  modalView: {
    // alignItems: 'center',
    borderRadius: wp(12),
    // paddingVertical: hp(10),
    padding: hp(16),
    backgroundColor: colors.white,
  },
  modalTitle: {
    textAlign: 'center',
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: font.semiBold,
    marginBottom: hp(10),
    textDecorationLine: 'underline',
  },
  modalContentText: {
    fontSize: fontSize(14),
    fontFamily: font.regular,
    color: colors.otpInputBorder,
    paddingVertical: hp(3),
  },
  modalAmount: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  containerAmountSheet: {
    backgroundColor: colors.white,
    padding: wp(20),
    borderTopLeftRadius: wp(20),
    borderTopRightRadius: wp(20),
  },
});
