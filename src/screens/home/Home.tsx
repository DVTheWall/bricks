/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';
import {SCREEN} from '../../utils/screenConstants';
import Header from '../../components/common/Header';
import Shadow from '../../components/common/Shadow';
import {colors, fontSize, hp, wp} from '../../utils';
import CategoryListItem from '../../components/home/CategoryListItem';
import PropertyItemList from '../../components/home/PropertyItemList';
import {categoryListData, hotPropertiesData} from '../../utils/dataConstants';

const Home = ({navigation}: any) => {
  const renderCategoryItem = ({item}: any) => {
    return <CategoryListItem item={item} onPress={() => {}} />;
  };

  const renderHotPropertiesItem = ({item}: any) => {
    return (
      <PropertyItemList
        item={item}
        onBuyNowPress={() => {
          navigation.navigate(SCREEN.PROPERTYDETAILS, {item: item});
        }}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.homeBg}}>
      <SafeAreaView />
      <Header
        title={'Hello, '}
        name={'Quaid!'}
        onLeftIconPress={() => {}}
        onRightIconPress1={() => navigation.navigate(SCREEN.PAYMENT)}
        onRightIconPress2={() => navigation.navigate(SCREEN.NOTIFICATION)}
        customHeaderStyle={{backgroundColor: colors.homeBg}}
        customNameStyle={{fontFamily: font.semiBold}}
      />
      <ScrollView
        bounces={false}
        style={commonStyles.flex}
        showsVerticalScrollIndicator={false}>
        <View style={styles.amountCardContainer}>
          <View style={styles.amountCardView}>
            <Shadow>
              <View style={styles.amountCardStyle}>
                <Text
                  style={
                    styles.cardTitleText
                  }>{`Total SQFT you're owned`}</Text>
                <Text style={styles.amountText}>{`10`}</Text>
              </View>
            </Shadow>
          </View>
          <View style={styles.amountCardView}>
            <Shadow>
              <View
                style={{
                  ...styles.amountCardStyle,
                  backgroundColor: colors.lightOrange,
                }}>
                <Text style={styles.cardTitleText}>{`Holding Amount`}</Text>
                <View style={commonStyles.flexRow}>
                  <Text style={styles.amountText}>{`1,20,000`}</Text>
                  <View style={styles.growAmountText}>
                    <Text style={styles.growPercText}>{`10% `}</Text>
                    <Image source={icons.growArrow} style={styles.growArrow} />
                  </View>
                </View>
              </View>
            </Shadow>
          </View>
        </View>

        <View style={styles.blackCardContainer}>
          <View style={{padding: wp(16)}}>
            <Text style={styles.blackCardTitleText}>
              {'Indore-Ujjain Road Plot'}
            </Text>
            <Text style={{...styles.blackCardTitleText, color: colors.white}}>
              {'Investment Opportunities'}
            </Text>
            <Text style={styles.blackCardSubText}>{'6000-6500/ SQFT'}</Text>
            <TouchableOpacity style={styles.investNowBtn}>
              <Text style={styles.investNowText}>{'Invest Now'}</Text>
            </TouchableOpacity>
            <Text
              style={{
                ...styles.blackCardSubText,
                marginVertical: 0,
                marginTop: hp(8),
              }}>
              {'16000 long term rate                  2.5X Gain'}
            </Text>
          </View>
          <View style={commonStyles.flexRow}>
            <View style={styles.gradientBorderView}>
              <Image source={icons.gradientBorder} style={styles.platImage} />
            </View>
            <Image source={icons.ploting} style={styles.platImage} />
          </View>
        </View>

        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitleText}>{'Invest By Category'}</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>{'View all'}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={categoryListData}
          renderItem={renderCategoryItem}
          style={styles.categoryListStyle}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => <View style={{width: wp(40)}} />}
          ItemSeparatorComponent={() => <View style={{width: wp(12)}} />}
        />
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitleText}>{'Hot Selling Properties'}</Text>
          <TouchableOpacity
            style={commonStyles.flexRow}
            onPress={() => {
              navigation.navigate(SCREEN.PROPERTYLIST, {isFromCustomer: true});
            }}>
            <Text style={styles.viewAllText}>{'More'}</Text>
            <Image source={icons.downChevron} style={styles.downChevron} />
          </TouchableOpacity>
        </View>
        <FlatList
          key={1}
          numColumns={2}
          data={hotPropertiesData}
          renderItem={renderHotPropertiesItem}
          style={styles.propertyListStyle}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.howWorksContainer}>
          <Image source={icons.howWorksImg} style={styles.howWorksImg} />
          <View style={styles.howWorksTextView}>
            <Text style={styles.howWorksTitleText}>{'How it works?'}</Text>
            <Text style={styles.howWorksSubText}>{'·  how to invest?'}</Text>
            <Text style={styles.howWorksSubText}>{'·  what is Bricks?'}</Text>
            <TouchableOpacity style={styles.youTubeBtn}>
              <Text style={styles.youTubeBtnText}>{'View'}</Text>
              <Image source={icons.youtubeIcon} style={styles.youtubeIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.kycCardContainer}>
          <Image source={icons.blueTick} style={styles.blueTickIcon} />
          <View style={styles.kycCardTextView}>
            <Text style={styles.kycCardTitle}>{'Complete E-KYXC'}</Text>
            <Text style={styles.kycCardSubText}>{'PAN Number'}</Text>
            <Text style={styles.kycCardSubText}>{'Name on PAN'}</Text>
            <Text style={styles.kycCardSubText}>{'Aadhaar Number'}</Text>
          </View>
          <TouchableOpacity style={styles.completeNowBtn}>
            <Text style={styles.completeNowText}>{'Complete Now'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listFooter} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  amountCardContainer: {
    width: '100%',
    height: hp(74),
    marginTop: hp(14),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(20),
    justifyContent: 'space-between',
  },
  amountCardView: {
    width: '47%',
    height: '100%',
  },
  amountCardStyle: {
    width: '100%',
    height: '100%',
    padding: wp(12),
    borderRadius: wp(6),
    backgroundColor: colors.lightGreen,
  },
  cardTitleText: {
    color: colors.black,
    letterSpacing: -0.5,
    fontSize: fontSize(12),
    fontFamily: font.semiBold,
  },
  amountText: {
    marginTop: hp(7),
    color: colors.black,
    letterSpacing: -0.5,
    fontFamily: font.bold,
    fontSize: fontSize(20),
  },
  subTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(20),
    justifyContent: 'space-between',
  },
  subTitleText: {
    lineHeight: hp(36),
    color: colors.black,
    letterSpacing: -0.5,
    fontFamily: font.bold,
    fontSize: fontSize(16),
  },
  viewAllText: {
    lineHeight: hp(36),
    letterSpacing: -0.5,
    color: colors.primary,
    fontSize: fontSize(13),
    fontFamily: font.semiBold,
  },
  blackCardContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: hp(20),
    justifyContent: 'space-between',
    backgroundColor: colors.lightBlack,
  },
  blackCardTitleText: {
    lineHeight: hp(21),
    letterSpacing: -0.5,
    color: colors.purple,
    fontFamily: font.bold,
    fontSize: fontSize(15),
  },
  blackCardSubText: {
    lineHeight: hp(14),
    color: colors.white,
    letterSpacing: -0.5,
    marginVertical: hp(7),
    fontSize: fontSize(10),
    fontFamily: font.semiBold,
  },
  investNowBtn: {
    borderWidth: 1,
    borderRadius: wp(100),
    paddingVertical: hp(7),
    alignSelf: 'flex-start',
    paddingHorizontal: wp(14),
    borderColor: colors.purple,
    backgroundColor: colors.white,
  },
  investNowText: {
    color: colors.black,
    letterSpacing: -0.5,
    fontFamily: font.bold,
    fontSize: fontSize(10),
  },
  gradientBorderView: {
    right: wp(12),
    position: 'absolute',
  },
  platImage: {
    width: wp(165),
    height: hp(158),
    resizeMode: 'contain',
  },
  categoryListStyle: {
    paddingLeft: wp(20),
    marginVertical: hp(16),
  },
  downChevron: {
    width: wp(12),
    height: wp(12),
    marginLeft: wp(4),
    tintColor: colors.primary,
  },
  propertyListStyle: {
    marginTop: hp(16),
    marginHorizontal: wp(10),
  },
  howWorksContainer: {
    padding: wp(20),
    marginTop: hp(4),
    borderWidth: wp(1),
    borderRadius: wp(6),
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(20),
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
  },
  howWorksImg: {
    width: wp(151),
    height: hp(95),
    resizeMode: 'contain',
  },
  howWorksTextView: {
    flex: 1,
    height: '100%',
    marginLeft: wp(26),
  },
  howWorksTitleText: {
    color: colors.pink,
    lineHeight: hp(28),
    letterSpacing: -0.5,
    fontFamily: font.bold,
    fontSize: fontSize(20),
  },
  howWorksSubText: {
    lineHeight: hp(17),
    letterSpacing: -0.5,
    color: colors.black,
    fontSize: fontSize(12),
    fontFamily: font.semiBold,
  },
  youTubeBtn: {
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  youTubeBtnText: {
    marginRight: wp(4),
    color: colors.black,
    letterSpacing: -0.5,
    fontSize: fontSize(10),
    fontFamily: font.semiBold,
  },
  youtubeIcon: {
    height: hp(12),
    width: wp(12),
    resizeMode: 'contain',
  },
  kycCardContainer: {
    marginTop: hp(16),
    borderRadius: wp(6),
    flexDirection: 'row',
    marginHorizontal: wp(20),
    backgroundColor: colors.black,
  },
  blueTickIcon: {
    width: wp(72),
    height: hp(84),
    marginTop: hp(47),
    resizeMode: 'contain',
  },
  kycCardTextView: {
    marginLeft: wp(15),
    justifyContent: 'center',
  },
  kycCardTitle: {
    lineHeight: hp(21),
    color: colors.white,
    letterSpacing: -0.5,
    marginBottom: hp(5),
    fontFamily: font.bold,
    fontSize: fontSize(15),
  },
  kycCardSubText: {
    lineHeight: hp(21),
    color: colors.white,
    letterSpacing: -0.5,
    fontSize: fontSize(14),
    fontFamily: font.regular,
  },
  completeNowBtn: {
    right: wp(18),
    bottom: hp(18),
    borderRadius: wp(3),
    position: 'absolute',
    alignSelf: 'flex-start',
    paddingHorizontal: wp(12),
    backgroundColor: colors.white,
  },
  completeNowText: {
    lineHeight: hp(36),
    color: colors.black,
    letterSpacing: -0.5,
    fontSize: fontSize(10),
    fontFamily: font.semiBold,
  },
  growPercText: {
    color: colors.green,
    fontSize: fontSize(10),
    fontFamily: font.semiBold,
  },
  growArrow: {
    width: wp(11),
    height: hp(11),
    resizeMode: 'contain',
  },
  listFooter: {
    height: hp(60),
  },
  growAmountText: {
    marginTop: hp(7),
    marginLeft: wp(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
});
