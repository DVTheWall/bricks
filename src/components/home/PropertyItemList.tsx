import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';

import Button from '../common/Button';
import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import {colors, fontSize, hp, wp} from '../../utils';
import FastImage from 'react-native-fast-image';

const PropertyItemList = ({item, onBuyNowPress}: any) => {
  return (
    <View style={styles.container} key={item?.id}>
      <View>
        {item?.discount && (
          <ImageBackground source={icons.tag} style={styles.tagIcon}>
            <Text style={styles.tagText}>{`${item?.discount}% OFF`}</Text>
          </ImageBackground>
        )}
        <FastImage
          source={{
            uri: `https://bricks-dev.katsamsoft.com${item?.property_cover_image}`,
          }}
          style={styles.propertyImg}
        />
      </View>
      <View style={styles.bottomView}>
        <Text numberOfLines={1} style={styles.propertyNameText}>
          {item?.property}
        </Text>
        <Text numberOfLines={1} style={styles.addressText}>
          {item?.complete_address}
        </Text>
        <View style={{...commonStyles.flexRow, marginTop: hp(6)}}>
          <Text style={styles.rateText}>
            {`₹${item?.minimum_rate}`}
            <Text style={styles.sqftText}>{'  sqft'}</Text>
          </Text>
          <View style={styles.growView}>
            <Text style={styles.growPercText}>
              {item?.growthPerc ? `${item?.growthPerc}% ` : '0%'}
            </Text>
            <Image source={icons.growArrow} style={styles.growArrow} />
          </View>
        </View>

        <View style={[commonStyles.flexRow, styles.bottomContainer]}>
          <View>
            <Text style={styles.longTermText}>{'long term rate '}</Text>
            <View style={commonStyles.flexRow}>
              <Text style={styles.longTermRateText}>
                {`${item?.sq_feet_available_for_sale}`}
              </Text>
              <View style={styles.growView}>
                <Text style={styles.growPercText}>
                  {item?.longTermPerc ? `${item?.longTermPerc}% ` : '0%'}
                </Text>
              </View>
            </View>
          </View>
          <Button
            title="Buy Now"
            onPress={onBuyNowPress}
            buttonStyle={styles.buyNowBtn}
            textStyle={styles.buyNowText}
          />
        </View>
      </View>
    </View>
  );
};

export default PropertyItemList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: wp(1),
    borderRadius: wp(6),
    marginBottom: hp(16),
    marginHorizontal: wp(10),
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
  },
  propertyImg: {
    width: '100%',
    height: hp(133),
    resizeMode: 'cover',
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
  },
  bottomView: {
    flex: 1,
    padding: wp(9),
    height: hp(120),
  },
  propertyNameText: {
    lineHeight: hp(18),
    color: colors.black,
    letterSpacing: -0.5,
    fontFamily: font.bold,
    fontSize: fontSize(14),
  },
  addressText: {
    lineHeight: hp(13),
    letterSpacing: -0.5,
    color: colors.darkGrey,
    fontSize: fontSize(10),
    fontFamily: font.semiBold,
  },
  rateText: {
    lineHeight: hp(18),
    color: colors.black,
    letterSpacing: -0.5,
    fontSize: fontSize(14),
    fontFamily: font.semiBold,
  },
  sqftText: {
    fontSize: fontSize(10),
    fontFamily: font.regular,
  },
  growView: {
    marginLeft: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(100),
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    backgroundColor: colors.lightGreen,
  },
  growPercText: {
    color: colors.green,
    fontSize: fontSize(10),
    fontFamily: font.semiBold,
    lineHeight: hp(13),
  },
  growArrow: {
    width: wp(8),
    height: hp(8),
    resizeMode: 'contain',
  },
  longTermText: {
    lineHeight: hp(13),
    color: colors.black,
    fontSize: fontSize(10),
    fontFamily: font.light,
  },
  longTermRateText: {
    color: colors.black,
    letterSpacing: -0.5,
    fontSize: fontSize(10),
    fontFamily: font.semiBold,
  },
  buyNowBtn: {
    height: hp(24),
    marginTop: hp(5),
    borderRadius: wp(4),
    paddingHorizontal: wp(9),
  },
  buyNowText: {
    fontSize: fontSize(10),
    fontFamily: font.semiBold,
  },
  bottomContainer: {
    marginTop: hp(12),
    justifyContent: 'space-between',
  },
  tagText: {
    lineHeight: hp(13),
    color: colors.white,
    fontSize: fontSize(10),
    fontFamily: font.qMedium,
  },
  tagIcon: {
    zIndex: 999,
    top: hp(6.5),
    width: wp(70),
    height: hp(18),
    paddingLeft: wp(8),
    position: 'absolute',
    justifyContent: 'center',
  },
});
