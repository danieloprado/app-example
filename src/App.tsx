import { LogBox, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Analytics from '@/configs/Analytics';
import KeepWake from '@/configs/KeepAwake';
import NotificationsConfig from '@/configs/Notifications';
import ReactQueryConfig from '@/configs/ReactQuery';
import ConfigTheme from '@/configs/Theme';
import ToastConfig from '@/configs/Toast';
import { IS_DEV } from '@/envs';
import ErrorHandler from '@/ErrorHandler';
import { useTw } from '@/hooks/useTw';
import Router from '@/router';
import UpdateChecker from '@/UpdateChecker';

LogBox.ignoreLogs(['`new NativeEventEmitter()`']);

function App(): JSX.Element {
  const tw = useTw();

  return (
    <ErrorHandler>
      <GestureHandlerRootView style={tw.style('bg-background dark:bg-dark-background', StyleSheet.absoluteFill as any)}>
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
