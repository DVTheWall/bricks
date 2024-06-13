import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import LottieViewer from './LottieViewer';
import {lotties} from '../../utils/icons';
import {colors, hp, wp} from '../../utils';
// import {lotties} from '../../utils/icons';
// import {color, hp, wp, lotties} from '../../utils/icons';

function Loader({visible = false}) {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.containerStyle}>
        <View style={styles.whiteContainer}>
          <ActivityIndicator size={'large'} color={colors.primary} />
          {/* <LottieViewer
            children={undefined}
            source={lotties.loader}
            lottieStyle={styles.loaderLottieStyle}
          /> */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.loaderOpacity,
  },
  whiteContainer: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderLottieStyle: {
    width: wp(40.6),
    height: hp(16.05),
  },
});

export default Loader;
