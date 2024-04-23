import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from '@sentry/react-native';

import { IS_DEV, SENTRY_DSN } from '@/envs';
import { Toast } from '@/feedback';
import slugify from '@/utils/slugify';

import useAuthStore from './stores/auth';
import useNavigationStore from './stores/navigation';

Sentry.init({
  dsn: SENTRY_DSN,
  environment: __DEV__ ? 'development' : 'production',
  tracesSampleRate: 0.2,
  enableAppHangTracking: false,
  patchGlobalPromise: true
});

export function logEvent(event: string) {
  analytics().logEvent(slugify(event));
}

export function logErrorWithToast(error: any, tags: Record<string, string> = {}) {
  logError(error, { ...tags, toast: 'true' });
  Toast.error(error);
}

export function logError(err: any, tags: Record<string, string> = {}) {
  if (!err) return;

  if (typeof err === 'string') {
    err = new Error(err);
  }

  if (IS_DEV) {
    console.error(err);
    console.log('ignoreLog: ' + err.ignoreLog);
    console.log(stringifyExtra(err.tags));
    console.log(stringifyExtra(err.extraData));
    return;
  }

  if (err.ignoreLog || err.sent) {
    return;
  }

  err.sent = true;

  crashlytics().recordError(err);

  Sentry.withScope(() => {
    const user = useAuthStore.getState().currentUser;

    if (user) {
      Sentry.setUser({ id: user.id.toString(), email: user.email, username: user.email, extra: { ...user } });
    }

    const { screen, params: screenParams } = useNavigationStore.getState();

    Sentry.setTags({ ...tags, ...(err?.tags ?? {}), screen: screen ?? 'undefined' });
    Sentry.setExtras({ screenParams, extra: stringifyExtra(err.extraData) });
    Sentry.captureException(err);
  });
}

function stringifyExtra(extraData: any) {
  if (!extraData) return undefined;

  try {
    return JSON.stringify(extraData || {}, null, 2);
  } catch (err: any) {
    return err?.message ?? 'parseError';
  }
}
