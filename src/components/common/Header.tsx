import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import {colors, fontSize, hp, wp} from '../../utils';

const Header = ({
  name,
  title,
  onLeftIconPress,
  customNameStyle,
  customTitleStyle,
  onRightIconPress1,
  onRightIconPress2,
  customHeaderStyle,
}: any) => {
  return (
    <View style={[styles.container, customHeaderStyle]}>
      <View style={commonStyles.flexRow}>
        {onLeftIconPress && (
          <TouchableOpacity
            onPress={onLeftIconPress}
            activeOpacity={0.7}
            style={styles.leftIconView}>
            <Image source={icons.menu} style={styles.leftIcon} />
          </TouchableOpacity>
        )}
        {title && (
          <Text style={[styles.titleText, customTitleStyle]}>
            {title}
            <Text style={customNameStyle}>{name}</Text>
          </Text>
        )}
      </View>
      <View style={commonStyles.flexRow}>
        {onRightIconPress2 && (
          <TouchableOpacity
            style={{
              ...styles.rightIconView,
              marginRight: wp(12),
            }}>
            <Image source={icons.notification} style={styles.rightIcon} />
          </TouchableOpacity>
        )}
        {onRightIconPress1 && (
          <TouchableOpacity style={styles.rightIconView}>
            <Image source={icons.wallet} style={styles.rightIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: hp(60),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(20),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  leftIconView: {
    padding: wp(5),
    paddingLeft: 0,
    marginRight: wp(12),
  },
  leftIcon: {
    width: hp(24),
    height: hp(24),
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  titleText: {
    color: colors.black,
    fontSize: fontSize(20),
    fontFamily: font.regular,
  },
  rightIconView: {
    width: hp(44),
    height: hp(44),
    borderWidth: 0.5,
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
  },
  rightIcon: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
    tintColor: colors.semiGrey,
  },
});
