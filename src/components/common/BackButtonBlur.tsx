import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';

import {wp} from '../../utils';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';

const BackButtonBlur = () => {
  const {goBack} = useNavigation();
  return (
    <TouchableOpacity style={styles.backBtnStyle} onPress={() => goBack()}>
      <BlurView
        style={styles.blurView}
        blurType="xlight"
        blurAmount={1}
        blurRadius={2}
        reducedTransparencyFallbackColor="white"
      />
      <Image source={icons.arrowLeft} style={commonStyles.icon20} />
    </TouchableOpacity>
  );
};

export default BackButtonBlur;

const styles = StyleSheet.create({
  backBtnStyle: {
    width: wp(38),
    height: wp(38),
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: wp(100),
    justifyContent: 'center',
  },
  blurView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});
