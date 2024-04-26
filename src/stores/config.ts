import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { jsonStorage } from './storage';

const useConfigStore = create(
  persist(
    combine(
      {
        minVersion: 0 as number
      },
      () => ({})
    ),
    { name: 'config-storage', storage: jsonStorage }
  )
);

export default useConfigStore;
