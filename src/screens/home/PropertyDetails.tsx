/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {commonStyles} from '../../styles/styles';
import {icons} from '../../utils/icons';
import FastImage from 'react-native-fast-image';
import {colors, fontSize, hp, isIos, wp} from '../../utils';
import {font} from '../../utils/fonts';
import Button from '../../components/common/Button';
import {LineChart} from 'react-native-gifted-charts';
import {SCREEN} from '../../utils/screenConstants';
import BackButtonBlur from '../../components/common/BackButtonBlur';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {carouselData, propertyHighlightData} from '../../utils/dataConstants';

const {width} = Dimensions.get('window');

const HighlightItem = ({item}: any) => {
  return (
    <View
      style={{
        alignItems: 'center',
        borderRadius: wp(8),
        borderWidth: wp(1),
        borderColor: colors.borderColor,
        padding: wp(8),
        backgroundColor: 'rgba(245, 246, 248, 1)',
        marginRight: wp(16),
        width: wp(110),
      }}>
      <Image
        style={{width: wp(20), height: wp(20), resizeMode: 'contain'}}
        source={item?.icon}
      />
      <Text
        style={{
          fontFamily: font.semiBold,
          fontSize: fontSize(14),
          color: colors.lightBlack,
          marginVertical: hp(8),
        }}>
        {item?.detail}
        {item?.isUnit && (
          <Text
            style={{
              fontFamily: font.regular,
              fontSize: fontSize(10),
              color: colors.lightBlack,
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
        {item?.description}
      </Text>
    </View>
  );
};

const PropertyDetails = ({navigation, route}: any) => {
  const {item} = route?.params;

  const carouselRef = useRef(null);
  const flatListRef = useRef(null);
  const highlightFlatListRef = useRef(null);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = highlightIndex + 1;
      if (nextIndex >= propertyHighlightData.length - 2) {
        nextIndex = 0;
      }
      highlightFlatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setHighlightIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [highlightIndex]);

  const renderItem = ({item}: any) => (
    <View>
      <FastImage source={{uri: item.uri}} style={styles.image} />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
        style={styles.linearGradient}
      />
    </View>
  );

  const renderPropertyHighlight = ({item}: any) => {
    return <HighlightItem item={item} />;
  };

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

  const handleCarouselSnap = (index: number) => {
    setActiveIndex(index);
    if (flatListRef.current) {
      //@ts-ignore
      flatListRef.current.scrollToIndex({index, animated: true});
    }
  };

  const handleFlatListPress = (index: number) => {
    setActiveIndex(index);
    if (carouselRef.current) {
      //@ts-ignore
      carouselRef.current.scrollTo({index, animated: true});
    }
  };

  return (
    <View style={commonStyles.container}>
      {/* <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="transparent"
      /> */}
      <View
        style={{
          position: 'absolute',
          zIndex: 999,
          left: wp(20),
          top: isIos ? hp(70) : hp(40),
        }}>
        <BackButtonBlur />
      </View>
      <View
        style={{
          alignItems: 'center',
          height: width * 0.75,
          borderBottomRightRadius: wp(20),
          borderBottomLeftRadius: wp(20),
          overflow: 'hidden',
        }}>
        <Carousel
          loop={true}
          ref={carouselRef}
          data={carouselData}
          renderItem={renderItem}
          width={width}
          height={width * 0.75}
          onSnapToItem={handleCarouselSnap}
        />
        <FlatList
          ref={flatListRef}
          data={carouselData}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => handleFlatListPress(index)}>
              <FastImage
                source={{uri: item.uri}}
                style={[
                  styles.previewImage,
                  {
                    borderColor:
                      index === activeIndex
                        ? colors.primary
                        : colors.mediumGrey,
                    borderWidth: index === activeIndex ? wp(2) : wp(1),
                  },
                ]}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.previewList}
          style={styles.previewFlatList}
          ItemSeparatorComponent={() => <View style={{width: wp(16)}} />}
          ListFooterComponent={() => <View style={{width: wp(40)}} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
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
                  color: colors.greenNeon,
                }}>
                {`₹${item?.rate}`}
                <Text
                  style={{
                    fontFamily: font.semiBold,
                    fontSize: fontSize(10),
                    letterSpacing: -0.5,
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
                // flexDirection: 'row',
                // alignItems: 'center',
                // justifyContent: 'space-between',
                marginTop: hp(14),
              }}>
              <FlatList
                horizontal
                ref={highlightFlatListRef}
                data={propertyHighlightData}
                renderItem={renderPropertyHighlight}
                showsHorizontalScrollIndicator={false}
                onScrollToIndexFailed={() => {
                  setHighlightIndex(0);
                }}
              />
              {/* <HighlightItem
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
              /> */}
            </View>
          </View>

          <View style={styles.boxView}>
            <Text style={styles.boxTitleText}>{'Investment Graph'}</Text>
            <View style={styles.chartContainer}>
              <LineChart
                data={data}
                showDataPointOnFocus
                color={colors.primary}
                // isAnimated={true}
                // animateOnDataChange={true}
                thickness={2}
                // xAxisLabelTextStyle={styles.xAxisLabel}
                // yAxisTextStyle={styles.yAxisLabel}
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

          <View style={{...styles.boxView, paddingBottom: hp(16)}}>
            <Text style={styles.boxTitleText}>{'Property Documentation'}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp(16),
                paddingVertical: hp(12),
              }}>
              <Text
                style={{
                  fontFamily: font.semiBold,
                  fontSize: fontSize(14),
                  color: colors.xDarkGrey,
                }}>
                {'Registration Document'}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: font.semiBold,
                    fontSize: fontSize(12),
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
                paddingVertical: hp(12),
              }}>
              <Text
                style={{
                  fontFamily: font.semiBold,
                  fontSize: fontSize(14),
                  color: colors.xDarkGrey,
                }}>
                {'Privacy Policy Document'}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: font.semiBold,
                    fontSize: fontSize(12),
                    color: colors.blue,
                  }}>
                  {'Preview'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: hp(40)}} />
        </View>
      </ScrollView>

      <View style={styles.btnContainer}>
        <Button
          title="Invest Now"
          onPress={() => navigation.navigate(SCREEN.INVESTSCREEN)}
          buttonStyle={styles.btn}
          shadowStyle={{shadowOpacity: 0}}
        />
      </View>
      <SafeAreaView />
    </View>
  );
};

export default PropertyDetails;

const styles = StyleSheet.create({
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
  image: {
    width: width,
    height: width * 0.75,
  },
  previewImage: {
    width: wp(75),
    height: hp(47),
    borderRadius: wp(8),
  },
  previewList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewFlatList: {
    bottom: hp(14),
    position: 'absolute',
    paddingHorizontal: wp(20),
  },
  linearGradient: {
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '30%',
    position: 'absolute',
  },
});
