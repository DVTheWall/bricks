import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import {SCREEN} from '../../utils/screenConstants';
import Button from '../../components/common/Button';
import {colors, fontSize, hp, isIos, wp} from '../../utils';

const Welcome = ({navigation}: any) => {
  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <View style={commonStyles.subContainer1}>
        <Image source={icons.welcomeImg} style={styles.welcomeImg} />
      </View>
      <View style={commonStyles.flex}>
        <Text style={styles.welcomeText}>
          {'Welcome to Bricks\nInvest in Square Feet, Not\nJust Properties.'}
        </Text>
        <Text style={styles.descText}>
          {'Own Your Slice of Real Estate, One Square Foot at a Time'}
        </Text>
        <View style={styles.bottomContainer}>
          <View style={styles.btnContainer}>
            <Button
              isIcon
              title="START INVESTING"
              onPress={() => navigation.navigate(SCREEN.LOGIN)}
            />
          </View>
          <Image source={icons.welcomeBottom} style={styles.bottomImg} />
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  welcomeImg: {
    width: wp(293),
    height: hp(287),
    alignSelf: 'center',
    marginRight: wp(40),
  },
  welcomeText: {
    lineHeight: hp(36),
    paddingLeft: wp(20),
    letterSpacing: -0.5,
    color: colors.black,
    fontSize: fontSize(28),
    fontFamily: font.semiBold,
  },
  descText: {
    marginTop: hp(20),
    lineHeight: hp(24),
    letterSpacing: -0.5,
    color: colors.semiGrey,
    fontSize: fontSize(16),
    fontFamily: font.regular,
    paddingHorizontal: wp(20),
  },
  bottomContainer: {
    marginBottom: isIos ? hp(100) : hp(15),
  },
  btnContainer: {
    zIndex: 1,
    right: wp(20),
    position: 'absolute',
    bottom: isIos ? hp(110) : hp(150),
  },
  bottomImg: {
    width: '100%',
    height: '85%',
    resizeMode: 'contain',
  },
});
