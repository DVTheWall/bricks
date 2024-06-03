/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';

import {font} from '../../../utils/fonts';
import {commonStyles} from '../../../styles/styles';
import {SCREEN} from '../../../utils/screenConstants';
import Header from '../../../components/common/Header';
import {colors, fontSize, hp, wp} from '../../../utils';
import {customersList} from '../../../utils/dataConstants';
import SearchBox from '../../../components/brokers/SearchBox';
import CustomerListItem from '../../../components/customer/CustomerListItem';
import FAB from '../../../components/common/FAB';

const Customers = ({navigation}: any) => {
  const [searchText, setSerachText] = useState('');

  const renderCustomerList = ({item}: any) => {
    return (
      <CustomerListItem
        item={item}
        onCustomerPress={() => {
          navigation.navigate(SCREEN.CUSTOMERDETAILS, {data: item});
        }}
      />
    );
  };
  const ItemSeparatorComponent = () => {
    return <View style={styles.seperatorView} />;
  };
  const ListFooterComponent = () => {
    return <View style={styles.footerView} />;
  };

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Header
        title={'Customers'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <SearchBox
        value={searchText}
        onFilterPress={() => {}}
        placeholder={'Search for Customer'}
        onChangeText={text => setSerachText(text)}
      />
      <FlatList
        data={customersList}
        style={styles.flatListStyle}
        renderItem={renderCustomerList}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
      <FAB onPress={() => navigation.navigate(SCREEN.ADDCUSTOMER)} />
    </View>
  );
};

export default Customers;

const styles = StyleSheet.create({
  customTitleStyle: {
    fontSize: fontSize(24),
    fontFamily: font.qBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
  flatListStyle: {
    paddingHorizontal: wp(16),
  },
  seperatorView: {
    height: hp(1),
    marginVertical: hp(16),
    backgroundColor: colors.borderColor,
  },
  footerView: {
    height: hp(60),
  },
});
