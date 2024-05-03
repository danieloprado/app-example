import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { HelperText, RadioButton as PaperRadio, Text } from 'react-native-paper';

import { IS_IOS } from '@/envs';

import { RadioProps } from '.';

const Component = ({ onChange, errorMessage, value, checkedValue, label, ...props }: RadioProps) => {
  const handleChange = useCallback(() => {
    onChange?.(checkedValue);
  }, [onChange, checkedValue]);

  return (
    <TouchableOpacity onPress={handleChange} disabled={props.disabled}>
      <View style={styles.container} pointerEvents='none'>
        <PaperRadio.Android
          {...props}
          value={checkedValue?.toString() ?? ''}
          status={value === checkedValue ? 'checked' : 'unchecked'}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label} variant='bodyLarge'>
            {label}
          </Text>
          {!!errorMessage && (
            <HelperText type='error' style={styles.error}>
              {errorMessage}
            </HelperText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: -7,
    flexWrap: 'nowrap',
    gap: 5
  },
  error: {
    marginTop: -5,
    marginLeft: -12
  },
  labelContainer: {
    flexGrow: 1,
    flexShrink: 1
  },
  label: {
    width: '90%',
    lineHeight: 20,
    marginTop: IS_IOS ? 8 : 7
  }
});

export default Component;
