/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {font} from '../../../utils/fonts';
import {commonStyles} from '../../../styles/styles';
import Header from '../../../components/common/Header';
import {colors, fontSize, hp, wp} from '../../../utils';
import SearchBox from '../../../components/brokers/SearchBox';
import {propertySellingData} from '../../../utils/dataConstants';
import SellingPropertyItem from '../../../components/brokers/SellingPropertyItem';
import {SCREEN} from '../../../utils/screenConstants';

const PropertyList = ({route, navigation}: any) => {
  const {isFromCustomer} = route?.params || false;
  const [searchText, setSerachText] = useState('');

  const renderSellingProperty = ({item}: any) => {
    return (
      <SellingPropertyItem
        item={item}
        onBuyNowPress={() => {
          if (isFromCustomer) {
            navigation.navigate(SCREEN.PROPERTYDETAILS, {item: item});
          } else {
            navigation.navigate(SCREEN.PROPERTYDETAILSBROKER);
          }
        }}
      />
    );
  };
  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Header
        title={'Properties'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <SearchBox
        value={searchText}
        onFilterPress={() => {}}
        placeholder={'Search for transaction'}
        onChangeText={text => setSerachText(text)}
      />
      <Text style={styles.titleText}>{'Hot Selling Properties'}</Text>
      <FlatList
        data={propertySellingData}
        renderItem={renderSellingProperty}
        style={styles.propertyListView}
        ListFooterComponent={() => <View style={{height: hp(150)}} />}
      />
    </View>
  );
};

export default PropertyList;

const styles = StyleSheet.create({
  customTitleStyle: {
    fontSize: fontSize(24),
    fontFamily: font.qSemiBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
  propertyListView: {
    paddingHorizontal: wp(20),
  },
  titleText: {
    lineHeight: hp(20),
    color: colors.black,
    fontSize: fontSize(16),
    fontFamily: font.qBold,
    paddingLeft: wp(20),
    paddingBottom: hp(16),
  },
});
