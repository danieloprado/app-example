import { Button, Text } from 'react-native-paper';

import Content from '@app/shared/components/Content';
import AppHeader from '@app/shared/components/Header';
import useAuthStore from '@app/shared/stores/auth';
import { tw } from '@app/shared/tailwind';

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
