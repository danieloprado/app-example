import { useCallback } from 'react';

import Checkbox, { CheckboxProps } from './index';

interface MultipleCheckboxProps extends Omit<CheckboxProps, 'value' | 'onChange'> {
  value: any[];
  checkedValue: any;
  onChange: (value: any[]) => void;
}

const MultipleCheckbox = ({ value, checkedValue, onChange, ...props }: MultipleCheckboxProps) => {
  const handleChange = useCallback(
    (checked: boolean) => {
      const setValues = new Set(value);

      if (checked) {
        setValues.add(checkedValue);
      } else {
        setValues.delete(checkedValue);
      }

      onChange(Array.from(setValues));
    },
    [checkedValue, onChange, value]
  );

  return <Checkbox {...props} value={value.includes(checkedValue)} onChange={handleChange} />;
};

export default MultipleCheckbox;
