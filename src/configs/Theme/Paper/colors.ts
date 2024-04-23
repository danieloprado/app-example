import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import { tw } from '../tailwind';

export const lightTheme = {
  ...MD3LightTheme.colors,
  backdrop: tw.color('backdrop')!,
  primary: tw.color('primary')!,
  onPrimary: tw.color('onPrimary')!,
  primaryContainer: tw.color('primaryContainer')!,
  onPrimaryContainer: tw.color('onPrimaryContainer')!,
  secondary: tw.color('secondary')!,
  onSecondary: tw.color('onSecondary')!,
  secondaryContainer: tw.color('secondaryContainer')!,
  onSecondaryContainer: tw.color('onSecondaryContainer')!,
  elevation: {
    level0: tw.color('elevation-level0')!,
    level1: tw.color('elevation-level1')!,
    level2: tw.color('elevation-level2')!,
    level3: tw.color('elevation-level3')!,
    level4: tw.color('elevation-level4')!,
    level5: tw.color('elevation-level5')!
  }
};

export const darkTheme = {
  ...MD3DarkTheme.colors,
  backdrop: tw.color('dark-backdrop')!,
  primary: tw.color('dark-primary')!,
  onPrimary: tw.color('dark-onPrimary')!,
  primaryContainer: tw.color('dark-primaryContainer')!,
  onPrimaryContainer: tw.color('dark-onPrimaryContainer')!,
  secondary: tw.color('dark-secondary')!,
  onSecondary: tw.color('dark-onSecondary')!,
  secondaryContainer: tw.color('dark-secondaryContainer')!,
  onSecondaryContainer: tw.color('dark-onSecondaryContainer')!,
  elevation: {
    level0: tw.color('dark-elevation-level0')!,
    level1: tw.color('dark-elevation-level1')!,
    level2: tw.color('dark-elevation-level2')!,
    level3: tw.color('dark-elevation-level3')!,
    level4: tw.color('dark-elevation-level4')!,
    level5: tw.color('dark-elevation-level5')!
  }
};
