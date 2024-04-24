import { useEffect } from 'react';
import { AppState } from 'react-native';

import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

import useAuthStore from '@/stores/auth';
import useNavigationStore from '@/stores/navigation';

import slugify from '../../utils/slugify';

const startedInBackground = AppState.currentState === 'background';

const Analytics = () => {
  const screen = useNavigationStore(store => store.screen);
  const currentUser = useAuthStore(store => store.currentUser);

  useEffect(() => {
    if (!startedInBackground) return;
    analytics().logEvent('app_stated_background');
  }, []);

  useEffect(() => {
    analytics().logAppOpen();

    const subs = AppState.addEventListener('change', state => {
      if (state === 'active') {
        analytics().logAppOpen();
      }

      analytics().logEvent(slugify(`app_state_${state}`));
    });
    return () => subs.remove();
  }, []);

  useEffect(() => {
    analytics().logScreenView({ screen_name: screen, screen_class: screen });
  }, [screen]);

  useEffect(() => {
    analytics().setUserId(currentUser?.id.toString() ?? null);
    currentUser?.id && crashlytics().setUserId(currentUser.id.toString());
  }, [currentUser?.id]);

  useEffect(() => {
    analytics().setUserProperties({
      email: currentUser?.email ?? null
    });
  }, [currentUser?.email]);

  return null;
};

export default Analytics;
