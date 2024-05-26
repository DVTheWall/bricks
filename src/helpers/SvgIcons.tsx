import React from 'react';

import * as Icons from './SvgIndex';
import {wp, colors} from '../utils';

export type SvgIconsProps = {
  uri?: boolean;
  width?: number;
  height?: number;
  testID?: string;
  iconName?: string;
  disable?: boolean;
  iconColor?: string;
  gradient?: boolean;
  removeColor?: boolean;
  iconBorderColor?: string;
};

const SvgIconElement = (props: any) => {
  const Icon = GetIconFromLibrary(props.name);
  return (
    <Icon
      fill={props.fill}
      width={props.width}
      height={props.height}
      disable={props.disable}
      gradient={props.gradient}
      iconBorderColor={props.iconBorderColor}
      testID={`${props.testID}_${'SvgIconElement'}_${'1icon'}`}
    />
  );
};

const GetIconFromLibrary = (name: string) => {
  switch (name) {
    case 'backArrow':
      return Icons.BackArrow;
    case 'logo':
      return Icons.Logo;
    case 'welcomeImg':
      return Icons.WelcomeImg;
    case 'welcomeBottom':
      return Icons.WelcomeBottom;
    case 'loginImg':
      return Icons.LoginImg;
    case 'otpImg':
      return Icons.OtpImg;
    default:
      return Icons.BackArrow;
  }
};

const SvgIcons = (props: SvgIconsProps) => {
  const removeColorHandler = () => {
    if (!props.removeColor) {
      if (props.iconColor) {
        return props.iconColor;
      } else {
        return colors.white;
      }
    } else {
      return undefined;
    }
  };
  const getFillColor = () => {
    if (props.disable) {
      return '#B9BDC6';
    } else {
      return removeColorHandler();
    }
  };

  return (
    <>
      <SvgIconElement
        name={props.iconName}
        fill={getFillColor()}
        disable={props.disable}
        gradient={props.gradient}
        iconBorderColor={props.iconBorderColor}
        width={props.width ? props.width : wp(5)}
        height={props.height ? props.height : wp(5)}
      />
    </>
  );
};

export default SvgIcons;
