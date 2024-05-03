import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { jsonStorage } from './storage';
import { UseNotificationReceivedHandler } from '../configs/Notifications/types';

const useNotificationStore = create(
  persist(
    combine(
      {
        token: null as string | null,
        receivedHandlers: [] as UseNotificationReceivedHandler[]
      },
      set => ({
        setToken: (token: string) => {
          if (token) set({ token });
        },
        setHandler(handler: UseNotificationReceivedHandler) {
          set(({ receivedHandlers }) => ({ receivedHandlers: [...receivedHandlers, handler] }));

          return () => {
            set(({ receivedHandlers }) => ({ receivedHandlers: receivedHandlers.filter(h => h !== handler) }));
          };
        }
      })
    ),
    {
      name: 'notification-storage',
      storage: jsonStorage,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      partialize: ({ receivedHandlers, ...state }) => state
    }
  )
);

export default useNotificationStore;
