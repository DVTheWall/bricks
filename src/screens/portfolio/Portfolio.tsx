/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {LineChart} from 'react-native-gifted-charts';

import {font} from '../../utils/fonts';
import {commonStyles} from '../../styles/styles';
import Header from '../../components/common/Header';
import Shadow from '../../components/common/Shadow';
import Loader from '../../components/common/Loader';
import {colors, fontSize, hp, wp} from '../../utils';
import {dummyData, periodDataList} from '../../utils/dataConstants';
import {getPortfolioDataApi} from '../../store/action/portfolioActions';

const Portfolio = () => {
  const dispatch = useDispatch();

  const {portfolioData} = useSelector((state: any) => state.data);
  const profileData = portfolioData?.profile_data?.[0];

  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [periodData, setPeriodData] = useState(periodDataList);

  const monthWiseData = portfolioData?.month_wise_total?.map((item: any) => ({
    label: item.month_year,
    value: Number(item.total_amount.replace(/[^0-9.]/g, '')),
  }));

  const threeMontheWiseData = portfolioData?.three_month_wise_total?.map(
    (item: any) => ({
      label: item.month_year,
      value: Number(item.total_amount.replace(/[^0-9.]/g, '')),
    }),
  );
  const TempData = monthWiseData;
  const sixMontheWiseData = portfolioData?.six_month_wise_total?.map(
    (item: any) => ({
      label: item.month_year,
      value: Number(item.total_amount.replace(/[^0-9.]/g, '')),
    }),
  );

  const yearWiseData = portfolioData?.one_year_wise_total?.map((item: any) => ({
    label: item.month_year,
    value: Number(item.total_amount.replace(/[^0-9.]/g, '')),
  }));

  const [graphData, setGraphData] = useState(monthWiseData);

  // const {property_percentages} = portfolioData || [];

  const isProfit =
    profileData?.profile &&
    Number(profileData?.profit?.replace(/[^0-9.]/g, '')) > 0;
  // const profitLoss =
  //   profileData?.profit < 0
  //     ? `-₹${Math.abs(profileData?.profit)}`
  //     : `₹${Math.abs(profileData?.profit)}`;
  // const profit = profileData?.profit ?? 0;
  // const invested = profileData?.invested ?? 1;
  // const profitLossPercentage = (profit / invested) * 100;
  // const profitLossPerc = Math.abs(profitLossPercentage).toFixed(2) + '%';

  useEffect(() => {
    getPortfolioData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPortfolioData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getPortfolioData = () => {
    setIsLoading(true);
    const request = {
      data: {},
      onSuccess: (res: any | []) => {
        setIsLoading(false);
      },
      onFail: (err: any) => {
        setIsLoading(false);
      },
    };
    dispatch(getPortfolioDataApi(request) as never);
  };

  // const pointerComponent = () => {
  //   return <View style={{height: 5, width: 5, backgroundColor: 'red'}} />;
  // };

  // const pointerConfig = {
  //   height: 5,
  //   width: 5,
  //   pointerComponent: pointerComponent,
  // };

  const renderGraphIndicator = ({item}: any) => {
    return (
      <View style={styles.boxContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: item?.color,
                height: hp(16),
                width: hp(16),
                borderRadius: wp(4),
                marginRight: wp(8),
              }}
            />
            <Text
              style={{
                color: colors.lightBlack,
                fontSize: fontSize(14),
                // lineHeight: hp(20),
                fontFamily: font.mMedium,
              }}>
              {item?.title}
            </Text>
          </View>
          <Text
            style={{
              color: colors.mediumGrey,
              fontSize: fontSize(12),
              // lineHeight: hp(20),
              fontFamily: font.mrSemiBold,
            }}>
            {item?.percentage}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Header
        isBackButton
        title={'Portfolio'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <Loader visible={isLoading} />
      <ScrollView
        style={{paddingTop: hp(12)}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Shadow shadowStyle={styles.boxShadow}>
          <View style={styles.boxContainer}>
            <View style={commonStyles.flexRow}>
              <View style={commonStyles.flex}>
                <View style={commonStyles.flexRow}>
                  <View style={styles.orangeIndicator} />
                  <Text style={styles.boxTitleText}>{'Invested'}</Text>
                </View>
                <Text style={styles.amountText}>{profileData?.invested}</Text>
              </View>
              <View style={commonStyles.flex}>
                <View style={commonStyles.flexRow}>
                  <View style={styles.orangeIndicator} />
                  <Text style={styles.boxTitleText}>{'Current'}</Text>
                </View>
                <Text style={styles.amountText}>{profileData?.current}</Text>
              </View>
            </View>
            <View style={styles.boxSeperator} />
            <View style={styles.boxBottomView}>
              <Text style={styles.boxTitleText}>{'P&L'}</Text>
              <View style={commonStyles.flexRow}>
                <Text
                  style={{
                    ...styles.diffAmountText,
                    color: isProfit ? colors.greenNeon : colors.redNeon,
                  }}>
                  {profileData?.profit}
                </Text>
                <View
                  style={{
                    ...styles.boxPercView,
                    backgroundColor: isProfit
                      ? colors.lightGreen
                      : colors.xLightPrimary,
                  }}>
                  <Text
                    style={{
                      ...styles.boxPercText,
                      color: isProfit ? colors.greenNeon : colors.redNeon,
                    }}>
                    {`${profileData?.profit_per}%`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Shadow>

        <View style={styles.chartContainer}>
          <LineChart
            data={graphData || TempData}
            width={320} // You can adjust the width as needed
            height={210} // You can adjust the height as needed
            color="#F36667"
            hideRules
            curved
            adjustToWidth
            noOfSections={4}
            hideDataPoints
            yAxisTextStyle={{color: 'black'}}
            xAxisLabelTextStyle={{color: 'transparent', fontSize: 1}}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            {periodData?.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item?.id === 1) {
                      setGraphData(monthWiseData);
                    } else if (item?.id === 2) {
                      setGraphData(threeMontheWiseData);
                    } else if (item?.id === 3) {
                      setGraphData(sixMontheWiseData);
                    } else if (item?.id === 4) {
                      setGraphData(yearWiseData);
                    }

                    let updatePeriodData = periodData?.map(obj => {
                      if (item?.id === obj?.id) {
                        return {...obj, isSelected: true};
                      } else {
                        return {...obj, isSelected: false};
                      }
                    });

                    setPeriodData(updatePeriodData);
                  }}
                  style={{
                    paddingHorizontal: wp(12),
                    paddingVertical: hp(6),
                    borderRadius: wp(100),
                    backgroundColor: item?.isSelected
                      ? colors.lightBlack
                      : colors.transparent,
                  }}>
                  <Text
                    style={{
                      fontSize: fontSize(11),
                      lineHeight: hp(15),
                      color: item?.isSelected ? colors.white : colors.darkGrey,
                      fontFamily: font.mrRegular,
                    }}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{
              height: hp(0.5),
              width: '100%',
              backgroundColor: colors.borderColor,
              marginVertical: hp(27),
            }}
          />
          <View style={{width: '100%', paddingHorizontal: wp(16)}}>
            <Text
              style={{
                fontSize: fontSize(16),
                lineHeight: hp(20),
                color: colors.lightBlack,
                fontFamily: font.semiBold,
              }}>
              {'Category Distribution'}
            </Text>
            <View
              style={{
                marginVertical: wp(16),
                height: hp(24),
                borderRadius: wp(100),
                width: '100%',
                overflow: 'hidden',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  position: 'absolute',
                  zIndex: 999,
                  top: 10,
                  flexDirection: 'row',
                  paddingHorizontal: wp(20),
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                {dummyData?.map(item => {
                  return (
                    <View
                      style={{
                        height: wp(4),
                        width: wp(4),
                        borderRadius: wp(4),
                        backgroundColor: 'rgba(255,255,255,0.3)',
                      }}
                    />
                  );
                })}
              </View>
              {portfolioData?.property_percentages?.map(
                (person: any, index: number) => {
                  return (
                    <View
                      key={index.toString()}
                      style={{
                        width: person?.percentage,
                        backgroundColor: person?.color,
                        height: '100%',
                      }}
                    />
                  );
                },
              )}
            </View>
          </View>
        </View>

        <Shadow shadowStyle={styles.boxShadow}>
          {/* <View style={styles.boxContainer}> */}
          <FlatList
            data={portfolioData?.property_percentages}
            renderItem={renderGraphIndicator}
            // keyExtractor={(_, index) => index?.toString()}
            ItemSeparatorComponent={() => <View style={{height: hp(6)}} />}
          />
          {/* </View> */}
        </Shadow>
        <View style={{height: hp(60)}} />
      </ScrollView>
    </View>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customTitleStyle: {
    fontSize: fontSize(24),
    fontFamily: font.semiBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
  boxShadow: {
    shadowRadius: 5,
    shadowOpacity: 0.05,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: hp(5),
    },
  },
  boxContainer: {
    borderRadius: wp(12),
    borderWidth: wp(1),
    borderColor: colors.borderColor,
    marginHorizontal: wp(16),
    padding: wp(12),
    backgroundColor: colors.white,
  },
  orangeIndicator: {
    height: hp(18),
    width: wp(3),
    marginRight: wp(12),
    backgroundColor: colors.orange,
  },
  boxTitleText: {
    color: colors.yBlack,
    fontSize: fontSize(18),
    lineHeight: hp(30),
    fontFamily: font.mRegular,
  },
  amountText: {
    color: colors.black,
    fontSize: fontSize(20),
    lineHeight: hp(34),
    fontFamily: font.mBold,
  },
  boxSeperator: {
    borderWidth: wp(0.5),
    borderColor: colors.borderColor,
    marginVertical: hp(8),
  },
  boxBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  diffAmountText: {
    fontSize: fontSize(18),
    fontFamily: font.semiBold,
  },
  boxPercView: {
    borderRadius: wp(100),
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    marginLeft: wp(6),
  },
  boxPercText: {
    fontSize: fontSize(12),
    fontFamily: font.mMedium,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginTop: hp(24),
  },
  xAxisLabel: {
    color: 'black',
    fontSize: 12,
  },
  yAxisLabel: {
    color: 'black',
    fontSize: 12,
  },
});
