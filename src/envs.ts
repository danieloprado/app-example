import { Platform } from 'react-native';

import * as Device from 'expo-device';

import slugify from '@/modules/Shared/utils/slugify';

const deviceName = slugify(Device.deviceName ?? 'unknown');
const modelName = slugify(Device.modelName ?? 'unknown');

export const IS_DEV = __DEV__;

export const IS_IOS = Platform.OS === 'ios';
export const IS_OLD_IPHONE = ['iPhone SE', 'iPhone 6', 'iPhone 7', 'iPhone 8'].some(
  model => deviceName.includes(slugify(model)) || modelName.includes(slugify(model))
);
export const IS_ANDROID = Platform.OS === 'android';

export const APIENDPOINT = IS_DEV ? 'http://192.168.1.84:5000' : 'https://web.tracers.app.br/api';
export const API_IS_PROD = APIENDPOINT === 'https://web.tracers.app.br/api';
export const CONTENT_URL = `${APIENDPOINT}/content`;

export const TERMS_URL = 'https://web.tracers.app.br/p/termos-de-uso';
export const PRIVACY_URL = 'https://web.tracers.app.br/p/privacidade';

export const SENTRY_DSN = IS_DEV ? undefined : '';

export const STATUSBAR_ANDROID_BLACK = IS_ANDROID && (Device.platformApiLevel ?? 0) < 23;
