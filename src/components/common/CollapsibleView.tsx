import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {colors, fontSize, wp} from '../../utils';
import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import {commonStyles} from '../../styles/styles';

const CollapsibleView = ({title, children}: any) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleExpanded = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpanded} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <View style={{transform: [{rotateX: isCollapsed ? '0deg' : '180deg'}]}}>
          <Image source={icons.downChevron} style={commonStyles.icon24} />
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.content}>{children}</View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: wp(1),
    borderColor: colors.borderColor,
    overflow: 'hidden',
  },
  header: {
    padding: wp(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: colors.darkGrey,
    fontSize: fontSize(15),
    fontFamily: font.semiBold,
  },
  content: {
    backgroundColor: colors.white,
  },
});

export default CollapsibleView;
