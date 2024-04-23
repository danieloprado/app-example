import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export type NotificationPayload = {
  [key: string]: string | number | object;
  userIds: string;
  logout: 'true';
  navigateTo: string;
  params: any;
};

export type UseNotificationReceivedHandler = (
  payload: NotificationPayload,
  notification: FirebaseMessagingTypes.RemoteMessage
) => boolean;
