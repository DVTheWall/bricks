import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import {colors, fontSize, hp, wp} from '../../utils';

const Wallet = ({onPress}: any) => {
  return (
    <LinearGradient
      colors={['rgba(243, 102, 103, 1)', 'rgba(243, 102, 103, 0.05)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradientBorder}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.button}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 242, 242, 1)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradientBackground}>
          <View
            style={{
              height: wp(100),
              width: wp(100),
              backgroundColor: '#FFF2F2',
              borderRadius: wp(100),
              position: 'absolute',
              left: wp(-38),
              top: hp(-22),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.walletPrimary}
                style={{width: wp(40), height: wp(40), resizeMode: 'contain'}}
              />
              <View style={{marginLeft: wp(16)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.lightBlack,
                      fontSize: fontSize(14),
                      fontFamily: font.semiBold,
                    }}>
                    {'Bricks Wallet'}
                  </Text>
                  <View
                    style={{
                      paddingHorizontal: wp(6),
                      paddingVertical: hp(2),
                      borderRadius: wp(100),
                      backgroundColor: colors.lightGreen,
                      marginLeft: wp(8),
                    }}>
                    <Text
                      style={{
                        color: colors.greenNeon,
                        fontSize: fontSize(12),
                        fontFamily: font.regular,
                      }}>
                      {'Available'}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    lineHeight: hp(25),
                    color: colors.greenNeon,
                    fontSize: fontSize(20),
                    fontFamily: font.semiBold,
                  }}>
                  {'₹9000'}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onPress}>
              <Image
                source={icons.arrowCircleRight}
                style={commonStyles.icon20}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  gradientBorder: {
    padding: wp(1),
    borderRadius: wp(12),
    marginHorizontal: wp(16),
  },
  button: {
    overflow: 'hidden',
    borderRadius: wp(12),
    backgroundColor: colors.white,
  },
  gradientBackground: {
    padding: wp(12),
    borderRadius: wp(12),
  },
});
