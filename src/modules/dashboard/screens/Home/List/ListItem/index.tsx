import { memo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import Icon from '@app/shared/components/Icon';
import { tw } from '@app/shared/tailwind';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { HomeRouterParams } from '@/router/Home';

import { ListResponseItem } from '../schema';

interface ItemProps {
  data: ListResponseItem;
}

const ListItem = ({ data }: ItemProps) => {
  const navigation = useNavigation<NavigationProp<HomeRouterParams>>();

  const onPress = useCallback(() => {
    navigation.navigate('Details', data);
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
