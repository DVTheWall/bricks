import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import FastImage from 'react-native-fast-image';

import Shadow from '../common/Shadow';
import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import {colors, fontSize, hp, wp} from '../../utils';

const OrderItemCard = ({item, onPress, isTopView, disabled}: any) => {
  return (
    <Shadow shadowStyle={styles.shadowStyle}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={styles.cardStyle}>
        {isTopView && (
          <View style={styles.cardTopView}>
            <View style={commonStyles.flexRow}>
              <View style={styles.imgView}>
                <Image source={icons.package} style={commonStyles.icon20} />
              </View>
              <Text style={styles.orderIdText}>{item?.orderId}</Text>
            </View>
            <View style={styles.statusView}>
              <Text style={styles.statusText}>{item?.status}</Text>
            </View>
          </View>
        )}
        <View style={styles.cardMiddleView}>
          <View style={styles.middleContainer}>
            <View style={commonStyles.flexRow}>
              <FastImage
                source={{uri: item?.profileURL}}
                style={styles.profileImg}
              />
              <Text style={styles.nameText}>{item?.customerName}</Text>
            </View>
            <View style={styles.verticalSeperator} />
            <View style={commonStyles.flexRow}>
              <Image source={icons.residential} style={commonStyles.icon20} />
              <Text style={styles.typeText}>{item?.propertyType}</Text>
            </View>
          </View>
          <View style={{...commonStyles.flexRow, marginTop: hp(12)}}>
            <Image
              source={icons.location}
              style={{...commonStyles.icon16, tintColor: colors.primary}}
            />
            <Text style={styles.addressText}>{item?.address}</Text>
          </View>
        </View>
        <View style={styles.cardBottomView}>
          <Text style={styles.areaText}>
            {`${item?.area} SQ.FT.`}
            <Text style={styles.builtUpText}>{'(Built Up)'}</Text>
          </Text>
          <Text style={styles.priceText}>{item?.price}</Text>
        </View>
      </TouchableOpacity>
    </Shadow>
  );
};

export default OrderItemCard;

const styles = StyleSheet.create({
  shadowStyle: {
    shadowRadius: 5,
    shadowOpacity: 0.08,
    shadowColor: colors.black,
    shadowOffset: {
      width: hp(4),
      height: hp(4),
    },
    paddingHorizontal: wp(16),
  },
  cardStyle: {
    overflow: 'hidden',
    borderWidth: wp(1),
    borderRadius: wp(8),
    marginBottom: hp(16),
    backgroundColor: colors.white,
    borderColor: colors.darkBorder,
  },
  cardTopView: {
    padding: wp(12),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.tabBg,
    justifyContent: 'space-between',
  },
  orderIdText: {
    marginLeft: wp(10),
    fontSize: fontSize(14),
    fontFamily: font.qBold,
    color: colors.lightBlack,
  },
  imgView: {
    width: wp(42),
    height: wp(42),
    borderWidth: wp(1),
    borderRadius: wp(6),
    alignItems: 'center',
    borderColor: '#EEEFF0',
    justifyContent: 'center',
    backgroundColor: colors.white,
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
  nameText: {
    marginLeft: wp(10),
    fontSize: fontSize(14),
    color: colors.lightBlack,
    fontFamily: font.qMedium,
  },
  typeText: {
    marginLeft: wp(10),
    fontSize: fontSize(12),
    color: colors.normalGrey,
    fontFamily: font.qMedium,
  },
  middleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImg: {
    width: wp(24),
    height: wp(24),
    borderRadius: wp(100),
  },
  verticalSeperator: {
    width: wp(1),
    height: hp(28),
    backgroundColor: colors.darkBorder,
  },
  addressText: {
    marginLeft: wp(4),
    fontSize: fontSize(12),
    color: colors.lightBlack,
    fontFamily: font.qMedium,
  },
  cardMiddleView: {
    padding: wp(12),
  },
  cardBottomView: {
    padding: wp(12),
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: wp(1),
    backgroundColor: '#FFF6F6',
    borderColor: colors.darkBorder,
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: fontSize(16),
    fontFamily: font.qBold,
    color: colors.greenNeon,
  },
  areaText: {
    fontSize: fontSize(12),
    color: colors.lightBlack,
    fontFamily: font.qSemiBold,
  },
  builtUpText: {
    fontSize: fontSize(10),
    color: colors.normalGrey,
  },
});
