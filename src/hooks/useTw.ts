import { useTailwindContext } from '@/configs/Theme/context';
import { tw } from '@/configs/Theme/tailwind';

export function useTw() {
  useTailwindContext();
  return tw;
}
