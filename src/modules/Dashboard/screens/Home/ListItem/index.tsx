import { memo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import Icon from '@/modules/Shared/components/Icon';
import { formatMoney } from '@/modules/Shared/formatters/money';
import { tw } from '@/tailwind';

import { SeizureRequestListResponseItem } from '../schema';

interface ItemProps {
  data: SeizureRequestListResponseItem;
}

const ListItem = ({ data }: ItemProps) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    // navigation.navigate('SeizureRequestDetails', { id: data.id, preview: data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, navigation]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={tw`flex-row gap-5 p-[2]`}>
        <View style={tw`min-h-[50px] w-[80px] items-center justify-center rounded-xl`}>
          <Icon name='car' size={40} />
        </View>
        <View style={tw`flex-1`}>
          <Text>
            <Icon name='pound' /> {data.chassi}
          </Text>
          {!!data.licensePlate && (
            <Text style={tw`opacity-70`}>
              <Icon name='card-text-outline' /> {data.licensePlate}
            </Text>
          )}
          <Text style={tw`opacity-70`} numberOfLines={1}>
            <Icon name='image-text' /> {data.maker} {data.model} {data.year}
          </Text>
          <Text style={tw`opacity-70`} numberOfLines={1}>
            <Icon name='cash-multiple' /> {data.reward ? formatMoney(data.reward) : 'Não informado'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ListItem);
