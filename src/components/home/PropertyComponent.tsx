import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {font} from '../../utils/fonts';
import {commonStyles} from '../../styles/styles';
import PropertyItemList from './PropertyItemList';
import {SCREEN} from '../../utils/screenConstants';
import {colors, fontSize, hp, wp} from '../../utils';

const PropertyComponent = ({data}: any) => {
  const {navigate} = useNavigation();

  const renderHotPropertiesItem = ({item}: any) => {
    return (
      <PropertyItemList
        item={item}
        onBuyNowPress={() => {
          //@ts-ignore
          navigate(SCREEN.PROPERTYDETAILS, {item: item});
        }}
      />
    );
  };

  return (
    <View>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitleText}>{data?.section_name}</Text>
        <TouchableOpacity
          style={commonStyles.flexRow}
          onPress={() => {
            //@ts-ignore
            navigate(SCREEN.PROPERTYLIST, {
              isFromCustomer: true,
            });
          }}>
          <Text style={styles.viewAllText}>{'More'}</Text>
          {/* <Image source={icons.downChevron} style={styles.downChevron} /> */}
        </TouchableOpacity>
      </View>
      <FlatList
        key={1}
        numColumns={2}
        data={data?.child_data}
        renderItem={renderHotPropertiesItem}
        style={styles.propertyListStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PropertyComponent;

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
  propertyListStyle: {
    marginTop: hp(16),
    marginHorizontal: wp(10),
  },
});
