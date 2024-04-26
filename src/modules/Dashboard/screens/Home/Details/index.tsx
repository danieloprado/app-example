import { Text } from 'react-native-paper';

import { useRoute } from '@react-navigation/native';

import Content from '@/modules/Shared/components/Content';
import AppHeader from '@/modules/Shared/components/Header';
import { AppRouteUseParams } from '@/router';

const DetailsScreen = () => {
  const { params } = useRoute<AppRouteUseParams<'Details'>>();

  return (
    <>
      <AppHeader title='Details' />
      <Content>
        <Text>Details Screen: {params.name}</Text>
      </Content>
    </>
  );
};

export default DetailsScreen;
