// OTPInput.tsx
import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

import Shadow from './Shadow';
import {colors, fontSize, hp, wp} from '../../utils';

interface OTPInputProps {
  onOTPComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({onOTPComplete}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const focusNext = (index: number) => {
    if (index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const focusPrevious = (index: number) => {
    if (index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    setOtp(newOtp, () => {
      if (text) {
        focusNext(index + 1);
      }

      if (index === 3 && text) {
        onOTPComplete(newOtp.join(''));
      }
    });
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      focusPrevious(index);
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <Shadow shadowStyle={styles.shadowStyle}>
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            style={{...styles.input, marginRight: index < 3 ? wp(8) : 0}}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
          />
        </Shadow>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shadowStyle: {
    flex: 1,
    shadowRadius: 20,
    shadowOpacity: 0.06,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: hp(-5),
    },
  },
  input: {
    height: hp(42),
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: wp(6),
    fontSize: fontSize(14),
    backgroundColor: colors.white,
    borderColor: colors.darkBorder,
  },
});

export default OTPInput;
