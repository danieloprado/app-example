import { memo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import Icon from '@/modules/Shared/components/Icon';
import { tw } from '@/tailwind';

import { ListResponseItem } from '../schema';

interface ItemProps {
  data: ListResponseItem;
}

const ListItem = ({ data }: ItemProps) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('Details', data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigation]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={tw`flex-row items-center gap-5 p-[2]`}>
        <View style={tw`min-h-[50px] w-[80px] items-center justify-center rounded-xl`}>
          <Icon name={data.icon} size={40} />
        </View>
        <Text>{data.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ListItem);
