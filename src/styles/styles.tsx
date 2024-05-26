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
});
