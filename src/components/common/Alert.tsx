import Toast from 'react-native-toast-message';
import {hp, isIos} from '../../utils';

const ToastAlert = ({
  title,
  description,
  toastType,
}: {
  toastType: 'error' | 'info' | 'success';
  title?: string;
  description?: string;
}) => {
  return Toast.show({
    type: toastType,
    text1: title,
    text2: description,
    position: 'top',
    topOffset: isIos ? hp(60) : hp(15),
    visibilityTime: 2000,
    autoHide: true,
  });
};

export default ToastAlert;
