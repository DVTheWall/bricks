import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import moment from 'moment';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {colors, fontSize, hp, wp} from '../../utils';

const TransactionListItem = ({item}: any) => {
  const isCredited = item?.transaction_type === 'Credit';
  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>
        {moment(item?.creation)?.format('dddd Do MMM')}
      </Text>
      {/* <Text style={styles.timeText}>{item?.time}</Text> */}
      <View style={styles.titleContainer}>
        <View style={styles.titleBox}>
          {/* <Image source={item?.icon} style={styles.iconStyle} /> */}
          <Image source={icons.rupeeCircle} style={styles.iconStyle} />
          <View>
            <Text style={styles.titleText}>{item?.name}</Text>
            {item?.investedIn && (
              <Text
                style={
                  styles.investText
                }>{`Invested in ${item?.investedIn}`}</Text>
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
    paddingTop: wp(16),
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
});
