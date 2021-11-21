import { Dimensions, Platform, useColorScheme } from 'react-native';
import primer from '@primer/primitives';
import type { Theme } from '@react-navigation/native';

const { dark, light } = primer.colors;

const { width, height } = Dimensions.get('window');

const device = {
  width,
  height,
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
};

const spacing = {
  small: 4,
  default: 16,
  medium: 8,
};

const darkTheme = {
  colors: {
    ...dark,
    text: {
      emphasis: dark.scale.white,
    },
  },
  device,
  spacing,
};

const lightTheme = {
  colors: {
    ...light,
    text: {
      emphasis: light.scale.black,
    },
  },
  device,
  spacing,
};

export type AppTheme = typeof darkTheme;

const navigatorDarkTheme: Theme = {
  dark: true,
  colors: {
    background: dark.canvas.default,
    card: dark.canvas.inset,
    border: dark.border.default,
    text: dark.fg.default,
    primary: dark.marketingIcon.secondary,
    notification: dark.menu.bgActive,
  },
};

const navigatorLightTheme: Theme = {
  dark: false,
  colors: {
    background: light.canvas.default,
    card: light.canvas.inset,
    border: light.border.default,
    text: light.fg.default,
    primary: light.marketingIcon.secondary,
    notification: light.menu.bgActive,
  },
};

export const useColorSchemeTheme = () => {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';

  return {
    theme: isDark ? darkTheme : lightTheme,
    navigatorTheme: isDark ? navigatorDarkTheme : navigatorLightTheme,
  };
};
