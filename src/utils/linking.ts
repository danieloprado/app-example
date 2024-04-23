import { Linking } from 'react-native';

import * as Application from 'expo-application';
import * as MailComposer from 'expo-mail-composer';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import qs from 'qs';

import { IS_IOS } from '@/envs';
import { Toast } from '@/feedback';
import { logError } from '@/log';
import useAuthStore from '@/stores/auth';

import { getDeviceName } from './device';

export const openUrl = async (url: string): Promise<boolean> => {
  try {
    const supported = await Linking.canOpenURL(url);

    if (!supported && !url.startsWith('https') && !url.startsWith('mailto') && !url.startsWith('tel')) {
      throw new Error('Unsupported URL');
    }

    await Linking.openURL(url);
    return true;
  } catch (err) {
    logError(err, { reporter: 'go-to-link-error-handler', url });
    Toast.error('Não foi possível abrir o link');
    return false;
  }
};

export const openEmail = async (to: string, options?: { subject?: string; body?: string }) => {
  const isAvailable = await MailComposer.isAvailableAsync();

  if (!isAvailable) {
    const params = qs.stringify({ subject: options?.subject, body: options?.body }, { skipNulls: true });
    await openUrl(`mailto:${to}${params ? '?' + params : ''}`);
    return;
  }

  await MailComposer.composeAsync({
    recipients: [to],
    subject: options?.subject,
    body: options?.body
  });
};

export const openSupportEmail = () => {
  const deviceName = getDeviceName();
  const version = Application.nativeApplicationVersion;
  const buildNumber = Application.nativeBuildVersion;
  const clientId = useAuthStore.getState().currentUser?.id;

  return openEmail('contato@tracers.com.br', {
    body: `Tracers App v${version} (${buildNumber})\n#user-${clientId ?? '-'}\n${deviceName}\nEssas informações ajudam o nosso time.\n-----------------\n\n`
  });
};

export const openSettings = () => {
  return Linking.openSettings();
};

export const openStore = async () => {
  return openUrl(getStoreUrl());
};

const getStoreUrl = () => {
  if (IS_IOS) {
    return `http://itunes.apple.com/br/app/${Application.applicationName}/id${Application.applicationId}?mt=8`;
  }

  return `https://play.google.com/store/apps/details?id=${Application.applicationId}`;
};

export const openInAppBrowser = async (url: string) => {
  try {
    await openBrowserAsync(url, {
      dismissButtonStyle: 'close',
      presentationStyle: WebBrowserPresentationStyle.FULL_SCREEN,
      enableBarCollapsing: false,
      showTitle: true
    });
  } catch (err) {
    await openUrl(url);
  }
};
