import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {font} from '../../utils/fonts';
import {colors, fontSize, hp, wp} from '../../utils';

const NotificationListItem = ({item}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgView} />
      <View style={styles.descBox}>
        <Text style={styles.descText} numberOfLines={3}>
          {item?.description}
        </Text>
        <Text style={styles.timeText}>{item?.time}</Text>
      </View>
    </View>
  );
};

export default NotificationListItem;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    margin: wp(16),
    flexDirection: 'row',
  },
  descBox: {
    marginLeft: wp(8),
  },
  imgView: {
    width: wp(38),
    height: wp(38),
    borderRadius: wp(100),
    backgroundColor: colors.mediumGrey,
  },
  descText: {
    flexWrap: 'wrap',
    textAlign: 'left',
    lineHeight: hp(18),
    color: colors.black,
    fontSize: fontSize(14),
    fontFamily: font.semiBold,
  },
  timeText: {
    marginTop: hp(6),
    lineHeight: hp(15),
    color: colors.black,
    fontSize: fontSize(12),
    fontFamily: font.semiBold,
  },
});
