import './locale';

import { useCallback } from 'react';
import {
  useForm as useFormHook,
  UseFormProps,
  useFieldArray as useFieldArrayHook,
  UseFormReturn as HookUseFormReturn,
  FieldValues,
  UseFormReset
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Yup = typeof yup;

export interface UseFormParams<T extends FieldValues> extends UseFormProps<T> {
  validationSchema?: yup.Schema<T> | ((yup: Yup) => yup.Schema<T>) | undefined;
}

export type FormModel<Form> = Form extends HookUseFormReturn<infer M> ? M : Form;

export interface UseFormReturn<T extends FieldValues> extends HookUseFormReturn<T, any> {
  setValues: UseFormReset<T>;
}

/**
 * Hook implemation of react-hook-form with Yup
 * @param UseFormParams
 */
export default function useForm<T extends FieldValues>({
  validationSchema,
  ...params
}: UseFormParams<T>): UseFormReturn<T> {
  if (validationSchema) {
    Object.assign(params, {
      resolver: yupResolver(typeof validationSchema === 'function' ? validationSchema(yup) : (validationSchema as any))
    });
  }

  const form = useFormHook<T>(params);

  const setValues = useCallback<UseFormReset<T>>(
    (values, keepStateOptions = {}) => form.reset(values, { keepDefaultValues: true, ...keepStateOptions }),
    [form]
  );

  return { ...form, setValues };
}

export const useFieldArray = useFieldArrayHook;
