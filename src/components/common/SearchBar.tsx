import React from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Shadow from './Shadow';
import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {colors, fontSize, hp, wp} from '../../utils';
import {SearchBarProps} from '../../interface/Common';

const SearchBar = ({
  value,
  placeholder,
  onChangeText,
  onFilterPress,
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Shadow shadowStyle={styles.shadowStyle}>
        <View style={styles.searchBoxView}>
          <Image source={icons.search} style={styles.searchIcon} />
          <TextInput
            value={value}
            placeholder={placeholder}
            style={styles.inputStyle}
            onChangeText={onChangeText}
            placeholderTextColor={colors.darkGrey}
          />
        </View>
      </Shadow>
      <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
        <Image source={icons.filter} style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: hp(24),
    borderBottomWidth: wp(1),
    paddingHorizontal: wp(16),
    borderColor: colors.borderColor,
  },
  searchBoxView: {
    marginRight: wp(8),
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: hp(14),
    paddingHorizontal: wp(16),
    backgroundColor: colors.white,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 0,
    color: colors.black,
    fontSize: fontSize(14),
    fontFamily: font.regular,
    marginHorizontal: wp(16),
  },
  searchIcon: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  shadowStyle: {
    flex: 1,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: hp(5),
    },
  },
  filterBtn: {
    width: hp(36),
    height: hp(36),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});
