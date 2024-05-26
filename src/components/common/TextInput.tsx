import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

import {colors, fontSize, hp, wp} from '../../utils';
import {font} from '../../utils/fonts';
import Shadow from './Shadow';

type Props = {
  value: string;
  label?: string;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  isMandetory?: boolean;
  onChangeText: (text: string) => void;
};

const TextInputComp = ({
  value,
  label,
  error,
  maxLength,
  isMandetory,
  placeholder,
  onChangeText,
}: Props) => {
  return (
    <View>
      {label && (
        <Text style={styles.labelText}>
          {label}
          {isMandetory && (
            <Text style={{...styles.labelText, color: colors.redNeon}}>
              {' *'}
            </Text>
          )}
        </Text>
      )}
      <Shadow shadowStyle={{shadowColor: colors.cyan}}>
        <View style={styles.textInputContainer}>
          <TextInput
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
            style={styles.inputStyle}
            onChangeText={onChangeText}
            placeholderTextColor={colors.darkGrey}
          />
        </View>
      </Shadow>
      <Text style={styles.errText}>{error ? error : ''}</Text>
    </View>
  );
};

export default TextInputComp;

const styles = StyleSheet.create({
  labelText: {
    color: colors.black,
    marginBottom: hp(2),
    fontSize: fontSize(14),
    fontFamily: font.medium,
  },
  textInputContainer: {
    // elevation: 5,
    height: hp(48),
    // shadowOpacity: 1,
    // shadowRadius: 0.5,
    borderRadius: wp(10),
    borderWidth: wp(0.5),
    // paddingVertical: hp(12),
    justifyContent: 'center',
    // shadowColor: colors.cyan,
    paddingHorizontal: wp(16),
    borderColor: colors.darkGrey,
    backgroundColor: colors.white,
    // shadowOffset: {width: 0, height: hp(2)},
  },
  inputStyle: {
    // flex: 1,
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: font.semiBold,
  },
  errText: {
    marginTop: hp(2),
    color: colors.red,
    alignSelf: 'flex-end',
    fontSize: fontSize(10),
  },
});
