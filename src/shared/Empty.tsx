import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useTw } from '@/hooks/useTw';

import Icon from './Icon';

const Empty = () => {
  const tw = useTw();

  return (
    <View style={tw`mt-[20%] items-center justify-center`}>
      <Icon name='car-off' size={80} style={tw`mb-8 opacity-80`} />
      <Text variant='titleMedium'>Não encontramos nada</Text>
    </View>
  );
};

export default Empty;
