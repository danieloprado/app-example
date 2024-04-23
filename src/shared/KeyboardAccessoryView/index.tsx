import React, { ReactNode, memo, useCallback, useEffect, useState } from 'react';
import {
  View,
  Keyboard,
  LayoutAnimation,
  LayoutAnimationType,
  LayoutChangeEvent,
  ViewStyle,
  SafeAreaView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IS_ANDROID } from '@/envs';
import { useTw } from '@/hooks/useTw';

interface KeyboardAccessoryViewProps {
  style?: ViewStyle;
  children: ReactNode;
}

const KeyboardAccessoryView = memo(({ style, children }: KeyboardAccessoryViewProps) => {
  const tw = useTw();
  const { bottom: safeAreaBottom } = useSafeAreaInsets();

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [accessoryHeight, setAccessoryHeight] = useState(50);

  useEffect(() => {
    if (IS_ANDROID) return;

    const showListener = Keyboard.addListener('keyboardWillShow', keyboardEvent => {
      if (!keyboardEvent.endCoordinates) return;

      LayoutAnimation.configureNext(accessoryAnimation(keyboardEvent.duration, keyboardEvent.easing));
      setKeyboardHeight(keyboardEvent.endCoordinates.height - safeAreaBottom);
    });

    const hideListener = Keyboard.addListener('keyboardWillHide', keyboardEvent => {
      LayoutAnimation.configureNext(accessoryAnimation(keyboardEvent.duration, keyboardEvent.easing));
      setKeyboardHeight(0);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [safeAreaBottom]);

  const onLayout = useCallback((layoutEvent: LayoutChangeEvent) => {
    setAccessoryHeight(layoutEvent.nativeEvent.layout.height);
  }, []);

  if (IS_ANDROID) {
    return (
      <View
        style={tw`border-t-[1px] border-outlineVariant bg-elevation-level2 dark:border-dark-outlineVariant dark:bg-dark-elevation-level2`}
      >
        <View style={tw.style('gap-3 p-3', style as any)}>{children}</View>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`bg-elevation-level2 dark:bg-dark-elevation-level2`}>
      <View style={{ minHeight: accessoryHeight + keyboardHeight }}>
        <View
          style={tw.style(
            'absolute left-0 right-0 border-t-[1px] border-outlineVariant bg-elevation-level2 dark:border-dark-outlineVariant dark:bg-dark-elevation-level2',
            { bottom: keyboardHeight, minHeight: accessoryHeight }
          )}
        >
          <View style={tw.style('gap-3 p-3', style as any)} onLayout={onLayout}>
            {children}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
});

function accessoryAnimation(duration: number, easing: LayoutAnimationType) {
  return LayoutAnimation.create(duration, LayoutAnimation.Types[easing], LayoutAnimation.Properties.opacity);
}

export default KeyboardAccessoryView;
