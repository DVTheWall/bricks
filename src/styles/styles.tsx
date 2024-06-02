import {StyleSheet} from 'react-native';
import {colors, wp} from '../utils';

export const commonStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  root: {
    flex: 1,
    paddingHorizontal: wp(20),
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
  subContainer1: {
    flex: 1,
    justifyContent: 'center',
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon20: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  icon16: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',
  },
  icon24: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  icon28: {
    width: wp(28),
    height: wp(28),
    resizeMode: 'contain',
  },
  icon32: {
    width: wp(32),
    height: wp(32),
    resizeMode: 'contain',
  },
});
