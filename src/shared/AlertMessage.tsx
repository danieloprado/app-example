import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import { useTw } from '@/hooks/useTw';

import Icon from './Icon';

interface AlertProps {
  children: ReactNode;
  error?: boolean;
  style?: ViewStyle;
}

const AlertMessage = ({ children, error, style }: AlertProps) => {
  const tw = useTw();

  const textStyle = tw.style('flex-1', {
    'text-onErrorContainer dark:text-dark-onErrorContainer': error ?? false
  });

  return (
    <Surface
      mode='flat'
      elevation={2}
      style={tw.style(
        'mb-5 flex-row flex-wrap gap-3 rounded-lg p-3 ',
        { 'bg-errorContainer dark:bg-dark-errorContainer': error ?? false },
        style
      )}
    >
      <Icon name='alert-circle' size={20} color={textStyle.color as string} />
      <Text style={textStyle}>{children}</Text>
    </Surface>
  );
};

export default AlertMessage;
