import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import moment from 'moment';

import { font } from '../../utils/fonts';
import { icons } from '../../utils/icons';
import { colors, fontSize, hp, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';

const TransactionListItem = ({ item }: any) => {
  const isCredited = item?.transaction_type === 'Credit';
  const title =
    item?.property_id !== null ? item?.property_id : 'Added to Wallet';
  const icon = item?.property_id !== null ? icons.hotel : icons.rupeeCircle;

  const getTagColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return { light: '#E9F8F0', dark: '#54A77B' };
      case 'Pending':
        return { light: '#E1E1E1', dark: '#636363' };
      case 'Processing':
        return { light: 'orange', dark: '#000080' };
      case 'Pending at Bank':
        return { light: 'orange', dark: '#000080' };
      case 'Rejected':
        return { light: '#FAEAEA', dark: '#E16032' };
      default:
        return { light: '#E9F8F0', dark: '#54A77B' };
    }
  };

  return (
    <View style={styles.container}>
      <View style={commonStyles.flexRowJustify}>
        <Text style={styles.timeText}>
          {moment(item?.date)?.format('dddd Do MMM')}
        </Text>
        <View
          style={{
            ...styles.tagView,
            backgroundColor: getTagColor(item?.status)?.light,
          }}>
          <Text
            style={{
              ...styles.tagText,
              color: getTagColor(item?.status)?.dark,
            }}>
            {item?.status}
          </Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.titleBox}>
          <Image source={icon} style={styles.iconStyle} />
          <View>
            <Text style={styles.titleText}>{title}</Text>
            {item?.sqft_purchased && (
              <Text
                style={
                  styles.investText
                }>{`Invested in ${item?.sqft_purchased}`}</Text>
            )}
          </View>
        </View>
        <Text
          style={{
            ...styles.amountText,
            color: isCredited ? colors.green : colors.saffron,
          }}>
          {`${isCredited ? '+' : '-'}₹${item?.amount}`}
        </Text>
      </View>
    </View>
  );
};

export default TransactionListItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: wp(12),
    paddingLeft: wp(16),
    paddingRight: wp(25),
  },
  timeText: {
    lineHeight: hp(14),
    fontSize: fontSize(11),
    color: colors.mediumGrey,
    fontFamily: font.regular,
  },
  titleContainer: {
    marginTop: hp(9),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBox: {
    flexDirection: 'row',
  },
  iconStyle: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  titleText: {
    marginLeft: wp(6),
    color: colors.black,
    fontSize: fontSize(15),
    fontFamily: font.semiBold,
  },
  amountText: {
    fontSize: fontSize(15),
    fontFamily: font.semiBold,
  },
  investText: {
    marginTop: hp(4),
    marginLeft: wp(6),
    lineHeight: hp(16),
    fontSize: fontSize(13),
    color: colors.semiGrey,
    fontFamily: font.regular,
  },
  tagView: {
    paddingVertical: hp(3),
    paddingHorizontal: wp(8),
    borderRadius: wp(100),
  },
  tagText: {
    fontSize: fontSize(12),
    fontFamily: font.semiBold,
  },
});
