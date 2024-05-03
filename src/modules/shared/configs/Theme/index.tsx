import { ReactNode } from 'react';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';

import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
import { useDeviceContext } from 'twrnc';

import Icon from '@/components/Icon';
import { IS_ANDROID } from '@/envs';
import { tw } from '@/tailwind';

SystemUI.setBackgroundColorAsync('#FFFFFF').catch(() => null);
IS_ANDROID && NavigationBar.setBackgroundColorAsync('#FFFFFF').catch(() => null);
IS_ANDROID && NavigationBar.setButtonStyleAsync('light').catch(() => null);

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'rgb(15, 97, 164)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(210, 228, 255)',
    onPrimaryContainer: 'rgb(0, 28, 55)'
  }
};

const ConfigTheme = ({ children }: { children: ReactNode }) => {
  useDeviceContext(tw, { observeDeviceColorSchemeChanges: false, initialColorScheme: 'light' });

  return (
    <PaperProvider
      settings={{ icon: ({ size, ...props }: any) => <Icon {...props} size={size * 0.8} /> }}
      theme={theme}
    >
      {children}
    </PaperProvider>
  );
};

export default ConfigTheme;
