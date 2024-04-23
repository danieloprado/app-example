import { Dimensions } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import type { AppTheme } from '.';
import { darkTheme, lightTheme } from './colors';

const dimensions = Dimensions.get('screen');

export default function generateTheme(mode: 'dark' | 'light'): AppTheme {
  const base = mode === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return {
    ...base,
    dimensions: { width: dimensions.width, height: dimensions.height },
    colors: mode === 'light' ? lightTheme : darkTheme
  };
}
