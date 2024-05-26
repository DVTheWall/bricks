import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Transaction = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontSize: 20}}>Transaction Screen</Text>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
