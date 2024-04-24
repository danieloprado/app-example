import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { tw } from '@/tailwind';

import Icon from './Icon';

const Empty = () => {
  return (
    <View style={tw`mt-[20%] items-center justify-center`}>
      <Icon name='car-off' size={80} style={tw`mb-8 opacity-80`} />
      <Text variant='titleMedium'>Não encontramos nada</Text>
    </View>
  );
};

export default Empty;
