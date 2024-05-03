import { Image, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Content from '@app/shared/components/Content';
import Form from '@app/shared/components/Forms/Form';
import PasswordField from '@app/shared/components/Forms/PasswordField';
import TextField from '@app/shared/components/Forms/TextField';
import useForm from '@app/shared/components/Forms/useForm';
import AppStatusBar from '@app/shared/components/StatusBar';
import useAuthStore from '@app/shared/stores/auth';
import { tw } from '@app/shared/tailwind';
import { useFocusEffect } from '@react-navigation/native';

import background from '@/assets/background.png';
import logo from '@/assets/logo.png';

import { authLoginSchema, AuthLoginRequest } from './schema';
import useLoginMutation from './useLoginMutation';

const LoginScreen = () => {
  const authClear = useAuthStore(store => store.clear);
  const { top } = useSafeAreaInsets();

  const form = useForm({
    validationSchema: authLoginSchema
  });

  const mutation = useLoginMutation();
  useFocusEffect(authClear);

  return (
    <ImageBackground source={background} style={tw`flex-1 pt-[${top}px]`}>
      <AppStatusBar />

      <Content>
        <Image source={logo} resizeMode='contain' style={tw`mb-6 h-20 w-full overflow-hidden rounded-md`} />

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
      </Content>
    </ImageBackground>
  );
};

export default LoginScreen;
