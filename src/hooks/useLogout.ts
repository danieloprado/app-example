import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { post } from '@/api';
import { Dialog } from '@/feedback';
import { logError } from '@/log';
import useAuthStore from '@/stores/auth';

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const authClear = useAuthStore(store => store.clear);

  const logoutMutation = useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: () => post('/auth/logout').catch(err => logError(err)),
    onSuccess: () => {
      authClear();
      queryClient.clear();
      navigation.reset({ index: 0, routes: [{ name: 'AuthLogin' }] });
    }
  });

  const askLogout = useCallback(() => {
    Dialog.confirm({
      title: 'Sair',
      message: 'Deseja realmente sair?',
      onComplete: async confirm => {
        if (!confirm) return;
        await logoutMutation.mutateAsync();
      }
    });
  }, [logoutMutation]);

  return { askLogout, doLogout: logoutMutation.mutateAsync };
}
