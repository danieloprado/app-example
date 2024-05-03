import { ReactNode, useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { logError, logErrorWithToast } from '@/log';
import useAuthStore from '@/stores/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError(err) {
        logError(err);
        return false;
      }
    },
    mutations: {
      onError(error) {
        logErrorWithToast(error);
      }
    }
  }
});

export default function ReactQueryConfig({ children }: { children: ReactNode }) {
  const currentUserId = useAuthStore(store => store.currentUser?.id);

  useEffect(() => {
    if (currentUserId) return;
    queryClient.clear();
  }, [currentUserId]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
