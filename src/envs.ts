import { Platform } from 'react-native';

import * as Device from 'expo-device';

import slugify from '@/modules/Shared/utils/slugify';

const deviceName = slugify(Device.deviceName ?? 'unknown');
const modelName = slugify(Device.modelName ?? 'unknown');

export const IS_DEV = __DEV__;
export const ENV = process.env.EXPO_PUBLIC_ENV;

export const API_ENDPOINT = process.env.EXPO_PUBLIC_API_ENDPOINT ?? '';
export const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN;

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const IS_OLD_IPHONE = ['iPhone SE', 'iPhone 6', 'iPhone 7', 'iPhone 8'].some(
  model => deviceName.includes(slugify(model)) || modelName.includes(slugify(model))
);

export const STATUSBAR_ANDROID_BLACK = IS_ANDROID && (Device.platformApiLevel ?? 0) < 23;
