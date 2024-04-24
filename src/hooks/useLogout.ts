import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { post } from '@/api';
import { Dialog } from '@/feedback';
import { logError } from '@/log';
import useAuthStore from '@/stores/auth';

export default function useLogout() {
  const queryClient = useQueryClient();
  const authClear = useAuthStore(store => store.clear);

  const logoutMutation = useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: () => post('/auth/logout').catch(err => logError(err)),
    onSuccess: () => {
      authClear();
      queryClient.clear();
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
