import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const useNavigationStore = create(
  combine(
    {
      screen: undefined as string | undefined,
      params: undefined as any
    },
    set => ({
      setCurrentScreen(newScreen: string | undefined, params: any) {
        set({ screen: newScreen, params });
      }
    })
  )
);

export default useNavigationStore;
