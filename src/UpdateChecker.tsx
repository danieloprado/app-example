import { Modal, View } from 'react-native';

import * as Application from 'expo-application';

import { useTw } from '@/hooks/useTw';
import IconMessage from '@/shared/IconMessage';
import AppHeader from '@/shared/Layout/Header';
import useConfigStore from '@/stores/config';
import { openStore } from '@/utils/linking';

const buildNumber = Number(Application.nativeBuildVersion);

const UpdateChecker = () => {
  const tw = useTw();
  const visible = useConfigStore(store => store.minVersion > buildNumber);

  return (
    <Modal visible={visible} animationType='slide' statusBarTranslucent>
      <AppHeader />

      <View style={tw`flex-1 bg-background dark:bg-dark-background`}>
        <IconMessage
          icon='cellphone-arrow-down'
          message='Atualização'
          description='Parece que temos uma nova versão disponível, atualize para continuar a utilizar o aplicativo.'
          buttonIcon='open-in-new'
          buttonText='Atualizar agora'
          onPress={openStore}
        />
      </View>
    </Modal>
  );
};
export default UpdateChecker;
