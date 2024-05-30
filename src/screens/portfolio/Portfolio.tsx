import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {LineChart} from 'react-native-gifted-charts';

import {font} from '../../utils/fonts';
import {commonStyles} from '../../styles/styles';
import Header from '../../components/common/Header';
import Shadow from '../../components/common/Shadow';
import {colors, fontSize, hp, wp} from '../../utils';
import {indicatorListData, periodDataList} from '../../utils/dataConstants';

const Portfolio = () => {
  const data = [
    {value: 10, label: 'Line 1'},
    {value: 20, label: 'Line 1'},
    {value: 30, label: 'Line 1'},
    {value: 5, label: 'Line 2'},
    {value: 15, label: 'Line 2'},
    {value: 25, label: 'Line 2'},
    {value: 25, label: 'Line 2'},
  ];
  const data2 = [
    {value: 20, label: 'Line 1'},
    {value: 10, label: 'Line 1'},
    {value: 40, label: 'Line 1'},
    {value: 8, label: 'Line 2'},
    {value: 15, label: 'Line 2'},
    {value: 19, label: 'Line 2'},
    {value: 19, label: 'Line 2'},
  ];
  const data3 = [
    {value: 3, label: 'Line 1'},
    {value: 11, label: 'Line 1'},
    {value: 29, label: 'Line 1'},
    {value: 18, label: 'Line 2'},
    {value: 25, label: 'Line 2'},
    {value: 16, label: 'Line 2'},
    {value: 19, label: 'Line 2'},
  ];

  const pointerComponent = () => {
    return <View style={{height: 5, width: 5, backgroundColor: 'red'}} />;
  };

  const pointerConfig = {
    height: 5,
    width: 5,
    pointerComponent: pointerComponent,
  };

  const [periodData, setPeriodData] = useState(periodDataList);

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
              fontFamily: font.qMedium,
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
      <ScrollView style={{paddingTop: hp(12)}}>
        <Shadow shadowStyle={styles.boxShadow}>
          <View style={styles.boxContainer}>
            <View style={commonStyles.flexRow}>
              <View style={commonStyles.flex}>
                <View style={commonStyles.flexRow}>
                  <View style={styles.orangeIndicator} />
                  <Text style={styles.boxTitleText}>{'Invested'}</Text>
                </View>
                <Text style={styles.amountText}>{'₹2,28,000'}</Text>
              </View>
              <View style={commonStyles.flex}>
                <View style={commonStyles.flexRow}>
                  <View style={styles.orangeIndicator} />
                  <Text style={styles.boxTitleText}>{'Current'}</Text>
                </View>
                <Text style={styles.amountText}>{'₹2,28,000'}</Text>
              </View>
            </View>
            <View style={styles.boxSeperator} />
            <View style={styles.boxBottomView}>
              <Text style={styles.boxTitleText}>{'P&L'}</Text>
              <View style={commonStyles.flexRow}>
                <Text style={styles.diffAmountText}>{'+₹2,28,000'}</Text>
                <View style={styles.boxPercView}>
                  <Text style={styles.boxPercText}>{'+22%'}</Text>
                </View>
              </View>
            </View>
          </View>
        </Shadow>

        <View style={styles.chartContainer}>
          <LineChart
            // areaChart
            data={data}
            // dataPointsColor1="transparent"
            // dataPointsColor2="transparent"
            // dataPointsColor3="transparent"
            showDataPointOnFocus
            color1={colors.orange}
            color2={colors.purple}
            color3={colors.greenLite}
            zIndex1={1}
            zIndex2={2}
            zIndex3={3}
            // isAnimated={true}
            // animateOnDataChange={true}
            thickness={2}
            xAxisLabelTextStyle={styles.xAxisLabel}
            yAxisTextStyle={styles.yAxisLabel}
            height={250}
            width={390}
            // yAxisLabelTexts={['0', '20', '40', '60', '80', '100']}
            // backgroundColor={'red'}
            curved
            curvature={0.25}
            // curveType={''}
            data2={data2}
            data3={data3}
            // noOfSections={4}
            spacing={70}
            showVerticalLines={false}
            // verticalLinesColor={colors.borderColor}
            // verticalLinesThickness={0.7}
            // verticalLinesStrokeDashArray={[10, 30]}
            xAxisThickness={0}
            yAxisThickness={0}
            // noOfVerticalLines={4}
            xAxisTextNumberOfLines={0}
            yAxisTextNumberOfLines={0}
            hideYAxisText
            hideRules
            areaChart1={true}
            startFillColor={'#FF93644D'}
            endFillColor={'#F25F3300'}
            startOpacity={0.5}
            endOpacity1={0}
            // pointerConfig={pointerConfig}
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
                backgroundColor: 'red',
                borderRadius: wp(100),
                width: '100%',
                overflow: 'hidden',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '60%',
                  backgroundColor: colors.orange1,
                  height: '100%',
                }}
              />
              <View
                style={{
                  width: '20%',
                  backgroundColor: colors.greenLite,
                  height: '100%',
                }}
              />
              <View
                style={{
                  width: '20%',
                  backgroundColor: colors.purple,
                  height: '100%',
                }}
              />
            </View>
          </View>
        </View>

        <Shadow shadowStyle={styles.boxShadow}>
          {/* <View style={styles.boxContainer}> */}
          <FlatList
            data={indicatorListData}
            renderItem={renderGraphIndicator}
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
    lineHeight: hp(36),
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
    color: colors.greenNeon,
    fontSize: fontSize(18),
    fontFamily: font.semiBold,
  },
  boxPercView: {
    backgroundColor: colors.lightGreen,
    borderRadius: wp(100),
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    marginLeft: wp(6),
  },
  boxPercText: {
    color: colors.greenNeon,
    fontSize: fontSize(12),
    fontFamily: font.mMedium,
  },
  chartContainer: {
    // flex: 1,
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
