import { Button, Text } from 'react-native-paper';

import Content from '@/modules/Shared/components/Content';
import AppHeader from '@/modules/Shared/components/Header';
import useAuthStore from '@/stores/auth';
import { tw } from '@/tailwind';

const OptionsScreen = () => {
  const clear = useAuthStore(store => store.clear);

  return (
    <>
      <AppHeader title='Options' disableBack />
      <Content>
        <Text>Options Screen</Text>

        <Button mode='contained' style={tw`mt-8`} onPress={clear}>
          Sair
        </Button>
      </Content>
    </>
  );
};

export default OptionsScreen;
