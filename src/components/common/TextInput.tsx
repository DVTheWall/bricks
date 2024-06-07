import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  Image,
} from 'react-native';

import Shadow from './Shadow';
import {font} from '../../utils/fonts';
import {colors, fontSize, hp, wp} from '../../utils';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInputProps} from '../../interface/Common';

const TextInputComp = ({
  value,
  label,
  error,
  onBlur,
  onFocus,
  editable,
  maxLength,
  multiline,
  isMandetory,
  placeholder,
  isRightIcon,
  onChangeText,
  onRightIconPress,
  customLabelStyle,
  customInputStyle,
  customShadowStyle,
  customTextBoxStyle,
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
            onBlur={onBlur}
            onFocus={onFocus}
            maxLength={maxLength}
            placeholder={placeholder}
            style={[styles.inputStyle, customInputStyle]}
            onChangeText={onChangeText}
            placeholderTextColor={colors.darkGrey}
            multiline={multiline}
          />
          {isRightIcon && (
            <TouchableOpacity
              style={{marginLeft: wp(8)}}
              onPress={onRightIconPress}>
              <Image source={icons.calendar} style={commonStyles.icon20} />
            </TouchableOpacity>
          )}
        </View>
      </Shadow>
      <Text style={styles.errText}>{error ? error : ''}</Text>
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
  },
});
