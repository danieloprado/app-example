import { Image, ImageBackground, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';

import background from '@/assets/background.png';
import logo from '@/assets/logo-icon.png';
import Content from '@/modules/Shared/components/Content';
import Form from '@/modules/Shared/components/Forms/Form';
import PasswordField from '@/modules/Shared/components/Forms/PasswordField';
import TextField from '@/modules/Shared/components/Forms/TextField';
import useForm from '@/modules/Shared/components/Forms/useForm';
import AppStatusBar from '@/modules/Shared/components/StatusBar';
import useAuthStore from '@/stores/auth';
import { tw } from '@/tailwind';

import { authLoginSchema, AuthLoginRequest } from './schema';
import useLoginMutation from './useLoginMutation';

const LoginScreen = () => {
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
          <Image source={logo} resizeMode='contain' style={tw`mb-6 h-40 w-full`} />

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

export default LoginScreen;
