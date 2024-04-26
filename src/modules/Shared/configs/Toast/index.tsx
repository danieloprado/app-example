/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import ToastMessage, { BaseToast, ToastConfigParams, ToastConfig as ToastConfigType } from 'react-native-toast-message';

import { IS_ANDROID } from '@/envs';
import { tw } from '@/tailwind';

import Icon from '../../components/Icon';

const TEXT2_PROPS = { numberOfLines: 3 };

const CustomToast = ({
  error,
  big,
  info,
  ...props
}: ToastConfigParams<any> & { error?: boolean; big?: boolean; info?: boolean }) => {
  return (
    <BaseToast
      {...props}
      style={tw.style('w-11/12  border-l-0 opacity-90', {
        'bg-red-500/90': error ?? false,
        'h-[100px] items-start py-5': big ?? false
      })}
      text1Style={tw`text-xs text-white`}
      text2Style={tw`text-sm text-white`}
      text2Props={TEXT2_PROPS}
      renderTrailingIcon={() =>
        info ? null : (
          <Icon
            name={error ? 'alert-circle' : 'check-circle'}
            size={30}
            color='white'
            style={tw`mr-3 mt-4 opacity-70`}
          />
        )
      }
    />
  );
};

const ToastConfig = () => {
  const [toastConfig] = useState<ToastConfigType>(() => ({
    success: props => <CustomToast {...props} />,
    info: props => <CustomToast {...props} info />,
    infoBig: props => <CustomToast {...props} big />,
    error: props => <CustomToast {...props} error />
  }));

  return <ToastMessage topOffset={IS_ANDROID ? 50 : undefined} config={toastConfig} />;
};

export default ToastConfig;
