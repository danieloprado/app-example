import { MMKV } from 'react-native-mmkv';

import { createJSONStorage } from 'zustand/middleware';

export const storage = new MMKV({ id: 'tracers-app' });

export const zustandStorage = createJSONStorage(() => ({
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.delete(name);
  }
}));