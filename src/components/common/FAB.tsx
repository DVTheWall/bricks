import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';

import Shadow from './Shadow';
import {icons} from '../../utils/icons';
import {colors, hp, wp} from '../../utils';
import {FABProps} from '../../interface/Common';
import {commonStyles} from '../../styles/styles';

const FAB = ({onPress}: FABProps) => {
  return (
    <Shadow shadowStyle={styles.shadowStyle}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.fabStyle}>
          <Image
            source={icons.plus}
            style={{...commonStyles.icon32, tintColor: colors.white}}
          />
        </TouchableOpacity>
      </View>
    </Shadow>
  );
};

export default FAB;

const styles = StyleSheet.create({
  shadowStyle: {
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  container: {
    zIndex: 999,
    right: wp(30),
    bottom: hp(24),
    position: 'absolute',
  },
  fabStyle: {
    width: wp(48),
    height: wp(48),
    borderWidth: wp(1),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    borderColor: colors.semiOrange,
    backgroundColor: colors.primary,
  },
});
