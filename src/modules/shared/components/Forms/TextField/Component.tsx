import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import {
  NativeSyntheticEvent,
  TextInput as NativeTextInput,
  StyleSheet,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
  View
} from 'react-native';
import { HelperText, TextInput, ActivityIndicator } from 'react-native-paper';

import { TextFieldProps } from '.';
import useTabIndex from '../Form/useTabIndex';

const Component = forwardRef<NativeTextInput, TextFieldProps>(
  (
    {
      tabIndex,
      onSubmitEditing,
      returnKeyType,
      disabled,
      right,
      loading,
      value,
      onBlur,
      _onBlur,
      containerStyle,
      onChangeText,
      _onChangeText,
      errorMessage,
      helperMessage,
      multiline,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<NativeTextInput>(null);

    useImperativeHandle(ref, () => inputRef.current as any, []);

    const handleFocus = useCallback(() => inputRef.current?.focus(), []);
    const [goNext, hasNext] = useTabIndex(tabIndex, handleFocus);

    const handleSubmitHandler = useCallback(
      (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (onSubmitEditing) {
          setTimeout(() => onSubmitEditing(e), 500);
          return;
        }

        tabIndex && goNext(tabIndex);
      },
      [onSubmitEditing, goNext, tabIndex]
    );

    const handleChange = useCallback(
      (text: string) => {
        const cleanValue = text?.toString() ?? '';
        onChangeText?.(cleanValue);
        _onChangeText?.(cleanValue);
      },
      [_onChangeText, onChangeText]
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(e);
        _onBlur?.(e);
      },
      [_onBlur, onBlur]
    );

    return (
      <View style={containerStyle}>
        <TextInput
          mode='flat'
          autoCapitalize={props.keyboardType === 'email-address' ? 'none' : undefined}
          {...props}
          style={[styles.fixEllipsis, multiline && styles.multiline]}
          ref={inputRef}
          value={value?.toString()}
          error={!!errorMessage}
          onChangeText={handleChange}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmitHandler}
          returnKeyType={returnKeyType ? returnKeyType : onSubmitEditing ? 'send' : hasNext ? 'next' : 'default'}
          disabled={disabled}
          multiline={multiline ?? false}
          right={loading ? <TextInput.Icon icon={() => <ActivityIndicator animating size={20} />} /> : right}
        />
        <HelperText type={errorMessage ? 'error' : 'info'}>{errorMessage ?? helperMessage ?? ''}</HelperText>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  fixEllipsis: {
    textAlign: 'auto'
  },
  multiline: {
    minHeight: 100
  }
});

export default Component;
