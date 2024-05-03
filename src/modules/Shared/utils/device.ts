import * as Device from 'expo-device';

import { IS_ANDROID } from '../envs';

export function getDeviceName() {
  return `${Device.brand} - ${Device.modelName} (${IS_ANDROID ? 'Android' : 'iOS'} ${Device.osVersion})`;
}
