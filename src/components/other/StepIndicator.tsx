import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {font} from '../../utils/fonts';
import {commonStyles} from '../../styles/styles';
import {colors, fontSize, hp, wp} from '../../utils';

// type Props = {};

const StepIndicator = ({bgColor, step, isLine}: any) => {
  return (
    <View style={commonStyles.flexRow}>
      <View
        style={{
          ...styles.indicatorView,
          backgroundColor: bgColor || colors.primary,
        }}>
        <Text
          style={[
            styles.stepText,
            {
              color:
                bgColor === colors.mediumGrey ? colors.black : colors.white,
            },
          ]}>
          {step}
        </Text>
      </View>
      {isLine && (
        <View
          style={{
            ...styles.lineStyle,
            borderColor: bgColor || colors.primary,
          }}
        />
      )}
    </View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({
  indicatorView: {
    width: hp(20),
    height: hp(20),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
  },
  stepText: {
    color: colors.white,
    letterSpacing: -0.5,
    fontFamily: font.bold,
    fontSize: fontSize(12),
  },
  lineStyle: {
    width: wp(110),
    marginHorizontal: wp(12),
    borderWidth: wp(0.5),
    borderStyle: 'dashed',
    alignSelf: 'center',
  },
});
