/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';

import {font} from '../../utils/fonts';
import {fontSize, hp, wp} from '../../utils';
import {commonStyles} from '../../styles/styles';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import {transactionHistoryData} from '../../utils/dataConstants';
import TransactionListItem from '../../components/transaction/TransactionListItem';
import {useDispatch, useSelector} from 'react-redux';
import {getMyTransactionsList} from '../../store/action/transactionActions';
import Loader from '../../components/common/Loader';

const Transaction = () => {
  const {myTransactionsList} = useSelector((state: any) => state.data);
  const dispatch = useDispatch();
  const [searchText, setSerachText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const request = {
      // need to make it dynamic
      data: {
        customer: '9548456788',
        from_date: '2024-01-01',
        to_date: '2024-07-01',
        workflow_state: '',
      },
      onSuccess: (res: any | []) => {
        setIsLoading(false);
      },
      onFail: (err: any) => {
        setIsLoading(false);
      },
    };
    dispatch(getMyTransactionsList(request) as never);
  }, []);

  const renderTransactionHistory = ({item}: any) => {
    return <TransactionListItem item={item} />;
  };

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Loader visible={isLoading} />
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
        data={myTransactionsList}
        renderItem={renderTransactionHistory}
        ListFooterComponent={() => <View style={{height: hp(60)}} />}
      />
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  customTitleStyle: {
    letterSpacing: -0.5,
    fontSize: fontSize(24),
    fontFamily: font.semiBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
});
