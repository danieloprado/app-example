import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { zustandStorage } from './storage';

const useConfigStore = create(
  persist(
    combine(
      {
        themeMode: 'system' as 'dark' | 'light' | 'system',
        minVersion: 0 as number
      },
      set => ({
        setThemeMode(themeMode: 'dark' | 'light' | 'system') {
          set({ themeMode });
        }
      })
    ),
    { name: 'config-storage', storage: zustandStorage }
  )
);

export default useConfigStore;
