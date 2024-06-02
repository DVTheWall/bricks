/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import {font} from '../../../utils/fonts';
import {icons} from '../../../utils/icons';
import {commonStyles} from '../../../styles/styles';
import Header from '../../../components/common/Header';
import Shadow from '../../../components/common/Shadow';
import Button from '../../../components/common/Button';
import {colors, fontSize, hp, wp} from '../../../utils';

const CustomerDetails = ({route}: any) => {
  const {data} = route?.params;

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Header
        isBackButton
        title={'Customer Details'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <View style={commonStyles.flex}>
        <Shadow shadowStyle={styles.cardShadow}>
          <View style={styles.profileContainer}>
            <View style={styles.imgContainer}>
              <View style={styles.imgOuterView}>
                <View style={styles.imgBorderView}>
                  <FastImage
                    source={{uri: data?.profileURL}}
                    style={styles.profileImgStyle}
                  />
                </View>
              </View>
              <Text style={styles.nameText}>{data?.name}</Text>
            </View>
            <View style={styles.profileBottomContainer}>
              <View style={commonStyles.flexRow}>
                <Image source={icons.call} style={commonStyles.icon16} />
                <Text style={styles.detailText}>{data?.phoneNumber}</Text>
              </View>
              <View style={{...commonStyles.flexRow, marginVertical: hp(12)}}>
                <Image source={icons.mail} style={commonStyles.icon16} />
                <Text style={styles.detailText}>{data?.email}</Text>
              </View>
              <View style={{...commonStyles.flexRow, alignItems: 'flex-start'}}>
                <Image
                  source={icons.location}
                  style={{...commonStyles.icon16, tintColor: colors.primary}}
                />
                <Text style={styles.detailText}>{data?.address}</Text>
              </View>
            </View>
          </View>
        </Shadow>
        <Shadow shadowStyle={styles.cardShadow}>
          <LinearGradient
            colors={['rgba(255, 222, 252, 0.5)', 'rgba(255, 252, 154, 0.5)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientView}>
            <View style={commonStyles.flexRow}>
              <Shadow shadowStyle={styles.approvedTagShadow}>
                <View style={styles.approvedTagView}>
                  <Image
                    source={icons.searchProfile}
                    style={commonStyles.icon24}
                  />
                </View>
              </Shadow>
              <View style={{marginLeft: wp(16)}}>
                <Text style={styles.kycText}>{'EKYC'}</Text>
                <Text style={styles.kycDateText}>{'24 March ,2024'}</Text>
              </View>
            </View>
            <View style={styles.tagView}>
              <Text style={styles.approvedText}>{'Approved'}</Text>
            </View>
          </LinearGradient>
        </Shadow>
      </View>
      <View style={styles.btnContainer}>
        <Button
          title="Buy Now"
          onPress={() => {}}
          buttonStyle={styles.btn}
          textStyle={styles.btnText}
          shadowStyle={{shadowOpacity: 0}}
        />
      </View>
      <SafeAreaView />
    </View>
  );
};

export default CustomerDetails;

const styles = StyleSheet.create({
  customTitleStyle: {
    fontSize: fontSize(24),
    fontFamily: font.qBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
  cardShadow: {
    shadowRadius: 5,
    shadowOpacity: 0.05,
    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
  },
  approvedTagShadow: {
    shadowRadius: 7,
    shadowOpacity: 0.7,
    shadowColor: '#00D0524D',
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  profileContainer: {
    marginTop: hp(24),
    borderWidth: wp(1),
    overflow: 'hidden',
    borderRadius: wp(8),
    marginHorizontal: wp(16),
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
  },
  imgContainer: {
    alignItems: 'center',
    paddingVertical: hp(24),
  },
  imgOuterView: {
    width: wp(128),
    height: wp(128),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: 'rgba(243, 102, 103, 0.12)',
  },
  imgBorderView: {
    width: wp(110),
    height: wp(110),
    alignItems: 'center',
    borderWidth: wp(2.5),
    borderRadius: wp(100),
    justifyContent: 'center',
    borderColor: colors.primary,
  },
  profileImgStyle: {
    width: wp(92),
    height: wp(92),
    borderRadius: wp(100),
  },
  nameText: {
    marginTop: hp(8),
    fontSize: fontSize(18),
    fontFamily: font.qBold,
    color: colors.lightBlack,
  },
  detailText: {
    marginLeft: wp(6),
    fontSize: fontSize(14),
    color: colors.lightBlack,
    fontFamily: font.qMedium,
  },
  profileBottomContainer: {
    paddingVertical: hp(12),
    paddingHorizontal: wp(16),
    backgroundColor: colors.profileBottomBg,
  },
  btnContainer: {
    paddingVertical: hp(8),
    paddingHorizontal: wp(15),
  },
  btn: {
    borderRadius: wp(4),
  },
  btnText: {
    fontSize: fontSize(16),
    fontFamily: font.qBold,
  },
  gradientView: {
    padding: wp(16),
    marginTop: hp(24),
    borderWidth: wp(1),
    borderRadius: wp(8),
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(16),
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
    justifyContent: 'space-between',
  },
  approvedTagView: {
    width: wp(44),
    height: wp(44),
    borderWidth: wp(1),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor: 'rgba(0, 208, 82, 0.3)',
  },
  kycText: {
    fontSize: fontSize(16),
    color: colors.lightBlack,
    fontFamily: font.semiBold,
  },
  kycDateText: {
    marginTop: hp(6),
    color: colors.grey,
    fontSize: fontSize(14),
    fontFamily: font.qMedium,
  },
  approvedText: {
    fontSize: fontSize(16),
    color: colors.greenNeon,
    fontFamily: font.qSemiBold,
  },
  tagView: {
    borderRadius: wp(100),
    paddingVertical: hp(6),
    paddingHorizontal: wp(8),
    backgroundColor: 'rgba(0, 183, 72, 0.16)',
  },
});
