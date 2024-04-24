import { ReactNode } from 'react';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';

import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
import { useDeviceContext } from 'twrnc';

import { tw } from '@/tailwind';

import Icon from '../../components/Icon';

SystemUI.setBackgroundColorAsync('#FFFFFF').catch(() => null);
NavigationBar.setBackgroundColorAsync('#FFFFFF').catch(() => null);
NavigationBar.setButtonStyleAsync('light').catch(() => null);

const ConfigTheme = ({ children }: { children: ReactNode }) => {
  useDeviceContext(tw, { observeDeviceColorSchemeChanges: false, initialColorScheme: 'light' });

  return (
    <PaperProvider
      settings={{ icon: ({ size, ...props }: any) => <Icon {...props} size={size * 0.8} /> }}
      theme={MD3LightTheme}
    >
      {children}
    </PaperProvider>
  );
};

export default ConfigTheme;
