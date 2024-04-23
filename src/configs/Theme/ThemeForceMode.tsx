import { ReactNode, useState } from 'react';
import { ThemeProvider } from 'react-native-paper';

import generateTheme from './Paper/generateTheme';

interface ThemeForceModeProps {
  mode: 'light' | 'dark';
  children: ReactNode;
}

const ThemeForceMode = ({ mode, ...props }: ThemeForceModeProps) => {
  const [theme] = useState(() => generateTheme(mode));
  return <ThemeProvider theme={theme} {...props} />;
};

export default ThemeForceMode;
