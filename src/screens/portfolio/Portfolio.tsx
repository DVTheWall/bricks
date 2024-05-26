import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Portfolio = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontSize: 20}}>Portfolio Screen</Text>
    </View>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
