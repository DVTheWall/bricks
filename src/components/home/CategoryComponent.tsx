/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {font} from '../../utils/fonts';
import CategoryListItem from './CategoryListItem';
import {colors, fontSize, hp, wp} from '../../utils';
// import {useNavigation} from '@react-navigation/native';

const CategoryComponent = ({data}: any) => {
  // const {navigate} = useNavigation();

  const renderCategoryItem = ({item}: any) => {
    return <CategoryListItem item={item} onPress={() => {}} />;
  };

  return (
    <View>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitleText}>{data?.section_name}</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>{'View all'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={data?.child_data}
        renderItem={renderCategoryItem}
        style={styles.categoryListStyle}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={() => <View style={{width: wp(40)}} />}
        ItemSeparatorComponent={() => <View style={{width: wp(12)}} />}
      />
    </View>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({
  subTitleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(20),
    justifyContent: 'space-between',
  },
  subTitleText: {
    lineHeight: hp(36),
    color: colors.black,
    letterSpacing: -0.5,
    fontFamily: font.bold,
    fontSize: fontSize(16),
  },
  viewAllText: {
    lineHeight: hp(36),
    letterSpacing: -0.5,
    color: colors.primary,
    fontSize: fontSize(13),
    fontFamily: font.semiBold,
  },
  categoryListStyle: {
    paddingLeft: wp(20),
    marginVertical: hp(16),
  },
});
