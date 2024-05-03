import React, { memo, useContext } from 'react';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { CheckboxItemProps as PaperCheckboxProps } from 'react-native-paper';

import Component from './Component';
import FormContext from '../Form/context';

type OnlyBooleans<V extends FieldValues> = {
  [K in keyof V]: V[K] extends boolean ? V[K] : never;
};

export interface CheckboxProps<V extends FieldValues = FieldValues>
  extends Omit<PaperCheckboxProps, 'status' | 'onPress' | 'onChange'> {
  name?: FieldPath<OnlyBooleans<V>>;
  value?: boolean;
  errorMessage?: string;
  onChange?: (value: boolean) => void;
}

function Checkbox<V extends FieldValues>({ disabled, ...props }: CheckboxProps<V>) {
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
          onChange={onChange as any}
          disabled={disabled || formState.isSubmitting || formState.disabled}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
}

export default memo(Checkbox) as typeof Checkbox;
