import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

export default function useAppActive(callback?: () => void) {
  const firstRender = useRef(true);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const subs = AppState.addEventListener('change', state => {
      if (firstRender.current) return;
      setActive(state === 'active');
    });

    return () => subs.remove();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      // AppState change send background then active on first render
      const timeout = setTimeout(() => (firstRender.current = false), 300);
      return () => clearTimeout(timeout);
    }

    if (!active) return;
    callback?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return active;
}
