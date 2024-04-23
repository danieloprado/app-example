import { View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton, Text } from 'react-native-paper';

import { useTw } from '@/hooks/useTw';

import Icon, { SupportedIcons } from '../Icon';

interface IconMessageSmallProps {
  icon: SupportedIcons;
  message: string;
  description?: string;
  buttonIcon?: string;
  buttonStyle?: ViewStyle;
  onPress?: () => void;
}

const IconMessageSmall = ({ icon, message, description, buttonIcon, onPress, buttonStyle }: IconMessageSmallProps) => {
  const tw = useTw();

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={tw`flex-row items-center justify-center gap-3`}>
        <Icon name={icon} size={25} style={tw`opacity-80`} />
        <View style={tw`flex-1`}>
          <Text variant='bodyLarge'>{message}</Text>
          {!!description && <Text>{description}</Text>}
        </View>
        {!!onPress && (
          <IconButton
            icon={buttonIcon ?? 'refresh'}
            mode='contained-tonal'
            style={buttonStyle}
            iconColor={(buttonStyle as any)?.color}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default IconMessageSmall;
