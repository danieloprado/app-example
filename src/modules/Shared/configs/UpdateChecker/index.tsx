import { Modal, View } from 'react-native';

import * as Application from 'expo-application';

import useConfigStore from '@/stores/config';
import { tw } from '@/tailwind';

import AppHeader from '../../components/Header';
import IconMessage from '../../components/IconMessage';
import { openStore } from '../../utils/linking';

const buildNumber = Number(Application.nativeBuildVersion);

const UpdateChecker = () => {
  const visible = useConfigStore(store => store.minVersion > buildNumber);

  return (
    <Modal visible={visible} animationType='slide' statusBarTranslucent>
      <AppHeader />

      <View style={tw`flex-1 bg-white dark:bg-neutral-900`}>
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
