import { StatusBar, StatusBarProps } from 'react-native';
import { useTheme } from 'react-native-paper';

import { STATUSBAR_ANDROID_BLACK } from '@/envs';

const AppStatusBar = ({ backgroundColor, ...props }: StatusBarProps) => {
  const theme = useTheme();

  return (
    <StatusBar
      animated
      translucent={true}
      barStyle={theme.dark ? 'light-content' : 'dark-content'}
      {...props}
      backgroundColor={!STATUSBAR_ANDROID_BLACK ? backgroundColor ?? 'transparent' : 'black'}
    />
  );
};

export default AppStatusBar;
