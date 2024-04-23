import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { decodeToken } from '@/utils/jwt';

import { zustandStorage } from './storage';

export type CurrentUser = { id: number; name: string; email: string };

const useAuthStore = create(
  persist(
    combine({} as { accessToken?: string; refreshToken?: string; currentUser?: CurrentUser }, (set, get) => ({
      isAuthenticated() {
        return !!get()?.currentUser;
      },
      setTokens(accessToken: string, refreshToken: string) {
        set({ accessToken, refreshToken, currentUser: decodeToken(accessToken) });
      },
      setAccessToken(accessToken: string) {
        set({ accessToken, currentUser: decodeToken(accessToken) });
      },
      clear() {
        set({ accessToken: undefined, refreshToken: undefined, currentUser: undefined });
      }
    })),
    {
      name: 'auth-storage',
      storage: zustandStorage,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      partialize: ({ currentUser, ...state }) => state,
      merge: (state: any, currentState) => {
        return {
          ...currentState,
          ...(state ?? {}),
          currentUser: state?.accessToken ? decodeToken(state.accessToken) : undefined
        };
      }
    }
  )
);

export default useAuthStore;
