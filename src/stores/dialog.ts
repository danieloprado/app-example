import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { SupportedIcons } from '@/shared/Icon';

export interface DialogState {
  visible: boolean;
  icon?: SupportedIcons;
  title: string;
  message: string;
  type?: 'alert' | 'confirmation' | 'options';
  okText?: string;
  cancelText?: string;
  danger?: boolean;
  cancelDanger?: boolean;
  options?: { value: string; label: string; icon?: string }[];
  onComplete?(result: boolean, option?: string): Promise<void> | void;
}

const useDialogStore = create(
  combine({ visible: false } as Partial<DialogState>, set => ({
    showAlert: (params: Omit<DialogState, 'visible' | 'type' | 'options'>) => {
      set({
        icon: undefined,
        okText: undefined,
        cancelText: undefined,
        danger: undefined,
        cancelDanger: undefined,
        options: undefined,
        ...params,
        visible: true,
        type: 'alert'
      });
    },
    showConfirm: (params: Omit<DialogState, 'visible' | 'type' | 'options'>) => {
      set({
        icon: undefined,
        okText: undefined,
        cancelText: undefined,
        danger: undefined,
        cancelDanger: undefined,
        options: undefined,
        ...params,
        visible: true,
        type: 'confirmation'
      });
    },
    showOptions: (params: Omit<DialogState, 'visible' | 'type' | 'options'>) => {
      set({
        icon: undefined,
        okText: undefined,
        cancelText: undefined,
        danger: undefined,
        options: undefined,
        ...params,
        visible: true,
        type: 'options'
      });
    },
    hide() {
      set({ visible: false });
    }
  }))
);

export default useDialogStore;
