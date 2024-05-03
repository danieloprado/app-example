import { useCallback, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

import TextField, { TextFieldProps } from '../TextField';

function PasswordField<V extends FieldValues>(props: Omit<TextFieldProps<V>, 'right' | 'secureTextEntry'>) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toogleSecureTextEntry = useCallback(() => {
    setSecureTextEntry(secureTextEntry => !secureTextEntry);
  }, []);

  return (
    <TextField
      {...props}
      autoCapitalize='none'
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      right={<TextInput.Icon icon={secureTextEntry ? 'eye' : 'eye-off'} onPress={toogleSecureTextEntry} />}
    />
  );
}

export default PasswordField;
