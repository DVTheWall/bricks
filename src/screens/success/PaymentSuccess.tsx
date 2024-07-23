import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, fontSize, hp, wp} from '../../utils';
import {font} from '../../utils/fonts';
import LottieViewer from '../../components/common/LottieViewer';
import {lotties} from '../../utils/icons';
import {SCREEN} from '../../utils/screenConstants';
import {resetStack} from '../../helpers/globalFunctions';

const PaymentSuccess = ({route, navigation}: any) => {
  const {orderID, isSucceed} = route?.params ?? '';
  console.log('orderIDorderID======', orderID, '----', isSucceed);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={colors.xDarkGreen}
        barStyle={'light-content'}
      />
      <View>
        <LottieViewer
          source={isSucceed ? lotties.success : lotties.fail}
          lottieStyle={styles.lottieStyle}
        />
      </View>
      <Text style={styles.titleText}>
        {isSucceed ? 'Payment Successful' : 'Payment Failed'}
      </Text>
      <Text style={styles.descText}>
        {isSucceed
          ? 'Your transaction has successfully been completed.\nCheck more details of this transaction in your transaction history.'
          : 'Your transaction has been failed.\nCheck more details of this transaction in your transaction history.'}
      </Text>
      <Text style={styles.refText}>{'Reference ID'}</Text>
      <Text style={styles.idText}>{orderID}</Text>
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>{'Continue Investing'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dashboardBtn}
        onPress={() => resetStack(SCREEN.BOTTOMTABS)}>
        <Text style={{...styles.btnText, color: colors.white}}>
          {'Dashboard'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.xDarkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(16),
  },
  lottieStyle: {
    height: wp(140),
    width: wp(140),
  },
  titleText: {
    fontSize: fontSize(24),
    fontFamily: font.bold,
    color: colors.white,
    marginTop: hp(50),
  },
  descText: {
    textAlign: 'center',
    marginHorizontal: wp(20),
    fontSize: fontSize(14),
    fontFamily: font.regular,
    color: colors.white,
    marginTop: hp(16),
  },
  continueBtn: {
    backgroundColor: colors.white,
    paddingVertical: hp(16),
    borderRadius: wp(4),
    width: '100%',
    alignItems: 'center',
    marginTop: hp(28),
  },
  dashboardBtn: {
    paddingVertical: hp(16),
    borderRadius: wp(4),
    width: '100%',
    alignItems: 'center',
    marginTop: hp(16),
    borderWidth: wp(1),
    borderColor: colors.liteWhite,
  },
  btnText: {
    fontSize: fontSize(16),
    fontFamily: font.bold,
    color: colors.black,
  },
  refText: {
    fontSize: fontSize(14),
    fontFamily: font.medium,
    color: colors.white,
    textDecorationLine: 'underline',
    marginTop: hp(16),
  },
  idText: {
    fontSize: fontSize(13),
    fontFamily: font.semiBold,
    color: colors.white,
  },
});
