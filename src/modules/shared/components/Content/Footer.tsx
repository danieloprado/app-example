import { ReactNode, useContext, useEffect } from 'react';
import { ViewStyle } from 'react-native';

import { ContentContext } from './context';
import KeyboardAccessoryView from '../KeyboardAccessoryView';

interface ContentFooter {
  children: ReactNode;
  style?: ViewStyle;
}

const ContentFooter = ({ children, style }: ContentFooter) => {
  const context = useContext(ContentContext);

  useEffect(() => {
    const unsub = context.registerFooter(<KeyboardAccessoryView style={style}>{children}</KeyboardAccessoryView>);
    return () => unsub();
  }, [children, context, style]);

  return null;
};

export default ContentFooter;
