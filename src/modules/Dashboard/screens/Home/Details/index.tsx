import { Text } from 'react-native-paper';

import Content from '@app/shared/components/Content';
import AppHeader from '@app/shared/components/Header';
import { useRoute } from '@react-navigation/native';

import { HomeRouterProps } from '@/router/Home';

const DetailsScreen = () => {
  const { params } = useRoute<HomeRouterProps<'Details'>['route']>();

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
