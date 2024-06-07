/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  SafeAreaView,
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
import Wallet from '../../components/common/Wallet';
import {icons} from '../../utils/icons';
import {savedCardList} from '../../utils/dataConstants';
import Button from '../../components/common/Button';

type Props = {};

const Payment = ({navigation}: any) => {
  const [cardList, setCardList] = useState(savedCardList);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setHidden(false);
    });

    return unsubscribe;
  }, [navigation]);

  const renderCardList = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let updateCardList = cardList?.map(obj => {
            if (item?.id === obj?.id) {
              return {...obj, isSelected: true};
            }
            return {...obj, isSelected: false};
          });
          setCardList(updateCardList);
        }}
        style={styles.cardListItemView}>
        <View style={commonStyles.flexRow}>
          <View
            style={{
              ...styles.radioBorder,
              borderColor: item?.isSelected ? colors.primary : colors.yBlack,
            }}>
            {item?.isSelected && <View style={styles.activeRadio} />}
          </View>
          <Text style={styles.cardNumText}>{item?.cardNum}</Text>
        </View>
        <Image source={icons.rightChevron} style={commonStyles.icon24} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Header
        isBackButton
        title={'Payment'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <View style={styles.walletContainer}>
        <Text style={styles.titleText}>{'Bricks Wallet'}</Text>
        <Wallet />
      </View>
      <View style={styles.bottomBtnContainer}>
        <Button
          title="Pay Now"
          onPress={() => {}}
          buttonStyle={styles.btn}
          shadowStyle={{shadowOpacity: 0}}
        />
      </View>
      <SafeAreaView />
      {/* <View style={styles.btnContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.btnStyle}>
          <Image
            source={icons.plus}
            style={[commonStyles.icon16, {tintColor: colors.lightBlack}]}
          />
          <Text style={styles.btnText}>{'Add money'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.btnStyle}>
          <Image source={icons.miniTrans} style={commonStyles.icon16} />
          <Text style={styles.btnText}>{'Withdraw'}</Text>
        </TouchableOpacity>
      </View> */}
      {/* <Text style={styles.titleText}>{'Credit and Debit Card'}</Text>
      <View>
        <FlatList data={cardList} renderItem={renderCardList} />
        <TouchableOpacity style={styles.addPaymentBtn}>
          <Image
            style={[commonStyles.icon20, {tintColor: colors.primary}]}
            source={icons.plus}
          />
          <Text style={styles.addPaymentText}>{'Add payment method'}</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  customTitleStyle: {
    fontSize: fontSize(24),
    fontFamily: font.semiBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
  walletContainer: {
    borderTopWidth: wp(0.5),
    borderColor: colors.borderColor,
    marginTop: hp(8),
    flex: 1,
  },
  titleText: {
    fontFamily: font.semiBold,
    fontSize: fontSize(12),
    lineHeight: hp(15),
    marginLeft: wp(16),
    marginTop: hp(27),
    color: colors.mediumGrey,
    marginBottom: hp(12),
  },
  btnContainer: {
    height: hp(32),
    marginTop: hp(30),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(16),
    borderRadius: wp(100),
    backgroundColor: colors.xLightPrimary,
    height: '100%',
    marginHorizontal: wp(6),
  },
  btnText: {
    fontFamily: font.semiBold,
    fontSize: fontSize(12),
    color: colors.lightBlack,
    marginLeft: wp(8),
  },
  activeRadio: {
    height: wp(12),
    width: wp(12),
    borderRadius: wp(100),
    backgroundColor: colors.primary,
  },
  radioBorder: {
    height: wp(20),
    width: wp(20),
    borderRadius: wp(100),
    borderWidth: wp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardListItemView: {
    paddingHorizontal: wp(16),
    paddingVertical: wp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: wp(0.5),
    borderColor: colors.borderColor,
  },
  cardNumText: {
    fontFamily: font.semiBold,
    fontSize: fontSize(16),
    color: colors.lightBlack,
    marginLeft: wp(16),
  },
  addPaymentBtn: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(25),
  },
  addPaymentText: {
    fontFamily: font.semiBold,
    fontSize: fontSize(14),
    color: colors.primary,
  },
  bottomBtnContainer: {
    paddingHorizontal: wp(15),
    paddingTop: hp(8),
    paddingBottom: hp(24),
  },
  btn: {
    borderRadius: wp(4),
  },
});
