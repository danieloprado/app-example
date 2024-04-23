import { View, ViewStyle } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useTw } from '@/hooks/useTw';

import IconMessageSmall from './Small';
import Icon, { SupportedIcons } from '../Icon';

interface IconMessageProps {
  icon: SupportedIcons;
  message: string;
  description?: string;
  buttonIcon?: string;
  buttonText?: string;
  buttonLoading?: boolean;
  buttonStyle?: ViewStyle;
  onPress?: () => void;
  style?: ViewStyle;
  small?: boolean;
}

const IconMessage = ({
  icon,
  message,
  description,
  buttonText,
  buttonIcon,
  buttonLoading,
  buttonStyle,
  style,
  onPress,
  small
}: IconMessageProps) => {
  const tw = useTw();

  if (small) {
    return (
      <IconMessageSmall
        icon={icon}
        message={message}
        description={description}
        buttonIcon={buttonIcon}
        buttonStyle={buttonStyle}
        onPress={onPress}
      />
    );
  }

  return (
    <View style={tw.style('mt-[15%] items-center justify-center p-8', style)}>
      <Icon name={icon} size={80} style={tw`mb-2 opacity-80`} />
      <Text variant='headlineSmall' style={tw`text-center`}>
        {message}
      </Text>
      {!!description && (
        <Text variant='titleMedium' style={tw`text-center`}>
          {description}
        </Text>
      )}
      {!!onPress && (
        <Button
          icon={buttonIcon}
          loading={buttonLoading}
          disabled={buttonLoading}
          onPress={onPress}
          mode='contained'
          style={tw.style('mt-10 w-full min-w-[200px]', buttonStyle)}
        >
          {buttonText ?? 'Tentar Novamente'}
        </Button>
      )}
    </View>
  );
};

export default IconMessage;
