import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Shadow from './Shadow';
import {font} from '../../utils/fonts';
import {colors, fontSize, hp, wp} from '../../utils';
// import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import {TextInputProps} from '../../interface/Common';

const TextInputComp = ({
  value,
  label,
  error,
  onBlur,
  onFocus,
  editable,
  autoFocus,
  loading,
  maxLength,
  multiline,
  rightText,
  rightIconSource,
  isRightText,
  isMandetory,
  placeholder,
  isRightIcon,
  onChangeText,
  keyboardType,
  rightIconDisable,
  onRightIconPress,
  onRightTextPress,
  customLabelStyle,
  customInputStyle,
  customShadowStyle,
  customTextBoxStyle,
  rightIconTintColor = colors.white,
}: TextInputProps) => {
  return (
    <View>
      {label && (
        <Text style={[styles.labelText, customLabelStyle]}>
          {label}
          {isMandetory && (
            <Text style={{...styles.labelText, color: colors.redNeon}}>
              {' *'}
            </Text>
          )}
        </Text>
      )}
      <Shadow shadowStyle={[{shadowColor: colors.cyan}, customShadowStyle]}>
        <View style={[styles.textInputContainer, customTextBoxStyle]}>
          <TextInput
            editable={editable}
            value={value}
            autoFocus={autoFocus}
            onBlur={onBlur}
            onFocus={onFocus}
            maxLength={maxLength}
            placeholder={placeholder}
            style={[styles.inputStyle, customInputStyle]}
            onChangeText={onChangeText}
            placeholderTextColor={colors.darkGrey}
            multiline={multiline}
            keyboardType={keyboardType}
          />
          {isRightIcon && (
            <TouchableOpacity
              activeOpacity={1}
              disabled={rightIconDisable}
              style={{marginLeft: wp(8)}}
              onPress={onRightIconPress}>
              <Image
                source={rightIconSource}
                style={[commonStyles.icon20, {tintColor: rightIconTintColor}]}
              />
            </TouchableOpacity>
          )}
          {loading && (
            <ActivityIndicator color={colors.primary} size={'small'} />
          )}
          {isRightText && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginLeft: wp(8)}}
              onPress={onRightTextPress}>
              <Text style={styles.rightText}>{rightText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </Shadow>
      <Text style={styles.errText}>{error ? error : ' '}</Text>
    </View>
  );
};

export default TextInputComp;

const styles = StyleSheet.create({
  labelText: {
    lineHeight: hp(18),
    color: colors.black,
    marginBottom: hp(5),
    fontSize: fontSize(14),
    fontFamily: font.semiBold,
  },
  textInputContainer: {
    height: hp(48),
    borderRadius: wp(10),
    borderWidth: wp(0.5),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(16),
    borderColor: colors.darkGrey,
    backgroundColor: colors.white,
  },
  inputStyle: {
    flex: 1,
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: font.semiBold,
  },
  errText: {
    marginTop: hp(2),
    color: colors.red,
    alignSelf: 'flex-end',
    fontSize: fontSize(10),
    lineHeight: hp(12),
  },
  rightText: {
    marginTop: hp(2),
    color: colors.primary,
    fontSize: fontSize(14),
    fontFamily: font.semiBold,
  },
});
