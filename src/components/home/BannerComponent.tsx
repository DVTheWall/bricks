import React from 'react';
import {StyleSheet, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';

import {hp} from '../../utils';
import {screenWidth} from '../../utils/globalConstant';

const BannerComponent = ({data}: any) => {
  const renderBannerItem = ({item}: any) => (
    <View>
      <FastImage
        source={{uri: `https://bricks-dev.katsamsoft.com${item?.banner_image}`}}
        style={styles.image}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
        data={data?.child_data}
        renderItem={renderBannerItem}
        width={screenWidth}
        height={158}
        //   onSnapToItem={handleCarouselSnap}
      />
    </View>
  );
};

export default BannerComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(20),
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
