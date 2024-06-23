/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import FastImage from 'react-native-fast-image';

import Button from '../common/Button';
import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import {colors, fontSize, hp, wp} from '../../utils';

const SellingPropertyItem = ({item, onBuyNowPress}: any) => {
  return (
    <Pressable style={styles.container}>
      <FastImage
        source={{
          uri: `https://bricks-dev.katsamsoft.com${item?.property_cover_image}`,
        }}
        style={styles.propertyImg}
      />
      <ImageBackground source={icons.tag} style={styles.tagIcon}>
        <Text style={styles.tagText}>{`7% OFF`}</Text>
        {/* <Text style={styles.tagText}>{`${item?.commission}% OFF`}</Text> */}
      </ImageBackground>
      <TouchableOpacity style={styles.likeBtn}>
        <Image source={icons.heart} style={commonStyles.icon16} />
      </TouchableOpacity>
      <View style={styles.detailBox}>
        <View style={{}}>
          <Text style={styles.nameText}>{item?.name}</Text>
          <View style={{...commonStyles.flexRow, marginVertical: hp(8)}}>
            <Image source={icons.buildings} style={commonStyles.icon16} />
            <Text style={styles.propertyTypeText}>
              {item?.property_categorization}
            </Text>
          </View>
          <View style={commonStyles.flexRow}>
            <Image source={icons.locationNormal} style={commonStyles.icon16} />
            <Text style={[styles.propertyTypeText, {color: colors.lightBlack}]}>
              {item?.complete_address}
            </Text>
          </View>
        </View>
        <View style={{justifyContent: 'space-between'}}>
          <Text style={styles.priceText}>{`₹52.15 Lac`}</Text>
          {/* <Text style={styles.priceText}>{`₹${item?.price}`}</Text> */}
          <Text style={styles.dateText}>
            {moment(item?.creation)?.format('DD MMM')}
          </Text>
          {/* <Text style={styles.dateText}>{`${item?.date}`}</Text> */}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.subTypeText}>{'2 bhk+2t'}</Text>
          {/* <Text style={styles.subTypeText}>{item?.subType}</Text> */}
          <View
            style={{
              ...commonStyles.flexRow,
              marginTop: hp(6),
            }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.detailText}>
              {`${item?.total_no_of_square_feet} SQ.FT.`}
              <Text style={styles.subDetailText}>{'(Built Up)'}</Text>
            </Text>
            <View style={styles.verticalSeperator} />
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.detailText}>
              {'16000'}
              {/* {item?.longTermRate} */}
              <Text style={styles.subDetailText}>{' (Long Term Rate)'}</Text>
            </Text>
          </View>
        </View>
        <Button
          title="Buy Now"
          onPress={onBuyNowPress}
          buttonStyle={styles.buyNowBtn}
          textStyle={styles.buyNowText}
        />
      </View>
    </Pressable>
  );
};

export default SellingPropertyItem;

const styles = StyleSheet.create({
  container: {
    padding: wp(10),
    borderWidth: wp(1),
    borderRadius: wp(6),
    marginBottom: hp(16),
    borderColor: colors.borderColor,
  },
  propertyImg: {
    width: '100%',
    height: hp(155),
    resizeMode: 'cover',
    borderRadius: wp(4),
  },
  tagIcon: {
    zIndex: 999,
    top: hp(16),
    left: wp(10),
    width: wp(68),
    height: hp(18),
    paddingLeft: wp(9),
    position: 'absolute',
    justifyContent: 'center',
  },
  tagText: {
    lineHeight: hp(13),
    color: colors.white,
    fontSize: fontSize(10),
    fontFamily: font.qMedium,
  },
  likeBtn: {
    zIndex: 1,
    top: hp(16),
    opacity: 0.5,
    width: wp(32),
    right: wp(16),
    height: wp(32),
    position: 'absolute',
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  detailBox: {
    marginTop: hp(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    lineHeight: hp(20),
    fontSize: fontSize(16),
    fontFamily: font.qBold,
    color: colors.lightBlack,
  },
  propertyTypeText: {
    marginLeft: wp(4),
    fontSize: fontSize(12),
    color: colors.normalGrey,
    fontFamily: font.qMedium,
  },
  priceText: {
    lineHeight: hp(20),
    fontSize: fontSize(16),
    fontFamily: font.qBold,
    color: colors.greenNeon,
  },
  dateText: {
    lineHeight: hp(15),
    alignSelf: 'flex-end',
    fontSize: fontSize(10),
    color: colors.normalGrey,
    fontFamily: font.qMedium,
  },
  detailText: {
    lineHeight: hp(15),
    fontSize: fontSize(12),
    fontFamily: font.qMedium,
    color: colors.lightBlack,
    width: wp(110),
  },
  subDetailText: {
    fontSize: fontSize(10),
    color: colors.normalGrey,
  },
  buyNowBtn: {
    height: hp(24),
    borderRadius: wp(4),
    paddingHorizontal: wp(9),
  },
  buyNowText: {
    fontSize: fontSize(10),
    fontFamily: font.qSemiBold,
  },
  subTypeText: {
    lineHeight: hp(15),
    fontSize: fontSize(12),
    color: colors.lightBlack,
    fontFamily: font.qSemiBold,
  },
  bottomContainer: {
    padding: wp(12),
    marginTop: hp(12),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: wp(12),
    justifyContent: 'space-between',
    backgroundColor: colors.propDetailBg,
  },
  verticalSeperator: {
    width: wp(1),
    height: hp(14),
    marginHorizontal: wp(8),
    backgroundColor: colors.mediumDarkBorder,
  },
});
