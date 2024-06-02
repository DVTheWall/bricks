import React from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import {colors, fontSize, hp, wp} from '../../utils';

type Props = {
  value: string;
  placeholder?: string;
  onFilterPress: () => void;
  onChangeText: (text: string) => void;
};

const SearchBox = ({
  value,
  placeholder,
  onChangeText,
  onFilterPress,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBoxView}>
        <Image source={icons.searchNormal} style={commonStyles.icon20} />
        <TextInput
          value={value}
          placeholder={placeholder}
          style={styles.inputStyle}
          onChangeText={onChangeText}
          placeholderTextColor={colors.darkGrey}
        />
      </View>
      <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
        <Image source={icons.filterNormal} style={commonStyles.icon20} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: hp(24),
    paddingHorizontal: wp(20),
  },
  searchBoxView: {
    flex: 1,
    height: hp(42),
    borderWidth: wp(1),
    marginRight: wp(16),
    borderRadius: wp(6),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(16),
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 0,
    color: colors.black,
    fontSize: fontSize(14),
    fontFamily: font.qRegular,
    marginHorizontal: wp(16),
  },
  filterBtn: {
    width: hp(42),
    height: hp(42),
    alignItems: 'center',
    borderRadius: wp(6),
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: wp(1),
    borderColor: colors.borderColor,
  },
});
