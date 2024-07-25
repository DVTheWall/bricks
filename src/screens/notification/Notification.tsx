/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { font } from '../../utils/fonts';
import { commonStyles } from '../../styles/styles';
import Header from '../../components/common/Header';
import { colors, fontSize, hp, wp } from '../../utils';
import { dummyNotifications } from '../../utils/dataConstants';
import NotificationListItem from '../../components/notification/NotificationListItem';
import { icons } from '../../utils/icons';

const Notification = () => {
  const renderNotifications = ({ item }: any) => {
    return <NotificationListItem item={item} />;
  };

  const ItemSeparatorComponent = () => {
    return <View style={styles.seperatorView} />;
  };
  const ListEmptyComponent = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 300, }}>
        <Image source={icons.notificationBing} style={{ height: 35, width: 35 }} />
        <Text style={{ alignSelf: "center", justifyContent: "center", fontSize: 20, color: "#000000" }}> No notification found! </Text>
      </View>)
  };

  return (
    <View style={commonStyles.container}>
      <SafeAreaView />
      <Header
        isBackButton
        title={'Notifications'}
        customTitleStyle={styles.customTitleStyle}
        customHeaderStyle={styles.customHeaderStyle}
      />
      <FlatList
        bounces={false}
        // data={dummyNotifications}
        data={[]}
        style={styles.flatListStyle}
        renderItem={renderNotifications}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  customTitleStyle: {
    fontSize: fontSize(24),
    fontFamily: font.semiBold,
  },
  customHeaderStyle: {
    paddingHorizontal: wp(16),
  },
  seperatorView: {
    borderBottomWidth: hp(0.5),
    borderColor: colors.borderColor,
  },
  flatListStyle: {
    marginTop: hp(8),
    borderTopWidth: hp(0.5),
    borderColor: colors.borderColor,
  },
});
