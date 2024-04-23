import { ReactNode, memo, useEffect, useRef, useState } from 'react';
import { MD3Theme, PaperProvider } from 'react-native-paper';

import Icon from '@/shared/Icon';

import generateTheme from './generateTheme';

export type AppTheme = MD3Theme & {
  dimensions: { width: number; height: number };
};

interface ConfigPaperProps {
  children?: ReactNode;
  themeMode: 'dark' | 'light';
}

const ConfigPaper = memo(({ children, themeMode }: ConfigPaperProps) => {
  const firstRender = useRef(true);
  const [theme, setTheme] = useState(() => generateTheme(themeMode));

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setTheme(generateTheme(themeMode));
  }, [themeMode]);

  return (
    <PaperProvider
      settings={{ icon: ({ size, ...props }: any) => <Icon {...props} size={size * 0.8} /> }}
      theme={theme}
    >
      {children}
    </PaperProvider>
  );
});

export default ConfigPaper;
