import React from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

import {hp, wp} from '../../utils';
import {LottieViewerProps} from '../../interface/Common';

const LottieViewer: React.FC<LottieViewerProps> = ({
  source,
  lottieStyle,
  loop = true,
}: LottieViewerProps) => {
  return (
    <LottieView
      autoPlay
      loop={loop}
      source={source}
      resizeMode="contain"
      hardwareAccelerationAndroid
      style={[styles.lottieStyle, lottieStyle]}
    />
  );
};

const styles = StyleSheet.create({
  lottieStyle: {
    width: wp(16),
    height: hp(7.38),
  },
});

export default LottieViewer;
