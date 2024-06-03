/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {font} from '../../../utils/fonts';
import {icons} from '../../../utils/icons';
import {commonStyles} from '../../../styles/styles';
import Header from '../../../components/common/Header';
import Button from '../../../components/common/Button';
import {colors, fontSize, hp, isIos, wp} from '../../../utils';
import OrderItemCard from '../../../components/orders/OrderItemCard';

const OrderDetails = ({route}: any) => {
  const {data} = route?.params;

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Header
        isBackButton
        title={'Order Details'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <View style={{...styles.bgView, right: 0}}>
        <Image source={icons.orderBg} style={styles.bgIcon} />
      </View>
      <View style={{...styles.bgView, left: 0, transform: [{scaleX: -1}]}}>
        <Image source={icons.orderBg} style={styles.bgIcon} />
      </View>
      <View style={styles.packageImgView}>
        <Image source={icons.package} style={styles.packageIcon} />
      </View>
      <View style={styles.orderIdView}>
        <Text style={styles.orderIdText}>{data?.orderId}</Text>
        <View style={styles.statusView}>
          <Text style={styles.statusText}>{data?.status}</Text>
        </View>
      </View>
      <OrderItemCard item={data} disabled />
      <LinearGradient
        colors={['rgba(251, 176, 64, 1)', 'rgba(243, 102, 103, 1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradientBorder}>
        <View style={styles.bottomCardView}>
          <View style={commonStyles.flexRow}>
            <Image source={icons.timer} style={commonStyles.icon16} />
            <Text style={styles.timerText}>{'Order Timer'}</Text>
          </View>
          <View style={styles.flexRateContainer}>
            <View style={styles.flexRateView}>
              <View style={commonStyles.flexRow}>
                <Image source={icons.goldCoins} style={commonStyles.icon16} />
                <Text style={styles.flexText}>{'Flex Rate'}</Text>
              </View>
              <Text style={styles.flexRateText}>{'₹52.15 lac'}</Text>
            </View>
            <View style={styles.verticalSeperator} />
            <View style={styles.flexRateView}>
              <View style={commonStyles.flexRow}>
                <Image source={icons.clock} style={commonStyles.icon16} />
                <Text style={styles.flexText}>{'Order time'}</Text>
              </View>
              <Text style={{...styles.flexRateText, color: colors.lightBlack}}>
                {'5hrs'}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalSeperator} />
          <Button
            title="Cancel this order"
            onPress={() => {}}
            shadowStyle={{shadowOpacity: 0}}
            buttonStyle={{height: hp(38), borderRadius: wp(4)}}
            textStyle={{fontFamily: font.qBold}}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  customTitleStyle: {
    fontSize: fontSize(24),
    fontFamily: font.qBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
  statusView: {
    borderRadius: wp(100),
    paddingVertical: hp(6),
    paddingHorizontal: wp(8),
    backgroundColor: '#DEF2E0',
  },
  statusText: {
    fontSize: fontSize(12),
    color: colors.greenNeon,
    fontFamily: font.qSemiBold,
  },
  orderIdText: {
    marginRight: wp(6),
    fontSize: fontSize(14),
    fontFamily: font.qBold,
    color: colors.lightBlack,
  },
  bgView: {
    position: 'absolute',
    top: isIos ? hp(70) : hp(15),
  },
  gradientBorder: {
    padding: wp(1),
    marginTop: hp(8),
    overflow: 'hidden',
    borderRadius: wp(8),
    marginHorizontal: wp(16),
  },
  orderIdView: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: hp(24),
  },
  packageImgView: {
    width: wp(94),
    height: wp(94),
    marginTop: hp(24),
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: wp(2.5),
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor: colors.darkBorder,
  },
  bgIcon: {
    width: wp(306),
    height: hp(315),
  },
  packageIcon: {
    width: wp(56),
    height: wp(56),
    resizeMode: 'contain',
  },
  bottomCardView: {
    padding: wp(16),
    borderRadius: wp(7),
    backgroundColor: colors.white,
  },
  timerText: {
    color: '#222B45',
    marginLeft: wp(4),
    fontSize: fontSize(12),
    fontFamily: font.pMedium,
  },
  flexText: {
    color: '#6B6D7C',
    marginLeft: wp(6),
    fontSize: fontSize(12),
    fontFamily: font.pRegular,
  },
  flexRateText: {
    fontSize: fontSize(12),
    color: colors.greenNeon,
    fontFamily: font.pMedium,
  },
  flexRateContainer: {
    height: hp(48),
    marginTop: hp(12),
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexRateView: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verticalSeperator: {
    width: wp(1),
    height: hp(42),
    backgroundColor: '#F1F3F5',
  },
  horizontalSeperator: {
    height: hp(1),
    width: '100%',
    marginVertical: hp(12),
    backgroundColor: '#F1F3F5',
  },
});
