import { ReactNode } from 'react';
import { Image, View, ViewStyle } from 'react-native';
import { Appbar, IconButton, Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import logoLight from '@/assets/logo.png';
import { tw } from '@/tailwind';

import AppStatusBar from '../StatusBar';

interface AppHeaderProps {
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
  disableStatusBar?: boolean;
  showBackground?: boolean;
  rightClose?: boolean;
  transparent?: boolean;
  style?: ViewStyle;
}

function AppHeader({ title, onClose, rightClose, disableStatusBar, style, transparent, children }: AppHeaderProps) {
  const navigation = useNavigation();

  return (
    <>
      <AppStatusBar />
      <Appbar.Header
        style={tw.style(style ?? {}, { 'z-10 bg-transparent': transparent ?? false })}
        mode='center-aligned'
        statusBarHeight={disableStatusBar ? 0 : undefined}
      >
        {navigation.canGoBack() && !onClose && (
          <IconButton icon='chevron-left' size={35} onPress={() => navigation.goBack()} />
        )}
        {onClose && !rightClose && <IconButton icon='close' size={30} onPress={onClose} />}
        <Appbar.Content
          title={
            typeof title === 'string' ? (
              <Text variant='titleMedium'>{title}</Text>
            ) : (
              <View style={tw`flex-row items-center justify-center gap-1`}>
                <Image style={tw`max-h-[25px] max-w-[110px]`} source={logoLight} />
              </View>
            )
          }
        />
        {children}
        {onClose && rightClose && <Appbar.Action icon='close' size={30} onPress={onClose} />}
      </Appbar.Header>
    </>
  );
}

AppHeader.Action = Appbar.Action;

export default AppHeader;
