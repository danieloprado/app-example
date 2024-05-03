import { ReactNode, createContext } from 'react';

export type ContentContextType = {
  registerFooter(children: ReactNode): () => void;
};

export const ContentContext = createContext<ContentContextType>({
  registerFooter: () => () => null
});
