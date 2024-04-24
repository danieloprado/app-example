import { ComponentProps } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export type SupportedIcons = ComponentProps<typeof MaterialCommunityIcons>['name'];

const Icon = ({ onPress, style, color, ...props }: ComponentProps<typeof MaterialCommunityIcons>) => {
  const theme = useTheme();

  if (onPress)
    return (
      <TouchableOpacity onPress={onPress} disabled={props.disabled}>
        <MaterialCommunityIcons
          color={color ?? theme.colors.onBackground}
          {...props}
          style={[style, props.disabled ? styles.disabled : null]}
        />
      </TouchableOpacity>
    );

  return (
    <MaterialCommunityIcons
      color={color ?? theme.colors.onBackground}
      {...props}
      style={[style, props.disabled ? styles.disabled : null]}
    />
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.3
  }
});

export default Icon;
