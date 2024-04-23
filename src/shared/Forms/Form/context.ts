import { createContext } from 'react';
import { FieldValues } from 'react-hook-form';

import type { UseFormReturn } from '@/shared/Forms/useForm';

export interface FormContextType<F extends FieldValues = any> {
  form?: UseFormReturn<F>;
  onSubmit: () => void;
  tabIndex: {
    registerPosition(position: number, onFocusHandler: () => void): void;
    unregisterPosition(position: number): void;
    hasNext(position: number): boolean;
    goNext(currenPosition: number): void;
  };
}

const FormContext = createContext<FormContextType>({
  onSubmit: () => null,
  tabIndex: {
    registerPosition: () => null,
    unregisterPosition: () => null,
    hasNext: () => false,
    goNext: () => false
  }
});

export default FormContext;
