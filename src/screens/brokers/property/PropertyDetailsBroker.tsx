/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Text,
  ImageBackground,
  StatusBar,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Carousel from 'react-native-reanimated-carousel';
import {colors, fontSize, hp, isIos, wp} from '../../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {font} from '../../../utils/fonts';
import Shadow from '../../../components/common/Shadow';
import {icons} from '../../../utils/icons';
import {commonStyles} from '../../../styles/styles';
import BackButtonBlur from '../../../components/common/BackButtonBlur';
import {carouselData} from '../../../utils/dataConstants';

const {width} = Dimensions.get('window');

const PropertyDetailsBroker = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({item}: any) => (
    <View>
      <FastImage source={{uri: item.uri}} style={styles.image} />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
        style={styles.linearGradient}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor="transparent"
      />
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
          loop={false}
          ref={carouselRef}
          data={carouselData}
          renderItem={renderItem}
          width={width}
          height={width * 0.75}
          onSnapToItem={index => setActiveIndex(index)}
        />
        <FlatList
          ref={carouselRef}
          data={carouselData}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                setActiveIndex(index);
                // carouselRef?.current?.scrollTo({index});
              }}>
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
      <ScrollView style={{marginTop: hp(24), paddingHorizontal: wp(20)}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View>
            <Text
              style={{
                fontSize: fontSize(18),
                fontFamily: font.qBold,
                color: colors.lightBlack,
                lineHeight: hp(23),
              }}>
              {'Blue starline hotel'}
            </Text>
            <Text
              style={{
                fontSize: fontSize(16),
                fontFamily: font.qBold,
                color: colors.lightBlack,
                lineHeight: hp(20),
                marginTop: hp(8),
              }}>
              {'966'}
              <Text
                style={{
                  fontSize: fontSize(12),
                  fontFamily: font.qMedium,
                  color: colors.lightBlack,
                }}>
                {' SQ.FT.'}
              </Text>
            </Text>
          </View>
          <View style={styles.boxPercView}>
            <Text style={styles.boxPercText}>{'+6.00%'}</Text>
          </View>
        </View>

        <Shadow shadowStyle={styles.boxShadow}>
          <View
            style={{
              marginTop: hp(24),
              borderWidth: wp(1),
              borderColor: colors.borderColor,
              borderRadius: wp(8),
              backgroundColor: colors.white,
              overflow: 'hidden',
            }}>
            <View style={{padding: wp(12)}}>
              <View
                style={{
                  width: '100%',
                  //   backgroundColor: 'red',
                  //   padding: wp(12),
                }}>
                <LinearGradient
                  colors={[
                    'rgba(255, 94, 84, 0)',
                    'rgba(255, 94, 84, 0.1)',
                    'rgba(255, 94, 84, 0)',
                  ]}
                  style={styles.topBottomBorder}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                />

                {/* Gradient Background with Text */}
                <LinearGradient
                  colors={[
                    'rgba(255, 94, 84, 0)',
                    'rgba(255, 94, 84, 0.05)',
                    'rgba(255, 94, 84, 0)',
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.addressContainer}>
                  <Image
                    source={icons.locationFill}
                    style={commonStyles.icon20}
                  />
                  <Text style={styles.addressText}>
                    {'85 Piccadilly, London W1J 7NB'}
                  </Text>
                </LinearGradient>

                {/* Bottom Gradient Border */}
                <LinearGradient
                  colors={[
                    'rgba(255, 94, 84, 0)',
                    'rgba(255, 94, 84, 0.1)',
                    'rgba(255, 94, 84, 0)',
                  ]}
                  style={styles.topBottomBorder}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                />
              </View>
            </View>
            <View style={{padding: wp(12), backgroundColor: colors.tabBg}}>
              <View
                style={{
                  padding: wp(4),
                  backgroundColor: colors.white,
                  borderRadius: wp(6),
                }}>
                <ImageBackground
                  source={{
                    uri: 'https://s3-alpha-sig.figma.com/img/2bc9/709d/b73f56c71f0057f92864022ce659eaa7?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Gtlnyt4hO5SZGh3ZjPUHtV3~IiMGslWOKHRIuSNTbwkSceyDvu27ZLCE6J10mT3PSUDP2Xf79Fyu1CNQDhBVJ5aHsSFPZ5Y~rkG5GC0cIWb8LuABFBisBXY-FONskOyf4XVm54tNhGeLQ2hPmnaFzs0l9thazFZiJgYiGtg0ymcBulitRabvFJKl14jVawb-9aD~8iOlzj~Lcp2H0XV0bviA0vxHDvME2W43GLdfJp5N-mDuIbfU18KTEmYGUftSyzMiYH-XQhgmyfleob4FUbLV7ZKrVfpppXWXHoGyPyLCtzfaN9MhXbe42nkz9SIK~HnkBZNw9sarzX~NJvKzwg__',
                  }}
                  style={{
                    width: '100%',
                    height: 132,
                    justifyContent: 'flex-end',
                  }}
                  resizeMode="cover">
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary,
                      margin: wp(12),
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      borderRadius: wp(4),
                      paddingVertical: hp(10),
                    }}>
                    <Image source={icons.map} style={commonStyles.icon20} />
                    <Text
                      style={{
                        marginLeft: wp(8),
                        fontSize: fontSize(14),
                        fontFamily: font.qBold,
                        color: colors.white,
                        lineHeight: hp(18),
                      }}>
                      {'Open Google Map'}
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </View>
          </View>
        </Shadow>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(24),
          }}>
          <Image source={icons.alignLeft} style={commonStyles.icon16} />
          <Text
            style={{
              marginLeft: wp(4),
              fontSize: fontSize(14),
              fontFamily: font.qSemiBold,
              color: colors.grey,
            }}>
            {'Property Highlights'}
          </Text>
        </View>

        {/* <Shadow shadowStyle={styles.propertyBoxShadow}> */}
        <View
          style={{
            padding: wp(12),
            borderRadius: wp(8),
            borderWidth: wp(1),
            borderColor: colors.borderColor,
            overflow: 'hidden',
            marginTop: hp(20),
            backgroundColor: 'rgba(245, 246, 248, 1)',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: wp(64),
                width: wp(64),
                borderRadius: wp(100),
                borderWidth: wp(0.5),
                borderColor: colors.pinkBorder,
                backgroundColor: colors.pinkBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={icons.propertyLogo}
                style={{width: wp(44), height: hp(30), resizeMode: 'contain'}}
              />
            </View>
            <View
              style={{
                width: '77%',
                marginLeft: wp(8),
              }}>
              <Text
                style={{
                  fontSize: fontSize(14),
                  fontFamily: font.qSemiBold,
                  color: colors.lightBlack,
                }}>
                {'Rudra Properties'}
              </Text>
              <Text
                style={{
                  fontSize: fontSize(12),
                  fontFamily: font.qSemiBold,
                  color: colors.grey,
                  marginTop: hp(3),
                }}>
                {'Hari Raj'}
              </Text>
              <Text
                style={{
                  fontSize: fontSize(12),
                  lineHeight: hp(16),
                  fontFamily: font.qMedium,
                  color: colors.grey,
                  marginTop: hp(6),
                }}>
                {'Sale | Rent of Residential & Commercial Properties'}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.borderColor,
              height: hp(1),
              marginVertical: hp(14),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: wp(64),
                width: wp(64),
                borderRadius: wp(100),
                borderWidth: wp(0.5),
                borderColor: colors.pinkBorder,
                backgroundColor: colors.pinkBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={icons.propertyLogo}
                style={{width: wp(44), height: hp(30), resizeMode: 'contain'}}
              />
            </View>
            <View
              style={{
                width: '77%',
                marginLeft: wp(8),
              }}>
              <Text
                style={{
                  fontSize: fontSize(14),
                  fontFamily: font.qSemiBold,
                  color: colors.lightBlack,
                }}>
                {'Rudra Properties'}
              </Text>
              <Text
                style={{
                  fontSize: fontSize(12),
                  fontFamily: font.qSemiBold,
                  color: colors.grey,
                  marginTop: hp(3),
                }}>
                {'Hari Raj'}
              </Text>
              <Text
                style={{
                  fontSize: fontSize(12),
                  lineHeight: hp(16),
                  fontFamily: font.qMedium,
                  color: colors.grey,
                  marginTop: hp(6),
                }}>
                {'Sale | Rent of Residential & Commercial Properties'}
              </Text>
            </View>
          </View>
        </View>
        <View style={{height: hp(60)}} />
        {/* </Shadow> */}
      </ScrollView>
    </View>
  );
};

export default PropertyDetailsBroker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
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
    fontFamily: font.qSemiBold,
  },
  boxShadow: {
    shadowRadius: 5,
    shadowOpacity: 0.05,
    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
  },
  propertyBoxShadow: {
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  topBottomBorder: {
    height: hp(1),
  },
  addressContainer: {
    padding: wp(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: fontSize(14),
    fontFamily: font.qMedium,
    color: colors.black,
    letterSpacing: -0.5,
    marginLeft: wp(8),
  },
});
