import { useKeepAwake } from 'expo-keep-awake';

interface Props {
  tag: string;
}

const KeepWake = ({ tag }: Props) => {
  useKeepAwake(tag);
  return null;
};

export default KeepWake;
