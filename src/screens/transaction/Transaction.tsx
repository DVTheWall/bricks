/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import moment from 'moment';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { font } from '../../utils/fonts';
import { commonStyles } from '../../styles/styles';
import Header from '../../components/common/Header';
import Loader from '../../components/common/Loader';
import { colors, fontSize, hp, wp } from '../../utils';
import SearchBar from '../../components/common/SearchBar';
import { getMyTransactionsList } from '../../store/action/transactionActions';
import TransactionListItem from '../../components/transaction/TransactionListItem';
import TransactionFilterSheet from '../../components/transaction/TransactionFilterSheet';

const Transaction = () => {
  // const {userData} = useSelector((state: any) => state.auth);
  const { myTransactionsList } = useSelector((state: any) => state.data);
  const dispatch = useDispatch();
  const [searchText, setSerachText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    fromDateFormate: '',
    toDateFormate: '',
    transactionType: '',
    status: '',
    paymentMode: '',
  });

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  useEffect(() => {
    getTransactionList(searchText);
  }, [filters]);

  const getTransactionList = (searchQuery: string) => {
    setIsLoading(true);
    const request = {
      data: {
        property_id: searchQuery,
        type: filters.transactionType,
        workflow_state: filters.status,
        payment_mode:
          filters.paymentMode === 'Online'
            ? '1'
            : filters.paymentMode === 'Offline'
              ? '0'
              : '',
        from_date: filters.formDateFormate,
        to_date: filters.toDateFormate,
      },
      onSuccess: (res: any | []) => {
        setIsLoading(false);
      },
      onFail: (err: any) => {
        setIsLoading(false);
      },
    };
    console.log("request", request?.data);

    dispatch(getMyTransactionsList(request) as never);
  };

  const renderTransactionHistory = ({ item }: any) => {
    return <TransactionListItem item={item} />;
  };

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      getTransactionList(searchQuery);
    }, 700),
    [],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTransactionList(searchText);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleSearchChange = (text: string) => {
    setSerachText(text);
    debouncedSearch(text);
  };

  const applyFilters = (selectedFilters: any) => {
    setFilters(selectedFilters);
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
        onFilterPress={() => setIsFilterOpen(true)}
        placeholder={'Search for transaction'}
        onChangeText={handleSearchChange}
      />
      <FlatList
        data={myTransactionsList}
        renderItem={renderTransactionHistory}
        ListFooterComponent={() => <View style={{ height: hp(60) }} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyView}>
            <Text style={{ fontSize: fontSize(20), color: colors.grey }}>
              {'No Data Found'}
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TransactionFilterSheet
        isVisible={isFilterOpen}
        onClose={toggleFilter}
        onApply={applyFilters}
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
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(50),
  },
  separator: {
    height: hp(1),
    backgroundColor: colors.mediumDarkBorder,
    marginHorizontal: wp(16),
  },
});
