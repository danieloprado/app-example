import { forwardRef, useContext } from 'react';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { NativeSyntheticEvent, TextInput as NativeTextInput, TextInputFocusEventData, ViewStyle } from 'react-native';
import { TextInputProps } from 'react-native-paper';

import Component from './Component';
import FormContext from '../Form/context';

export type TextFieldRef = NativeTextInput;

export interface TextFieldProps<V extends FieldValues = FieldValues> extends TextInputProps {
  name?: FieldPath<V>;
  tabIndex?: number;
  loading?: boolean;
  containerStyle?: ViewStyle;
  errorMessage?: string;
  helperMessage?: string;

  _onChangeText?: (value: string) => void;
  _onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const TextField = forwardRef<NativeTextInput, TextFieldProps<FieldValues>>((props, ref) => {
  const context = useContext(FormContext);

  if (!context.form || !props.name) {
    return <Component {...props} />;
  }

  return (
    <Controller
      control={context.form?.control}
      name={props.name}
      render={({ field, fieldState, formState }) => (
        <Component
          {...props}
          ref={ref}
          disabled={props.disabled || formState.isSubmitting || formState.disabled}
          value={field.value}
          _onChangeText={field.onChange}
          _onBlur={field.onBlur}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
});

interface TextFieldComponent {
  <V extends FieldValues>(props: TextFieldProps<V>): JSX.Element;
}

export default TextField as TextFieldComponent;
