import { useCallback } from 'react';
import { View } from 'react-native';
import { Button, List, Text } from 'react-native-paper';

import * as Application from 'expo-application';

import { PRIVACY_URL } from '@/envs';
import { Dialog } from '@/feedback';
import { useTw } from '@/hooks/useTw';
import Icon from '@/shared/Icon';
import useConfigStore from '@/stores/config';
import { getDeviceName } from '@/utils/device';
import { openInAppBrowser, openSupportEmail } from '@/utils/linking';

const OptionsScreen = () => {
  const tw = useTw();
  const themeMode = useConfigStore(store => store.themeMode);
  const setThemeMode = useConfigStore(store => store.setThemeMode);

  const deviceName = getDeviceName();
  const version = Application.nativeApplicationVersion;
  const buildNumber = Application.nativeBuildVersion;

  const onPressTheme = useCallback(() => {
    Dialog.options({
      title: 'Tema',
      message: 'Escolha o tema do app',
      options: [
        { value: 'system', label: 'Automático', icon: 'brightness-6' },
        { value: 'light', label: 'Claro', icon: 'brightness-5' },
        { value: 'dark', label: 'Escuro', icon: 'brightness-4' }
      ],
      onComplete: option => {
        if (!option) return;
        setThemeMode(option as any);
      }
    });
  }, [setThemeMode]);

  const onPressTerms = useCallback(() => {
    openInAppBrowser(PRIVACY_URL);
  }, []);

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1`}>
        <List.Section title='Configurações'>
          <List.Item
            title='Tema'
            onPress={onPressTheme}
            left={props => <List.Icon {...props} icon='brightness-6' />}
            right={() => (
              <View style={tw`flex-row items-center gap-1`}>
                <Text>{themeMode === 'light' ? 'Claro' : themeMode === 'dark' ? 'Escuro' : 'Automático'}</Text>
                <Icon name='chevron-right' size={20} />
              </View>
            )}
          />
        </List.Section>
      </View>

      <View style={tw`gap-4 p-4`}>
        <View>
          <Text style={tw`text-center opacity-70`} variant='bodyLarge'>
            App Example
          </Text>
          <Text style={tw`text-center opacity-70`} variant='bodySmall'>
            v{version} ({buildNumber})
          </Text>
          <Text style={tw`text-center opacity-70`} variant='bodySmall'>
            {deviceName}
          </Text>
        </View>

        <Button icon='email-fast' mode='contained-tonal' onPress={openSupportEmail}>
          Suporte
        </Button>

        <Button icon='shield-account' mode='contained-tonal' onPress={onPressTerms}>
          Termos e a Política de Privacidade
        </Button>
      </View>
    </View>
  );
};

export default OptionsScreen;
