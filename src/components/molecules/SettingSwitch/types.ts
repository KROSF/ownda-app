import { Icons } from '@app/components/atoms/Icon/types';
import type { StyleProp, SwitchProps, ViewStyle } from 'react-native';

export type SettingSwitchProps = {
  icon?: Icons;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  title: string;
  switchStyle?: StyleProp<ViewStyle>;
} & Omit<SwitchProps, 'style'>;
