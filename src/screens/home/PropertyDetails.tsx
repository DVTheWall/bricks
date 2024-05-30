import {
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {commonStyles} from '../../styles/styles';
import {icons} from '../../utils/icons';
import FastImage from 'react-native-fast-image';
import Shadow from '../../components/common/Shadow';
import BackButton from '../../components/common/BackButton';
import {colors, fontSize, hp, wp} from '../../utils';
import {font} from '../../utils/fonts';
import Button from '../../components/common/Button';
import {LineChart} from 'react-native-gifted-charts';
import {SCREEN} from '../../utils/screenConstants';

// type Props = {};
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 130;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HighlightItem = ({icon, detail, isUnit, description}) => {
  return (
    // <Shadow shadowStyle={styles.highlightBoxShadow}>
    <View
      style={{
        alignItems: 'center',
        borderRadius: wp(8),
        borderWidth: wp(1),
        borderColor: colors.borderColor,
        padding: wp(8),
        backgroundColor: 'rgba(245, 246, 248, 1)',
        width: '30%',
      }}>
      <Image
        style={{width: wp(20), height: wp(20), resizeMode: 'contain'}}
        source={icon}
      />
      <Text
        style={{
          fontFamily: font.semiBold,
          fontSize: fontSize(14),
          color: colors.lightBlack,
          marginVertical: hp(8),
        }}>
        {detail}
        {isUnit && (
          <Text
            style={{
              fontFamily: font.regular,
              fontSize: fontSize(10),
              color: colors.lightBlack,
              lineHeight: hp(13),
            }}>
            {' sqft'}
          </Text>
        )}
      </Text>
      <Text
        style={{
          fontFamily: font.regular,
          fontSize: fontSize(10),
          color: colors.lightBlack,
          lineHeight: hp(13),
        }}>
        {description}
      </Text>
    </View>
    // </Shadow>
  );
};

const PropertyDetails = ({navigation, route}: any) => {
  const {item} = route?.params;
  console.log('ITEM::', item);

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 1.3, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setHidden(true);
    });

    return unsubscribe;
  }, [navigation]);

  const data = [
    {value: 5000, label: '1'},
    {value: 8000, label: '3'},
    {value: 9000, label: '5'},
    {value: 7000, label: '7'},
    {value: 6000, label: '9'},
    {value: 8000, label: '11'},
    {value: 6500, label: '13'},
    {value: 6000, label: '15'},
    {value: 4000, label: '17'},
    {value: 7000, label: '19'},
    {value: 5500, label: '21'},
    {value: 2090, label: '23'},
    {value: 1100, label: '25'},
    {value: 8000, label: '27'},
    {value: 6000, label: '29'},
    {value: 5600, label: '31'},
  ];

  return (
    <View style={commonStyles.container}>
      {/* <StatusBar hidden /> */}
      <View
        style={{position: 'absolute', zIndex: 999, left: wp(16), top: hp(70)}}>
        <BackButton />
      </View>
      <Animated.ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <View>
          <View style={styles.boxContainer}>
            <View>
              <Text
                style={{
                  fontFamily: font.semiBold,
                  fontSize: fontSize(24),
                  letterSpacing: -0.5,
                  lineHeight: hp(30),
                  color: colors.lightBlack,
                }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  fontFamily: font.bold,
                  fontSize: fontSize(20),
                  letterSpacing: -0.5,
                  lineHeight: hp(25),
                  color: colors.greenNeon,
                }}>
                {`₹${item?.rate}`}
                <Text
                  style={{
                    fontFamily: font.semiBold,
                    fontSize: fontSize(10),
                    letterSpacing: -0.5,
                    lineHeight: hp(13),
                    color: colors.mediumGrey,
                  }}>
                  {'    Per sqft'}
                </Text>
              </Text>
            </View>
            <View style={styles.boxPercView}>
              <Text style={styles.boxPercText}>{'+6.00%'}</Text>
            </View>
          </View>
          <View style={styles.boxContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.location}
                  style={{width: wp(16), height: hp(16), resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    marginLeft: wp(4),
                    fontSize: fontSize(14),
                    fontFamily: font.semiBold,
                    color: colors.grey,
                  }}>
                  {'Location'}
                </Text>
              </View>
              <Text
                style={{
                  marginTop: hp(8),
                  fontSize: fontSize(14),
                  fontFamily: font.semiBold,
                  color: colors.lightBlack,
                  letterSpacing: -0.5,
                  lineHeight: hp(17),
                }}>
                {'208, Ring road, Indore, Madhya Pradesh '}
              </Text>
            </View>
            <TouchableOpacity>
              <Image
                source={icons.mapBtn}
                style={{width: wp(83), height: hp(40), resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderBottomWidth: wp(0.5),
              borderColor: colors.borderColor,
              padding: wp(16),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={icons.alignLeft}
                style={{width: wp(16), height: hp(16), resizeMode: 'contain'}}
              />
              <Text
                style={{
                  marginLeft: wp(4),
                  fontSize: fontSize(14),
                  fontFamily: font.semiBold,
                  color: colors.grey,
                }}>
                {'Property Highlights'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: hp(14),
              }}>
              <HighlightItem
                icon={icons.building}
                detail={'Hotel'}
                description={'Property Type'}
                isUnit={false}
              />
              <HighlightItem
                icon={icons.threeSquare}
                detail={'25,000'}
                description={'Total Sqft'}
                isUnit={true}
              />
              <HighlightItem
                icon={icons.money}
                detail={'₹9000'}
                description={'Minimum Purchase'}
                isUnit={true}
              />
            </View>
          </View>

          <View style={styles.boxView}>
            <Text style={styles.boxTitleText}>{'Investment Graph'}</Text>
            <View style={styles.chartContainer}>
              {/* <LineChart
                data={data}
                width={400}
                height={250}
                xAxis={{
                  // Adjust interval for 2 days
                  numberOfVisibleLabels: Math.ceil(data.length / 2), // Ensure all labels are visible
                  ...chartConfig.xAxis,
                }}
                yAxis={chartConfig.yAxis}
              /> */}
              <LineChart
                data={data}
                showDataPointOnFocus
                color={colors.primary}
                // isAnimated={true}
                // animateOnDataChange={true}
                thickness={2}
                xAxisLabelTextStyle={styles.xAxisLabel}
                yAxisTextStyle={styles.yAxisLabel}
                height={250}
                width={390}
                // yAxisLabelTexts={['0', '20', '40', '60', '80', '100']}
                // backgroundColor={'red'}
                noOfSections={4}
                spacing={70}
                hideRules
                hideOrigin
                xAxisColor={colors.mediumGrey}
                yAxisColor={colors.mediumGrey}
                maxValue={10000}

                // endSpacing={30}
                // yAxisOffset={}
              />
            </View>
          </View>

          <View style={styles.boxView}>
            <Text style={styles.boxTitleText}>{'Property Documentation'}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp(16),
                paddingVertical: hp(8),
              }}>
              <Text
                style={{
                  fontFamily: font.semiBold,
                  fontSize: fontSize(14),
                  lineHeight: hp(18),
                  color: colors.darkGrey,
                }}>
                {'Registration Document'}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: font.semiBold,
                    fontSize: fontSize(12),
                    // lineHeight: hp(15),
                    color: colors.blue,
                  }}>
                  {'Preview'}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: wp(0.5),
                borderColor: colors.borderColor,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp(16),
                paddingVertical: hp(8),
              }}>
              <Text
                style={{
                  fontFamily: font.semiBold,
                  fontSize: fontSize(14),
                  lineHeight: hp(18),
                  color: colors.darkGrey,
                }}>
                {'Privacy Policy Document'}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: font.semiBold,
                    fontSize: fontSize(12),
                    // lineHeight: hp(15),
                    color: colors.blue,
                  }}>
                  {'Preview'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: hp(40)}} />
        </View>
      </Animated.ScrollView>

      <View style={styles.btnContainer}>
        <Button
          title="Invest Now"
          onPress={() => navigation.navigate(SCREEN.INVESTSCREEN)}
          buttonStyle={styles.btn}
          shadowStyle={{shadowOpacity: 0}}
        />
      </View>
      <SafeAreaView />
      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <FastImage
          source={{
            uri: 'https://img.freepik.com/free-photo/swimming-pool-beach-luxury-hotel-outdoor-pools-spa-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer-turkey_146671-18751.jpg?t=st=1716921896~exp=1716925496~hmac=4d793fe9b745622b6a3aecb14582404a6e8c228a39c3694ae71b8b29f2c447e8&w=1060',
          }}
          style={{width: '100%', height: HEADER_MAX_HEIGHT}}
        />
      </Animated.View>
    </View>
  );
};

export default PropertyDetails;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingTop: HEADER_MAX_HEIGHT,
  },
  header: {
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    position: 'absolute',
    height: HEADER_MAX_HEIGHT,
  },
  boxPercView: {
    backgroundColor: colors.lightGreen,
    borderRadius: wp(100),
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    marginLeft: wp(6),
    alignSelf: 'center',
  },
  boxPercText: {
    color: colors.greenNeon,
    fontSize: fontSize(12),
    fontFamily: font.mMedium,
  },
  boxContainer: {
    padding: wp(16),
    flexDirection: 'row',
    // alignContent: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: wp(0.5),
    borderColor: colors.borderColor,
  },
  highlightBoxShadow: {
    shadowRadius: -2,
    shadowOpacity: 0.3,
    shadowColor: colors.black,
    shadowOffset: {
      width: -2,
      height: -2,
    },
  },
  btnContainer: {
    paddingHorizontal: wp(15),
    paddingVertical: hp(8),
  },
  btn: {
    borderRadius: wp(4),
  },
  boxView: {
    paddingBottom: hp(24),
    borderBottomWidth: wp(1),
    borderColor: colors.borderColor,
  },
  boxTitleText: {
    padding: wp(16),
    lineHeight: hp(15),
    color: colors.mediumGrey,
    fontSize: fontSize(12),
    fontFamily: font.semiBold,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginTop: hp(24),
  },
});
