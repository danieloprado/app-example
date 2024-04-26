import { memo, ReactNode, useMemo, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleProp, View, ViewStyle, SafeAreaView } from 'react-native';

import { nanoid } from 'nanoid/non-secure';

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
}

const ContentComponent = ({
  children,
  style,
  disableSafeArea: disableSafeAreaProp,
  disablePadding,
  refreshing,
  onRefresh
}: IProps) => {
  const [footers, setFooters] = useState<{ id: string; children: ReactNode }[]>([]);
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
