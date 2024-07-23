/* eslint-disable react-native/no-inline-styles */
/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {font} from '../../../utils/fonts';
import {commonStyles} from '../../../styles/styles';
import Header from '../../../components/common/Header';
import {colors, fontSize, hp, wp} from '../../../utils';
import SearchBox from '../../../components/brokers/SearchBox';
import {propertySellingData} from '../../../utils/dataConstants';
import SellingPropertyItem from '../../../components/brokers/SellingPropertyItem';
import {SCREEN} from '../../../utils/screenConstants';
import {useDispatch, useSelector} from 'react-redux';
import {getPropertyList} from '../../../store/action/propertyActions';
import Loader from '../../../components/common/Loader';
import {debounce} from 'lodash';
import PropertyFilterSheet from '../../../components/properties/PropertyFilterSheet';

const PropertyList = ({navigation, route}: any) => {
  const {propertyList} = useSelector((state: any) => state.data);
  const selectedCategory = route?.params?.category ?? '';

  const dispatch = useDispatch();

  const [searchText, setSerachText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    selectedCategories: [],
    minRate: '',
    maxRate: '',
  });

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  useEffect(() => {
    getPropertyListData(searchText);
  }, [filters]);

  const getPropertyListData = (searchQuery: string) => {
    setIsLoading(true);
    const request = {
      data: {
        name: searchQuery,
        property_categorization: selectedCategory
          ? [selectedCategory]
          : filters.selectedCategories,
        minimum_rate: filters.minRate,
        maximum_rate: filters.maxRate,
      },
      onSuccess: (res: any | []) => {
        setIsLoading(false);
      },
      onFail: (err: any) => {
        setIsLoading(false);
      },
    };
    dispatch(getPropertyList(request) as never);
  };

  const applyFilters = (selectedFilters: any) => {
    setFilters(selectedFilters);
  };

  const renderSellingProperty = ({item}: any) => {
    return (
      <SellingPropertyItem
        item={item}
        onBuyNowPress={() => {
          navigation.navigate(SCREEN.PROPERTYDETAILS, {item: item});
        }}
      />
    );
  };

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      getPropertyListData(searchQuery);
    }, 700),
    [],
  );

  const handleSearchChange = (text: string) => {
    setSerachText(text);
    debouncedSearch(text);
  };

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Loader visible={isLoading} />
      <Header
        isBackButton
        title={'Properties'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <SearchBox
        value={searchText}
        onFilterPress={toggleFilter}
        placeholder={'Search for transaction'}
        onChangeText={handleSearchChange}
      />
      {/* <Text style={styles.titleText}>{'Hot Selling Properties'}</Text> */}
      <FlatList
        data={propertyList}
        renderItem={renderSellingProperty}
        style={styles.propertyListView}
        ListFooterComponent={() => <View style={{height: hp(150)}} />}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: hp(50),
            }}>
            <Text style={{fontSize: fontSize(20), color: colors.grey}}>
              {'No Data Found'}
            </Text>
          </View>
        )}
      />
      <PropertyFilterSheet
        isVisible={isFilterOpen}
        onClose={toggleFilter}
        onApply={applyFilters}
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
