/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';

import {font} from '../../utils/fonts';
import {fontSize, hp, wp} from '../../utils';
import {commonStyles} from '../../styles/styles';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import {transactionHistoryData} from '../../utils/dataConstants';
import TransactionListItem from '../../components/home/transaction/TransactionListItem';

const Transaction = () => {
  const [searchText, setSerachText] = useState('');

  const renderTransactionHistory = ({item}: any) => {
    return <TransactionListItem item={item} />;
  };

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Header
        title={'My Transactions'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <SearchBar
        value={searchText}
        onFilterPress={() => {}}
        placeholder={'Search for transaction'}
        onChangeText={text => setSerachText(text)}
      />
      <FlatList
        bounces={false}
        data={transactionHistoryData}
        renderItem={renderTransactionHistory}
        ListFooterComponent={() => <View style={{height: hp(60)}} />}
      />
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  customTitleStyle: {
    lineHeight: hp(36),
    letterSpacing: -0.5,
    fontSize: fontSize(24),
    fontFamily: font.semiBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
});
