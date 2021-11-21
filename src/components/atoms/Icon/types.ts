import { StyleProp, ViewStyle } from 'react-native';
import type { Icons } from './icons';

export type { Icons };
export type IconProps = {
  name: Icons;
  size?: number;
  viewBox?: string;
  style?: StyleProp<ViewStyle>;
  fill?: string;
  fillRule?: 'nonzero' | 'evenodd';
  stroke?: string;
  strokeWidth?: number;
  color?: string;
};
