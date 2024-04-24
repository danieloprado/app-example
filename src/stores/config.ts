import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { zustandStorage } from './storage';

const useConfigStore = create(
  persist(
    combine(
      {
        minVersion: 0 as number
      },
      () => ({})
    ),
    { name: 'config-storage', storage: zustandStorage }
  )
);

export default useConfigStore;
