import React from 'react';
import {
  Text,
  Image,
  ViewStyle,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
} from 'react-native';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {colors, fontSize, hp, wp} from '../../utils';
import Shadow from './Shadow';

interface CustomButtonProps {
  title: string;
  isIcon?: boolean;
  onPress: () => void;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  shadowStyle?: StyleProp<ViewStyle>;
}

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
    // elevation: 5,
    height: hp(48),
    // shadowOpacity: 1,
    // shadowRadius: 0.5,
    borderRadius: wp(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: wp(24),
    // shadowColor: colors.black,
    backgroundColor: colors.primary,
    // shadowOffset: {width: 0, height: hp(2)},
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
