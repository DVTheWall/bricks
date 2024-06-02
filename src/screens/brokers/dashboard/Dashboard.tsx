/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors, fontSize, hp, wp} from '../../../utils';
import {font} from '../../../utils/fonts';
import {SCREEN} from '../../../utils/screenConstants';
import Header from '../../../components/common/Header';
import Shadow from '../../../components/common/Shadow';
import {commonStyles} from '../../../styles/styles';
import {LineChart} from 'react-native-gifted-charts';
import {periodDataList} from '../../../utils/dataConstants';
import {icons} from '../../../utils/icons';

export const DashCard = ({tintColor, bgColor, title, icon, count}: any) => {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        width: '31%',
        height: '100%',
        borderRadius: wp(6),
        paddingVertical: wp(13),
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Image
        source={icon}
        style={{...commonStyles.icon28, tintColor: tintColor}}
      />
      <Text
        style={{
          fontFamily: font.qSemiBold,
          fontSize: fontSize(18),
          lineHeight: hp(23),
          color: tintColor,
        }}>
        {count}
      </Text>
      <Text
        style={{
          fontFamily: font.qRegular,
          fontSize: fontSize(12),
          lineHeight: hp(17),
          color: colors.lightBlack,
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </View>
  );
};

const Dashboard = ({navigation}: any) => {
  const [periodData, setPeriodData] = useState(periodDataList);
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
  return (
    <View style={{flex: 1, backgroundColor: colors.homeBg}}>
      <SafeAreaView style={{backgroundColor: colors.white}} />
      <Header
        title={'Hello, '}
        name={'Quaid!'}
        onLeftIconPress={() => {}}
        onRightIconPress1={() => navigation.navigate(SCREEN.PAYMENT)}
        onRightIconPress2={() => navigation.navigate(SCREEN.NOTIFICATION)}
        customNameStyle={{fontFamily: font.qSemiBold}}
        customTitleStyle={{fontFamily: font.qRegular}}
      />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: wp(20),
            height: hp(131),
            marginTop: hp(24),
            justifyContent: 'space-between',
          }}>
          <DashCard
            icon={icons.customers}
            bgColor={colors.greenBg}
            title={'Total\nCustomers'}
            count={240}
            tintColor={colors.greenDark}
          />
          <DashCard
            icon={icons.buildings}
            bgColor={colors.orangeLight}
            title={'Property For\nSale'}
            count={20}
            tintColor={colors.orangeNeon}
          />
          <DashCard
            icon={icons.coin}
            bgColor={colors.lavenderLight}
            title={'Total Commission\nEarned'}
            count={20}
            tintColor={colors.lavender}
          />
        </View>

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
            data={data}
            showDataPointOnFocus
            color1={colors.orange}
            color2={colors.purple}
            color3={colors.greenLite}
            zIndex1={1}
            zIndex2={2}
            zIndex3={3}
            thickness={2}
            height={250}
            width={390}
            backgroundColor={colors.white}
            curved
            curvature={0.25}
            data2={data2}
            data3={data3}
            spacing={70}
            showVerticalLines={false}
            xAxisThickness={0}
            yAxisThickness={0}
            xAxisTextNumberOfLines={0}
            yAxisTextNumberOfLines={0}
            hideYAxisText
            hideRules
            areaChart1={true}
            startFillColor={'#FF93644D'}
            endFillColor={'#F25F3300'}
            startOpacity={0.5}
            endOpacity1={0}
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
                      color: item?.isSelected ? colors.white : colors.darkGrey,
                      fontFamily: font.qRegular,
                    }}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
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
    marginTop: hp(24),
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
    lineHeight: hp(23),
    fontFamily: font.qRegular,
  },
  amountText: {
    color: colors.black,
    fontSize: fontSize(20),
    lineHeight: hp(25),
    fontFamily: font.qSemiBold,
    marginTop: hp(6),
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
    lineHeight: hp(23),
    fontFamily: font.qSemiBold,
  },
  boxPercView: {
    backgroundColor: colors.lightGreen,
    borderRadius: wp(100),
    paddingHorizontal: wp(6),
    paddingVertical: hp(1),
    marginLeft: wp(6),
  },
  boxPercText: {
    fontSize: fontSize(12),
    color: colors.greenNeon,
    fontFamily: font.qMedium,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginTop: hp(24),
  },
});
