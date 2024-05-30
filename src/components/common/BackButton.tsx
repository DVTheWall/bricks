import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Shadow from './Shadow';
import {icons} from '../../utils/icons';
import {colors, hp, wp} from '../../utils';

type Props = {};

const BackButton = (props: Props) => {
  const {goBack} = useNavigation();
  return (
    <Shadow shadowStyle={styles.backBtnShadow}>
      <TouchableOpacity style={styles.backBtnStyle} onPress={() => goBack()}>
        <Image source={icons.backChevron} style={styles.backChevron} />
      </TouchableOpacity>
    </Shadow>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backBtnShadow: {
    shadowRadius: 5,
    shadowOpacity: 0.15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: hp(5),
    },
  },
  backBtnStyle: {
    width: wp(34),
    height: wp(34),
    marginRight: wp(16),
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  backChevron: {
    width: wp(8),
    height: hp(14),
    marginRight: wp(3),
    resizeMode: 'contain',
  },
});
