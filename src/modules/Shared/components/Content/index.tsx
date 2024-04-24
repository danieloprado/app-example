import { memo, ReactNode, useCallback, useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
  SafeAreaView
} from 'react-native';

import { MotiView } from 'moti';
import { nanoid } from 'nanoid/non-secure';

import background from '@/assets/background.png';
import { IS_ANDROID } from '@/envs';
import { tw } from '@/tailwind';

import { ContentContext, ContentContextType } from './context';
import ContentFooter from './Footer';
import nestedComponent from '../../utils/nestedComponent';
import AppRefreshControl from '../RefreshControl';

interface IProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  disableSafeArea?: boolean;
  disablePadding?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  headerBackground?: boolean;
}

const ContentComponent = ({
  children,
  style,
  disableSafeArea: disableSafeAreaProp,
  disablePadding,
  headerBackground,
  refreshing,
  onRefresh
}: IProps) => {
  const [hideBackground, setHideBackground] = useState(false);
  const [footers, setFooters] = useState<{ id: string; children: ReactNode }[]>([]);

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setHideBackground(event.nativeEvent.contentOffset.y > 15);
  }, []);

  const disableSafeArea = disableSafeAreaProp ?? footers.length > 0;

  const contextValue = useMemo<ContentContextType>(
    () => ({
      registerFooter: children => {
        const id = nanoid();
        setFooters(footer => [...footer, { id, children }]);
        return () => setFooters(footer => footer.filter(footer => footer.id != id));
      }
    }),
    []
  );

  let ResultView = <View style={tw.style('flex-1', { 'p-5': !disablePadding }, style as any)}>{children}</View>;

  if (!disableSafeArea) {
    ResultView = <SafeAreaView style={tw`flex-1`}>{ResultView}</SafeAreaView>;
  }

  ResultView = (
    <ScrollView
      style={tw`flex-1`}
      contentContainerStyle={tw`flex-grow`}
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior='never'
      onScroll={onScroll}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps='handled'
      refreshControl={
        !!onRefresh ? <AppRefreshControl refreshing={refreshing ?? false} onRefresh={onRefresh} /> : undefined
      }
    >
      <ContentContext.Provider value={contextValue}>{ResultView}</ContentContext.Provider>
    </ScrollView>
  );

  if (!IS_ANDROID && !footers.length) {
    ResultView = (
      <KeyboardAvoidingView style={tw`flex-1`} behavior='padding'>
        {ResultView}
      </KeyboardAvoidingView>
    );
  }

  return (
    <>
      {headerBackground && (
        <MotiView
          pointerEvents='none'
          from={{ height: !hideBackground ? 0 : 200 }}
          animate={{ height: hideBackground ? 0 : 200 }}
          transition={{ type: 'timing', duration: 300 }}
          style={tw`absolute top-0 z-0 w-full`}
        >
          <Image style={tw`h-full w-full`} source={background} />
        </MotiView>
      )}

      {ResultView}

      {footers.map(({ id, children }) => (
        <View key={id}>{children}</View>
      ))}
    </>
  );
};

const Content = nestedComponent(memo(ContentComponent), {
  Footer: ContentFooter
});

export default Content;
