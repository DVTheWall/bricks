import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Market = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontSize: 20}}>Market Screen</Text>
    </View>
  );
};

export default Market;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
