import { memo, useCallback, useEffect } from 'react';
import { InteractionManager } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

import { refreshSession } from '@/api';
import { logError, logEvent } from '@/log';
import useAuthStore from '@/stores/auth';
import useNotificationStore from '@/stores/notification';

import { NotificationPayload } from './types';

Notifications.setNotificationChannelAsync('default', {
  name: 'Geral',
  sound: 'default',
  importance: Notifications.AndroidImportance.MAX
});

messaging().setBackgroundMessageHandler(async message => {
  logEvent('background_notification_firebase');

  if (message.data?.silent === 'true' && message.data?.logout === 'true') {
    logEvent('background_notification_logout');
    useAuthStore.getState().clear();
  }
});

const NotificationsConfig = () => {
  const { isInternetReachable } = useNetInfo();

  const navigation = useNavigation();
  const isAuthenticated = useAuthStore(store => store.isAuthenticated());
  const currentUser = useAuthStore(store => store.currentUser);
  const receivedHandlers = useNotificationStore(store => store.receivedHandlers);

  const onNotificationOpened = useCallback(
    (payload?: NotificationPayload | undefined) => {
      if (!payload || !currentUser?.id) return;

      logEvent('notification_opened');

      const userIds = payload.userIds?.toString().split(',') ?? [];

      if (userIds.length && !userIds.includes(currentUser.id.toString())) {
        logEvent('notification_wrong_user');
        return;
      }

      if (payload.navigateTo) {
        const params = JSON.parse(payload.params ?? '{}');
        InteractionManager.runAfterInteractions(() =>
          navigation.navigate({
            name: payload.navigateTo as any,
            params: { refresh: Date.now(), ...params }
          })
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser?.id]
  );

  useEffect(() => {
    if (!isInternetReachable || !isAuthenticated) return;

    const tryGet = async (retry: number = 0) => {
      try {
        const token = await messaging().getToken();
        useNotificationStore.getState().setToken(token);
      } catch (err) {
        if (retry >= 10) throw err;

        await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
        await tryGet(++retry);
      }
    };

    Notifications.getPermissionsAsync()
      .then(async permission => {
        if (!permission.granted && permission.canAskAgain) {
          await InteractionManager.runAfterInteractions();
          permission = await Notifications.requestPermissionsAsync();
        }

        if (!permission.granted) return;
        return tryGet();
      })
      .catch(err => logError(err, { reporter: 'NotificationsConfig', action: 'tryGet' }));
  }, [isAuthenticated, isInternetReachable]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(notification => onNotificationOpened(notification?.data as NotificationPayload));
  }, [onNotificationOpened]);

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(message => {
      onNotificationOpened(message.data as NotificationPayload);
    });
    return () => unsubscribe();
  }, [onNotificationOpened]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async message => {
      if (message.data?.silent === 'true') {
        onNotificationOpened(message.data as NotificationPayload);
        return;
      }

      if (message.data?.updateSession === 'true') {
        refreshSession().catch(err => {
          logError(err, { reporter: 'NotificationConfig', action: 'refreshSession' });
        });
      }

      if (message.data) {
        const payload = { ...message.data } as NotificationPayload;

        try {
          payload.params = payload.params ? JSON.parse(payload.params) : payload.params;
        } catch (err) {
          /* ignore error parse */
        }

        const resolved = receivedHandlers.some(handler => handler(payload, message));
        if (resolved) return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: message.notification?.title,
          body: message.notification?.body,
          data: message.data,
          color: '#FFFFFF'
        },
        trigger: {
          seconds: 1,
          channelId: message.notification?.android?.channelId ?? 'default'
        }
      }).catch(err => {
        logError(err, { reporter: 'NotificationConfig', action: 'onMessage' });
      });
    });

    return () => unsubscribe();
  }, [onNotificationOpened, receivedHandlers]);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => {
        return { shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true };
      }
    });
  }, []);

  useEffect(() => {
    const handler = Notifications.addNotificationResponseReceivedListener(response => {
      onNotificationOpened(response.notification.request.content.data as NotificationPayload);
    });

    return () => handler.remove();
  }, [onNotificationOpened]);

  return null;
};

export default memo(NotificationsConfig);
