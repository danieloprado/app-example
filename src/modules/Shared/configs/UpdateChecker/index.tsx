import { Modal, SafeAreaView } from 'react-native';

import * as Application from 'expo-application';

import useConfigStore from '@/stores/config';
import { tw } from '@/tailwind';

import IconMessage from '../../components/IconMessage';
import { openStore } from '../../utils/linking';

const buildNumber = Number(Application.nativeBuildVersion);

const UpdateChecker = () => {
  const visible = useConfigStore(store => store.minVersion > buildNumber);

  return (
    <Modal visible={visible} animationType='slide' statusBarTranslucent>
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <IconMessage
          icon='cellphone-arrow-down'
          message='Atualização'
          description='Parece que temos uma nova versão disponível, atualize para continuar a utilizar o aplicativo.'
          buttonIcon='open-in-new'
          buttonText='Atualizar agora'
          onPress={openStore}
        />
      </SafeAreaView>
    </Modal>
  );
};
export default UpdateChecker;
