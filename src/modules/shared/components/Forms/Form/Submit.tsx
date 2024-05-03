import { useContext } from 'react';
import { Button, ButtonProps } from 'react-native-paper';

import FormContext from './context';

const Submit = ({ disabled, ...props }: Omit<ButtonProps, 'onPress'>) => {
  const context = useContext(FormContext);

  return (
    <Button
      mode='contained'
      {...props}
      loading={context?.form?.formState.isSubmitting}
      disabled={disabled || context?.form?.formState.isSubmitting || context?.form?.formState.disabled}
      onPress={context.onSubmit}
    />
  );
};

export default Submit;
