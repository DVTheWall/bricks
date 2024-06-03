/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';

import {font} from '../../../utils/fonts';
import {fontSize, hp, wp} from '../../../utils';
import FAB from '../../../components/common/FAB';
import {commonStyles} from '../../../styles/styles';
import {SCREEN} from '../../../utils/screenConstants';
import Header from '../../../components/common/Header';
import {ordersListData} from '../../../utils/dataConstants';
import SearchBox from '../../../components/brokers/SearchBox';
import OrderItemCard from '../../../components/orders/OrderItemCard';

const Orders = ({navigation}: any) => {
  const [searchText, setSerachText] = useState('');

  const renderOrderList = ({item}: any) => {
    return (
      <OrderItemCard
        item={item}
        isTopView
        onPress={() => navigation.navigate(SCREEN.ORDERDETAILS, {data: item})}
      />
    );
  };

  const ListFooterComponent = () => {
    return <View style={styles.footerView} />;
  };

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Header
        title={'Orders'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <SearchBox
        value={searchText}
        onFilterPress={() => {}}
        placeholder={'Search for Order'}
        onChangeText={text => setSerachText(text)}
      />
      <FlatList
        data={ordersListData}
        renderItem={renderOrderList}
        ListFooterComponent={ListFooterComponent}
      />
      <FAB onPress={() => navigation.navigate(SCREEN.ADDORDERS)} />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  customTitleStyle: {
    fontSize: fontSize(24),
    fontFamily: font.qBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
  footerView: {
    height: hp(60),
  },
});
