import React, { memo, useContext } from 'react';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { RadioButtonItemProps as PaperRadioProps } from 'react-native-paper';

import Component from './Component';
import FormContext from '../Form/context';

type OnlyBooleans<V extends FieldValues> = {
  [K in keyof V]: V[K] extends boolean ? V[K] : never;
};

export interface RadioProps<V extends FieldValues = FieldValues>
  extends Omit<PaperRadioProps, 'status' | 'onPress' | 'onChange' | 'value'> {
  name?: FieldPath<OnlyBooleans<V>>;
  errorMessage?: string;
  value?: any;
  checkedValue: any;
  onChange?: (value: any) => void;
  hideErrorMessage?: boolean;
}

function Radio<V extends FieldValues>({ disabled, hideErrorMessage, errorMessage, ...props }: RadioProps<V>) {
  const context = useContext(FormContext);

  if (!context.form || !props.name) {
    return <Component {...props} />;
  }

  return (
    <Controller
      control={context.form?.control}
      name={props.name}
      render={({ field: { value, onChange }, fieldState, formState }) => (
        <Component
          {...props}
          value={value}
          onChange={onChange}
          disabled={disabled || formState.isSubmitting || formState.disabled}
          errorMessage={hideErrorMessage ? undefined : errorMessage ?? fieldState.error?.message}
        />
      )}
    />
  );
}

export default memo(Radio) as typeof Radio;
