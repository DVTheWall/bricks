import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import FastImage from 'react-native-fast-image';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import {colors, fontSize, hp, wp} from '../../utils';

const CustomerListItem = ({item, onCustomerPress}: any) => {
  return (
    <TouchableOpacity onPress={onCustomerPress}>
      <View style={commonStyles.flexRow}>
        <FastImage source={{uri: item?.profileURL}} style={styles.profilePic} />
        <Text style={styles.nameText}>{item?.name}</Text>
        <View style={styles.tagView}>
          <Text style={styles.tagText}>{item?.status}</Text>
        </View>
      </View>
      <View style={{...commonStyles.flexRow, marginTop: hp(8)}}>
        <Image source={icons.call} style={commonStyles.icon16} />
        <Text style={styles.detailText}>{item?.phoneNumber}</Text>
      </View>
      <View style={{...commonStyles.flexRow, marginTop: hp(12)}}>
        <Image
          source={icons.location}
          style={{...commonStyles.icon16, tintColor: colors.primary}}
        />
        <Text style={styles.detailText}>{item?.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomerListItem;

const styles = StyleSheet.create({
  profilePic: {
    width: wp(32),
    height: wp(32),
    borderRadius: wp(100),
  },
  nameText: {
    marginLeft: wp(12),
    fontSize: fontSize(14),
    fontFamily: font.qBold,
    color: colors.lightBlack,
  },
  tagView: {
    marginLeft: wp(8),
    borderRadius: wp(100),
    paddingVertical: hp(4),
    paddingHorizontal: wp(6),
    backgroundColor: colors.xLightGreen,
  },
  tagText: {
    fontSize: fontSize(12),
    color: colors.greenNeon,
    fontFamily: font.qRegular,
  },
  detailText: {
    marginLeft: wp(4),
    fontSize: fontSize(12),
    color: colors.lightBlack,
    fontFamily: font.qMedium,
  },
});
