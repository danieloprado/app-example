import { useCallback, useMemo, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { InteractionManager } from 'react-native';

import FormContext from './context';
import Submit from './Submit';
import { UseFormReturn } from '../useForm';

interface FormProps<V extends FieldValues> {
  context: UseFormReturn<V>;
  children: React.ReactNode;
  onSubmit: (model: V) => Promise<any> | void;
}

function Form<V extends FieldValues>({ children, context, onSubmit: onSubmitProp }: FormProps<V>) {
  const [fields, setFields] = useState<{ position: number; onFocusHandler(): void }[]>([]);

  const onSubmit = useMemo(
    () =>
      context.handleSubmit(model => {
        return Promise.resolve(onSubmitProp(model)).catch(() => null /* fix */);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context.handleSubmit, onSubmitProp]
  );

  const registerPosition = useCallback((position: number, onFocusHandler: () => void) => {
    setFields(current => {
      return [...current.filter(c => c.position !== position), { position, onFocusHandler }].sort((a, b) =>
        a.position > b.position ? 1 : a.position === b.position ? 0 : -1
      );
    });
  }, []);

  const unregisterPosition = useCallback((position: number) => {
    setFields(current => [...current.filter(c => c.position !== position)]);
  }, []);

  const hasNext = useCallback((currenPosition: number) => fields.some(f => f.position > currenPosition), [fields]);

  const goNext = useCallback(
    (currenPosition: number) => {
      const nextField = fields.find(f => f.position > currenPosition);

      if (!nextField) {
        onSubmit();
        return;
      }

      InteractionManager.runAfterInteractions(() => nextField.onFocusHandler());
    },
    [fields, onSubmit]
  );

  const tabIndex = useMemo(
    () => ({ registerPosition, unregisterPosition, hasNext, goNext }),
    [goNext, hasNext, registerPosition, unregisterPosition]
  );

  return <FormContext.Provider value={{ form: context, onSubmit, tabIndex }}>{children}</FormContext.Provider>;
}

Form.Submit = Submit;

export default Form;
