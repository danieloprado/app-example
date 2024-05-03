import { useContext, useEffect, useMemo } from 'react';

import FormContext, { FormContextType } from './context';

const goNextEmpty = [() => false, false] as [FormContextType['tabIndex']['goNext'], boolean];

export default function useTabIndex(tabIndex: number | null | undefined, onFocusHandler: () => void) {
  const {
    tabIndex: { registerPosition, unregisterPosition, goNext, hasNext }
  } = useContext(FormContext);

  useEffect(() => {
    if (tabIndex === undefined || tabIndex === null) {
      return () => null;
    }

    registerPosition(tabIndex, onFocusHandler);
    return () => unregisterPosition(tabIndex);
  }, [tabIndex, onFocusHandler, registerPosition, unregisterPosition]);

  return useMemo(() => {
    if (tabIndex === undefined || tabIndex === null) return goNextEmpty;

    return [goNext, hasNext(tabIndex)] as [FormContextType['tabIndex']['goNext'], boolean];
  }, [tabIndex, goNext, hasNext]);
}
