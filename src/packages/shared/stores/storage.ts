import { MMKV } from 'react-native-mmkv';

import { createJSONStorage } from 'zustand/middleware';

const storage = new MMKV({ id: 'tracers-app' });

export const jsonStorage = createJSONStorage(() => ({
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
