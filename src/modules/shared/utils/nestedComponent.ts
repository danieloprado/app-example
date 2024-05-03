import * as React from 'react';

export default function nestedComponent<P, N>(
  component: React.ComponentType<P>,
  nested: N
): React.ComponentType<P> & N {
  return Object.assign(component, nested);
}
