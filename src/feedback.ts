import { InteractionManager } from 'react-native';
import ToastNative from 'react-native-toast-message';

import errorFormatter from '@/formatters/error';
import useDialogStore, { DialogState } from '@/stores/dialog';

export const Dialog = {
  confirm({ onComplete, ...params }: Omit<DialogState, 'visible' | 'type' | 'options'>) {
    return new Promise<boolean>(async resolve => {
      await InteractionManager.runAfterInteractions();

      useDialogStore.getState().showConfirm({
        ...params,
        onComplete: ok => {
          resolve(ok);
          return onComplete?.(ok);
        }
      });
    });
  },
  alert(params: Omit<DialogState, 'visible' | 'type' | 'options'>) {
    return new Promise<void>(async resolve => {
      await InteractionManager.runAfterInteractions();

      useDialogStore.getState().showAlert({
        ...params,
        onComplete: () => resolve()
      });
    });
  },
  options({
    onComplete,
    ...params
  }: Omit<DialogState, 'visible' | 'type' | 'okText' | 'cancelText' | 'onComplete'> & {
    onComplete?(option: string | undefined): void;
  }) {
    return new Promise<string | undefined>(async resolve => {
      await InteractionManager.runAfterInteractions();

      useDialogStore.getState().showOptions({
        ...params,
        onComplete: async (ok, option) => {
          await Promise.resolve(onComplete?.(option));
          resolve(option);
        }
      });
    });
  }
};

export const Toast = {
  success(message: string, title?: string) {
    ToastNative.show({ type: 'success', text1: title, text2: message });
  },
  info(message: string, title?: string) {
    ToastNative.show({ type: 'info', text1: title, text2: message });
  },
  infoBig(message: string, title?: string) {
    ToastNative.show({ type: 'infoBig', text1: title, text2: message });
  },
  error(err: any, title?: string) {
    ToastNative.show({ type: 'error', text1: title, text2: errorFormatter(err) });
  }
};

export const awaitTimer = (timer: number) => {
  return new Promise<void>(resolve =>
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => resolve(), timer);
    })
  );
};
