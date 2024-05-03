import { post } from '@app/shared/api';
import useAuthStore from '@app/shared/stores/auth';
import useNotificationStore from '@app/shared/stores/notification';
import { getDeviceName } from '@app/shared/utils/device';
import analytics from '@react-native-firebase/analytics';
import { useMutation } from '@tanstack/react-query';

import { AuthLoginRequest, AuthLoginResponse } from './schema';

export default function useLoginMutation() {
  const setTokens = useAuthStore(store => store.setTokens);

  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: (model: Pick<AuthLoginRequest, 'email' | 'password'>) =>
      post<AuthLoginResponse>('/auth/login', {
        ...model,
        app: true,
        deviceName: getDeviceName(),
        notificationToken: useNotificationStore.getState().token
      } as AuthLoginRequest),
    onSuccess: ({ accessToken, refreshToken }) => {
      setTokens(accessToken, refreshToken);
      analytics().logLogin({ method: 'form' });
    }
  });
}
