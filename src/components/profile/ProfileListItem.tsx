import React, {memo} from 'react';
import {
  Text,
  View,
  Image,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {font} from '../../utils/fonts';
import {commonStyles} from '../../styles/styles';
import {colors, fontSize, hp, wp} from '../../utils';

const ProfileListItem = ({
  onPress,
  title,
  iconName,
  switchValue,
  onSwitchToggle,
}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.listItemContainer}>
      <View style={commonStyles.flexRow}>
        <Image source={iconName} style={styles.upChevronStyle} />
        <Text style={styles.listItemTitle}>{title}</Text>
      </View>
      {onSwitchToggle && (
        <Switch
          value={switchValue}
          onChange={onSwitchToggle}
          thumbColor={switchValue ? colors.primary : colors.white}
          trackColor={{
            true: colors.semiOrange,
            false: colors.mediumDarkBorder,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default memo(ProfileListItem);

const styles = StyleSheet.create({
  listItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(16),
    paddingHorizontal: wp(24),
  },
  listItemTitle: {
    paddingLeft: wp(24),
    color: colors.black,
    letterSpacing: -0.5,
    fontSize: fontSize(13),
    fontFamily: font.semiBold,
  },
  upChevronStyle: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
});
