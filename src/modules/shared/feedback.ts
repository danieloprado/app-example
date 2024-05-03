import ToastNative from 'react-native-toast-message';

import errorFormatter from './formatters/error';

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
