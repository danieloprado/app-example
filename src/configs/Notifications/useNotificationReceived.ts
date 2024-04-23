import { useCallback, useEffect } from 'react';

import useNotificationStore from '@/stores/notification';

import type { UseNotificationReceivedHandler } from './types';

export function useNotificationReceived(handler: UseNotificationReceivedHandler, deps: React.DependencyList) {
  const setHandler = useNotificationStore(store => store.setHandler);

  const handlerMemoized = useCallback(handler, [handler, ...deps]);

  useEffect(() => {
    const unsubscribe = setHandler(handlerMemoized);
    return () => unsubscribe();
  }, [handlerMemoized, setHandler]);
}
