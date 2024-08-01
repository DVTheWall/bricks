/* eslint-disable quotes */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Shadow from '../common/Shadow';
import { font } from '../../utils/fonts';
import { icons } from '../../utils/icons';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, hp, wp } from '../../utils';

const TransactionFilterSheet = ({ isVisible, onClose, onApply }: any) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('Transaction Type');
  const [transactionType, setTransactionType] = useState('');
  const [status, setStatus] = useState<string[]>([]);
  const [paymentMode, setPaymentMode] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState({ show: false, type: '' });

  const categories = [
    'Transaction Type',
    'Status',
    'Payment Mode',
    'Time Period',
  ];
  const transactionOptions = ['Credit', 'Debit'];
  const statusOptions = ['Pending', 'Processing', 'Approved', 'Rejected'];
  const paymentModeOptions = ['Online', 'Offline'];

  const handleDateChange = (selectedDate: any) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker({ show: false, type: '' });
    if (showDatePicker.type === 'from') {
      if (currentDate > toDate) {
        setToDate(currentDate);
      }
      setFromDate(currentDate);
    } else {
      if (currentDate < fromDate) {
        setFromDate(currentDate);
      }
      setToDate(currentDate);
    }
  };

  const onApplyPress = () => {
    let formDateFormate = moment(fromDate).format('YYYY-MM-DD');
    let toDateFormate = moment(toDate).format('YYYY-MM-DD');
    const filters = {
      transactionType,
      status,
      formDateFormate,
      toDateFormate,
      paymentMode,
    };
    onApply && onApply(filters);
    onClose && onClose();
  };

  const clearFilter = () => {
    setTransactionType('');
    setStatus([]);
    setPaymentMode('');
    setFromDate(new Date());
    setToDate(new Date());
  };

  const toggleStatusOption = (option: string) => {
    setStatus(prevStatus =>
      prevStatus.includes(option)
        ? prevStatus.filter(item => item !== option)
        : [...prevStatus, option],
    );
  };

  const renderCategory = ({ item }: any) => (
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
      case 'Transaction Type':
        return transactionOptions.map(option => (
          <TouchableOpacity
            onPress={() =>
              transactionType === option
                ? setTransactionType('')
                : setTransactionType(option)
            }
            style={commonStyles.flexRow}
            key={option}>
            <View
              style={{
                ...styles.radioBorder,
                borderColor:
                  transactionType === option
                    ? colors.primary
                    : colors.mediumGrey,
              }}>
              {transactionType === option && (
                <View style={styles.activeRadio} />
              )}
            </View>
            <Text
              style={[
                styles.optionText,
                transactionType === option && styles.selectedOption,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ));
      case 'Status':
        return statusOptions.map(option => (
          <TouchableOpacity
            onPress={() => toggleStatusOption(option)}
            style={commonStyles.flexRow}
            key={option}>
            <View
              style={{
                ...styles.checkBoxBorder,
                borderColor: status.includes(option)
                  ? colors.primary
                  : colors.mediumGrey,
                backgroundColor: status.includes(option)
                  ? colors.primary
                  : colors.transparent,
              }}>
              {status.includes(option) && (
                <Image
                  source={icons.checkMark}
                  style={{ ...commonStyles.icon12, tintColor: colors.white }}
                />
              )}
            </View>
            <Text
              style={[
                styles.optionText,
                status.includes(option) && styles.selectedOption,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ));
      case 'Payment Mode':
        return paymentModeOptions.map(option => (
          <TouchableOpacity
            onPress={() =>
              paymentMode === option
                ? setPaymentMode('')
                : setPaymentMode(option)
            }
            style={commonStyles.flexRow}
            key={option}>
            <View
              style={{
                ...styles.radioBorder,
                borderColor:
                  paymentMode === option ? colors.primary : colors.mediumGrey,
              }}>
              {paymentMode === option && <View style={styles.activeRadio} />}
            </View>
            <Text
              style={[
                styles.optionText,
                paymentMode === option && styles.selectedOption,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ));
      case 'Time Period':
        return (
          <View style={{ padding: wp(10) }}>
            <Text style={styles.dateTypeText}>{'From:'}</Text>
            <TouchableOpacity
              style={styles.dateView}
              onPress={() => setShowDatePicker({ show: true, type: 'from' })}>
              <Text>{moment(fromDate).format('YYYY-MM-DD')}</Text>
            </TouchableOpacity>
            <View style={{ height: hp(10) }} />
            <Text style={styles.dateTypeText}>{'To:'}</Text>
            <TouchableOpacity
              style={styles.dateView}
              onPress={() => setShowDatePicker({ show: true, type: 'to' })}>
              <Text>{moment(toDate).format('YYYY-MM-DD')}</Text>
            </TouchableOpacity>
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
          {showDatePicker.show && (
            <DatePicker
              modal
              open={showDatePicker.show}
              date={showDatePicker.type === 'from' ? fromDate : toDate}
              onConfirm={handleDateChange}
              onCancel={() => {
                setShowDatePicker({ show: false, type: '' });
              }}
              buttonColor={colors.primary}
              mode="date"
              maximumDate={new Date()}
              dividerColor={colors.primary}
              title={
                showDatePicker.type === 'from'
                  ? `Select "From Date"`
                  : `Select "To Date"`
              }
            />
          )}
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
  checkBoxBorder: {
    height: wp(20),
    width: wp(20),
    borderRadius: wp(2),
    borderWidth: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TransactionFilterSheet;
