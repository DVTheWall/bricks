import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import Shadow from './Shadow';
import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {colors, fontSize, hp, wp} from '../../utils';
import {CustomButtonProps} from '../../interface/Common';

const Button: React.FC<CustomButtonProps> = ({
  title,
  isIcon,
  onPress,
  textStyle,
  buttonStyle,
  shadowStyle,
}) => {
  return (
    <Shadow shadowStyle={shadowStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, buttonStyle]}
        onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
        {isIcon && <Image source={icons.arrowForward} style={styles.icon} />}
      </TouchableOpacity>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  button: {
    height: hp(48),
    borderRadius: wp(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: wp(24),
    backgroundColor: colors.primary,
  },
  text: {
    textAlign: 'center',
    color: colors.white,
    fontSize: fontSize(14),
    fontFamily: font.semiBold,
  },
  icon: {
    width: wp(15),
    height: hp(8),
    marginLeft: wp(12),
  },
});

export default Button;
