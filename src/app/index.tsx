import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Router from '@app/router';
import Analytics from '@app/shared/configs/Analytics';
import ErrorHandler from '@app/shared/configs/ErrorHandler';
import KeepWake from '@app/shared/configs/KeepAwake';
import NotificationsConfig from '@app/shared/configs/Notifications';
import ReactQueryConfig from '@app/shared/configs/ReactQuery';
import ConfigTheme from '@app/shared/configs/Theme';
import ToastConfig from '@app/shared/configs/Toast';
import UpdateChecker from '@app/shared/configs/UpdateChecker';
import { IS_DEV } from '@app/shared/envs';

function App(): JSX.Element {
  return (
    <ErrorHandler>
      <GestureHandlerRootView style={StyleSheet.absoluteFill}>
        <SafeAreaProvider>
          <ReactQueryConfig>
            <ConfigTheme>
              <Router>
                <NotificationsConfig />
                <UpdateChecker />
              </Router>

              {IS_DEV && <KeepWake tag='app-dev' />}
              <ToastConfig />
              <Analytics />
            </ConfigTheme>
          </ReactQueryConfig>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorHandler>
  );
}

export default App;
