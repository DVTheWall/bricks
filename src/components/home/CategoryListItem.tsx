import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {font} from '../../utils/fonts';
import {colors, fontSize, wp} from '../../utils';

const CategoryListItem = ({item, onPress}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}>
      <View style={{...styles.iconContainer, backgroundColor: item?.bgColor}}>
        <Image source={item?.icon} style={styles.iconStyle} />
      </View>
      <View style={styles.textView}>
        <Text style={styles.categoryText}>{item?.category}</Text>
        <Text style={styles.projectText}>{`${item?.projects} Projects`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryListItem;

const styles = StyleSheet.create({
  container: {
    width: wp(145),
    padding: wp(12),
    borderWidth: wp(1),
    borderRadius: wp(6),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
  },
  iconContainer: {
    width: wp(40),
    height: wp(40),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
  },
  iconStyle: {
    width: wp(22),
    height: wp(22),
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  textView: {
    marginLeft: wp(15),
  },
  categoryText: {
    letterSpacing: -0.5,
    color: colors.black,
    fontFamily: font.bold,
    fontSize: fontSize(14),
  },
  projectText: {
    letterSpacing: -0.5,
    fontSize: fontSize(10),
    color: colors.mediumGrey,
    fontFamily: font.semiBold,
  },
});
