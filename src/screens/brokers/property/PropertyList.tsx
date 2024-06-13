/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
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

const PropertyList = ({navigation}: any) => {
  const {propertyList} = useSelector((state: any) => state.data);

  const dispatch = useDispatch();

  const [searchText, setSerachText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const request = {
      // need to make it dynamic
      data: {
        name: '',
        property_categorization: '',
      },
      onSuccess: (res: any | []) => {
        setIsLoading(false);
      },
      onFail: (err: any) => {
        setIsLoading(false);
      },
    };
    dispatch(getPropertyList(request) as never);
  }, []);

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
        onFilterPress={() => {}}
        placeholder={'Search for transaction'}
        onChangeText={text => setSerachText(text)}
      />
      <Text style={styles.titleText}>{'Hot Selling Properties'}</Text>
      <FlatList
        data={propertyList}
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
