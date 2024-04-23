import { memo } from 'react';
import { ImageBackground, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';

import background from '@/assets/background.png';
import darkLogo from '@/assets/logo-icon-dark.png';
import lightLogo from '@/assets/logo-icon.png';
import { useTw } from '@/hooks/useTw';
import { authLoginSchema, AuthLoginRequest } from '@/schemas/auth/login';
import Form from '@/shared/Forms/Form';
import PasswordField from '@/shared/Forms/PasswordField';
import TextField from '@/shared/Forms/TextField';
import useForm from '@/shared/Forms/useForm';
import ImageThemed from '@/shared/ImageThemed';
import Content from '@/shared/Layout/Content';
import AppStatusBar from '@/shared/StatusBar';
import useAuthStore from '@/stores/auth';

import useLoginMutation from './useLoginMutation';

const AuthLoginScreen = () => {
  const tw = useTw();

  const authClear = useAuthStore(store => store.clear);

  const form = useForm({
    validationSchema: authLoginSchema
  });

  const mutation = useLoginMutation();
  useFocusEffect(authClear);

  return (
    <ImageBackground source={background} style={tw`flex-1 justify-end`}>
      <AppStatusBar />

      <Content style={tw`mt-[50%] flex-1 rounded-t-3xl bg-white shadow-xl dark:bg-neutral-900`} disableSafeArea>
        <SafeAreaView>
          <ImageThemed lightSource={lightLogo} darkSource={darkLogo} style={tw`mb-6 h-40 w-full`} />

          <Form context={form} onSubmit={mutation.mutateAsync}>
            <TextField<AuthLoginRequest>
              tabIndex={1}
              keyboardType='email-address'
              autoCapitalize='none'
              name='email'
              label='Email'
              left={<TextInput.Icon icon='email-outline' />}
            />
            <PasswordField<AuthLoginRequest>
              tabIndex={2}
              name='password'
              label='Senha'
              left={<TextInput.Icon icon='lock-outline' />}
            />

            <Form.Submit>Entrar</Form.Submit>
          </Form>
        </SafeAreaView>
      </Content>
    </ImageBackground>
  );
};

export default memo(AuthLoginScreen);
