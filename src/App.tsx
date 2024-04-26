import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { IS_DEV } from '@/envs';
import Analytics from '@/modules/Shared/configs/Analytics';
import ErrorHandler from '@/modules/Shared/configs/ErrorHandler';
import KeepWake from '@/modules/Shared/configs/KeepAwake';
import NotificationsConfig from '@/modules/Shared/configs/Notifications';
import ReactQueryConfig from '@/modules/Shared/configs/ReactQuery';
import ConfigTheme from '@/modules/Shared/configs/Theme';
import ToastConfig from '@/modules/Shared/configs/Toast';
import UpdateChecker from '@/modules/Shared/configs/UpdateChecker';
import Router from '@/router';

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
