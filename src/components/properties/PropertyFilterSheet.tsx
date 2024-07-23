/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Shadow from '../common/Shadow';
import {font} from '../../utils/fonts';
import {icons} from '../../utils/icons';
import TextInputComp from '../common/TextInput';
import {commonStyles} from '../../styles/styles';
import {colors, fontSize, hp, wp} from '../../utils';

const PropertyFilterSheet = ({isVisible, onClose, onApply}: any) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxRate, setMaxRate] = useState('');
  const [minRate, setMinRate] = useState('');

  const categories = ['Category', 'Rate'];
  const categoryOptions = ['Villa', 'Hotel', 'School', 'House', 'Flat'];

  const onApplyPress = () => {
    const filters = {
      selectedCategories,
      maxRate,
      minRate,
    };
    onApply && onApply(filters);
    onClose && onClose();
  };

  const clearFilter = () => {
    setSelectedCategories([]);
    setMaxRate('');
    setMinRate('');
  };

  const handleCategorySelect = (option: string) => {
    if (selectedCategories.includes(option)) {
      setSelectedCategories(
        selectedCategories.filter(category => category !== option),
      );
    } else {
      setSelectedCategories([...selectedCategories, option]);
    }
  };

  const renderCategory = ({item}: any) => (
    <TouchableOpacity
      style={[
        styles.categoryView,
        selectedCategory === item && styles.selectedCategoryView,
      ]}
      onPress={() => setSelectedCategory(item)}>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategory,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderOptions = () => {
    switch (selectedCategory) {
      case 'Category':
        return categoryOptions.map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => handleCategorySelect(option)}
            style={commonStyles.flexRow}>
            <View
              style={{
                ...styles.checkBoxBorder,
                borderColor: selectedCategories.includes(option)
                  ? colors.primary
                  : colors.mediumGrey,
                backgroundColor: selectedCategories.includes(option)
                  ? colors.primary
                  : colors.transparent,
              }}>
              {selectedCategories.includes(option) && (
                <Image
                  source={icons.checkMark}
                  style={{...commonStyles.icon12, tintColor: colors.white}}
                />
              )}
            </View>
            <Text
              style={[
                styles.optionText,
                selectedCategories.includes(option) && styles.selectedOption,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ));
      case 'Rate':
        return (
          <View style={{padding: wp(10)}}>
            <Text style={styles.dateTypeText}>{'Minimum Rate:'}</Text>
            <TextInputComp
              placeholder={`Minimum Rate`}
              value={minRate}
              onChangeText={text => setMinRate(text)}
              customShadowStyle={{shadowOpacity: 0}}
              customTextBoxStyle={{borderRadius: wp(6)}}
              keyboardType={'number-pad'}
            />
            <View style={{height: hp(10)}} />
            <Text style={styles.dateTypeText}>{'Maximum Rate:'}</Text>
            <TextInputComp
              customShadowStyle={{shadowOpacity: 0}}
              customTextBoxStyle={{borderRadius: wp(6)}}
              placeholder={`Maximum Rate`}
              value={maxRate}
              onChangeText={text => setMaxRate(text)}
              keyboardType={'number-pad'}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.filterText}>{'Filter'}</Text>
          <TouchableOpacity onPress={onClose}>
            <Image source={icons.close} style={commonStyles.icon20} />
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.leftSection}>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={item => item}
            />
          </View>
          <View style={styles.rightSection}>{renderOptions()}</View>
        </View>
        <Shadow shadowStyle={styles.bottomBtnShadow}>
          <View
            style={{
              ...styles.bottomBtnContainer,
              paddingBottom: insets.bottom + hp(8),
            }}>
            <TouchableOpacity onPress={clearFilter}>
              <Text style={styles.clearText}>{'Clear All'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={onApplyPress}>
              <Text style={styles.applyText}>{'Apply'}</Text>
            </TouchableOpacity>
          </View>
        </Shadow>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    height: '70%',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(14),
    borderBottomWidth: wp(1),
    borderColor: colors.mediumGrey,
  },
  activeRadio: {
    backgroundColor: colors.primary,
    height: wp(12),
    width: wp(12),
    borderRadius: wp(12),
  },
  radioBorder: {
    height: wp(20),
    width: wp(20),
    borderRadius: wp(20),
    borderWidth: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxBorder: {
    height: wp(20),
    width: wp(20),
    borderRadius: wp(2),
    borderWidth: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: fontSize(18),
    color: colors.black,
    fontFamily: font.bold,
  },
  dateTypeText: {
    fontSize: fontSize(15),
    color: colors.darkGrey,
    fontFamily: font.regular,
  },
  dateView: {
    borderColor: colors.darkBorder,
    padding: wp(10),
    borderRadius: wp(6),
    borderWidth: wp(1),
  },
  bottomBtnShadow: {
    shadowOffset: {
      width: 0,
      height: hp(-4),
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  bottomBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(8),
    paddingHorizontal: wp(16),
    backgroundColor: colors.white,
  },
  clearText: {
    fontSize: fontSize(16),
    color: colors.semiGrey,
    fontFamily: font.semiBold,
  },
  applyBtn: {
    height: hp(35),
    width: wp(150),
    borderRadius: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  applyText: {
    color: colors.white,
    fontSize: fontSize(16),
    fontFamily: font.semiBold,
  },
  leftSection: {
    width: '40%',
    paddingTop: wp(10),
    paddingLeft: wp(10),
    height: '100%',
    borderRightWidth: wp(1),
    borderColor: colors.mediumGrey,
  },
  rightSection: {
    width: '60%',
    padding: wp(10),
    height: '100%',
  },
  categoryText: {
    padding: wp(10),
    color: colors.black,
    fontSize: fontSize(14),
    fontFamily: font.regular,
  },
  categoryView: {
    borderColor: colors.primary,
  },
  selectedCategoryView: {
    borderColor: colors.primary,
    borderRightWidth: wp(3),
  },
  selectedCategory: {
    padding: wp(10),
    color: colors.primary,
    fontSize: fontSize(14),
    fontFamily: font.semiBold,
  },
  optionText: {
    padding: wp(10),
    color: colors.black,
    fontSize: fontSize(14),
    fontFamily: font.regular,
  },
  selectedOption: {
    padding: wp(10),
    color: colors.primary,
    fontSize: fontSize(14),
    fontFamily: font.semiBold,
  },
});

export default PropertyFilterSheet;
