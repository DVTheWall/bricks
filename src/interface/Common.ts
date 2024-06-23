import {AnimationObject} from 'lottie-react-native';
import {
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface IRootState {
  common: ICommon;
}

export interface ICommon {
  test: string;
}

export interface ShadowProps {
  children?: any;
  shadowStyle?: StyleProp<ViewStyle>;
}

export interface CustomButtonProps {
  loader?: boolean;
  disable?: boolean;
  title: string;
  isIcon?: boolean;
  onPress: () => void;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  shadowStyle?: StyleProp<ViewStyle>;
}

export interface FABProps {
  onPress: () => void;
}

export interface HeaderProps {
  name?: string;
  title?: string;
  isBackButton?: boolean;
  onLeftIconPress?: () => void;
  onRightIconPress1?: () => void;
  onRightIconPress2?: () => void;
  customNameStyle?: StyleProp<TextStyle>;
  customTitleStyle?: StyleProp<TextStyle>;
  customHeaderStyle?: StyleProp<ViewStyle>;
}

export interface SearchBarProps {
  value: string;
  placeholder?: string;
  onFilterPress: () => void;
  onChangeText: (text: string) => void;
}

export interface TextInputProps {
  value: string;
  label?: string;
  error?: string;
  maxLength?: number;
  editable?: boolean;
  onBlur?: () => void;
  multiline?: boolean;
  onFocus?: () => void;
  placeholder?: string;
  isMandetory?: boolean;
  isRightIcon?: boolean;
  onRightIconPress?: () => void;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  customLabelStyle?: StyleProp<TextStyle>;
  customInputStyle?: StyleProp<TextStyle>;
  customShadowStyle?: StyleProp<ViewStyle>;
  customTextBoxStyle?: StyleProp<ViewStyle>;
}

export interface StepIndicatorProps {
  step?: number;
  isLine?: boolean;
  bgColor?: string;
}

export interface LottieViewerProps {
  children: any;
  loop?: boolean;
  lottieStyle: StyleProp<ViewStyle>;
  source: string | AnimationObject | {uri: string};
}
