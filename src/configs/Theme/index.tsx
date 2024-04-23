import { ReactNode, useEffect, useMemo, useReducer } from 'react';
import { InteractionManager, useColorScheme } from 'react-native';

import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
import { useAppColorScheme, useDeviceContext } from 'twrnc';

import { IS_IOS } from '@/envs';
import useConfigStore from '@/stores/config';

import { TailwindContext } from './context';
import ConfigPaper from './Paper';
import { tw } from './tailwind';

const ConfigTheme = ({ children }: { children: ReactNode }) => {
  const [forcedUpdate, forceUpdate] = useReducer(x => x + 1, 0);

  const systemThemeMode: 'light' | 'dark' = useColorScheme() ?? 'light';
  const configThemeMode = useConfigStore(store => store.themeMode);

  const themeMode = useMemo(
    () => (configThemeMode === 'system' ? systemThemeMode : configThemeMode),
    [configThemeMode, systemThemeMode]
  );

  useDeviceContext(tw, { observeDeviceColorSchemeChanges: false, initialColorScheme: themeMode });
  const [colorScheme, , setColorScheme] = useAppColorScheme(tw);

  useEffect(() => {
    if (colorScheme === themeMode) return;
    setColorScheme(themeMode);
    forceUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeMode]);

  useEffect(() => {
    if (IS_IOS) return;

    const interation = InteractionManager.runAfterInteractions(() => {
      const background = themeMode === 'light' ? tw.color('background') : tw.color('dark-background');

      SystemUI.setBackgroundColorAsync(background ?? '#FFFFFF').catch(() => null);
      NavigationBar.setBackgroundColorAsync(background ?? '#FFFFFF').catch(() => null);
      NavigationBar.setButtonStyleAsync(themeMode).catch(() => null);
    });

    return () => interation.cancel();
  }, [themeMode]);

  return (
    <TailwindContext.Provider value={forcedUpdate}>
      <ConfigPaper themeMode={themeMode}>{children}</ConfigPaper>
    </TailwindContext.Provider>
  );
};

export default ConfigTheme;
