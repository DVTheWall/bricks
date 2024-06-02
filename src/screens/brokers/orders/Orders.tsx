import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fontSize} from '../../../utils';
import FAB from '../../../components/common/FAB';

const Orders = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: fontSize(20), color: colors.black}}>
          Orders
        </Text>
      </View>
      <FAB />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
