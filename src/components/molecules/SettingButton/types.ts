import { Icons } from '@app/components/atoms/Icon/types';
import { StyleProp, ViewStyle } from 'react-native';

export type SettingButtonProps = {
  icon?: Icons;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  title: string;
  info?: string;
  enabled?: boolean;
};
