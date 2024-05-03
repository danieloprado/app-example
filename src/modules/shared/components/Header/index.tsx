import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { tw } from '@/tailwind';

import AppStatusBar from '../StatusBar';

interface AppHeaderProps {
  title: string;
  children?: ReactNode;
  onClose?: () => void;
  disableBack?: boolean;
  disableStatusBar?: boolean;
  rightClose?: boolean;
  transparent?: boolean;
  style?: ViewStyle;
}

const AppHeader = ({
  title,
  onClose,
  rightClose,
  disableStatusBar,
  disableBack,
  style,
  transparent,
  children
}: AppHeaderProps) => {
  const navigation = useNavigation();

  return (
    <>
      <AppStatusBar />
      <Appbar.Header
        style={tw.style('shadow-md', style, { 'z-10 bg-transparent': transparent ?? false })}
        mode='center-aligned'
        statusBarHeight={disableStatusBar ? 0 : undefined}
      >
        {navigation.canGoBack() && !disableBack && !onClose && (
          <IconButton icon='chevron-left' size={35} onPress={() => navigation.goBack()} />
        )}
        {onClose && !rightClose && <IconButton icon='close' size={30} onPress={onClose} />}
        <Appbar.Content title={title} />
        {children}
        {onClose && rightClose && <Appbar.Action icon='close' size={30} onPress={onClose} />}
      </Appbar.Header>
    </>
  );
};

AppHeader.Action = Appbar.Action;

export default AppHeader;
