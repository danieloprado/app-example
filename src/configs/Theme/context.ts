import { createContext, useContext } from 'react';

export const TailwindContext = createContext<number>(0);

export function useTailwindContext() {
  return useContext(TailwindContext);
}
