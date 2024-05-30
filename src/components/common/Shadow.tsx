import React from 'react';
import {StyleSheet} from 'react-native';

import DropShadow from 'react-native-drop-shadow';

import {colors, hp} from '../../utils';
import {ShadowProps} from '../../interface/Common';

const Shadow = ({children, shadowStyle}: ShadowProps) => {
  return (
    <DropShadow style={[styles.shadowStyle, shadowStyle]}>
      {children}
    </DropShadow>
  );
};

export default Shadow;

const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: hp(2),
    },
    shadowOpacity: 1,
    shadowRadius: 0.1,
    zIndex: 999,
  },
});
