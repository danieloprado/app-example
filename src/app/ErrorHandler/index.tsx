import { Component, ReactNode } from 'react';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';

import { IS_DEV } from '@app/shared/envs';
import { logError, logEvent } from '@app/shared/log';

ErrorUtils.setGlobalHandler((err, isFatal) => {
  if (!err || IS_DEV) {
    console.log('UnhandledExceptionHandler', err, { isFatal });
    return;
  }

  logError(err, { reporter: 'global-error-handler' });

  if (!isFatal) {
    logEvent('app_error_non_fatal');
    return;
  }

  logEvent('app_error_fatal');
  alertRestart();
});

export default class ErrorHandler extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(err: any, errorInfo: any) {
    if (err) err.extraData = errorInfo;
    logError(err, { reporter: 'error-handler-component' });
    logEvent('app_error_render');

    if (IS_DEV) return;
    alertRestart();
  }

  public render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

let alertOpened = false;

function alertRestart() {
  if (alertOpened) return;
  alertOpened = true;

  Alert.alert(
    'Algo deu errado',
    'Encontramos um problema que impediu o app de funcionar. É necessário reabri-lo para continuar.',
    [{ text: 'Reabrir', onPress: () => RNRestart.Restart() }],
    { onDismiss: () => RNRestart.Restart() }
  );
}
