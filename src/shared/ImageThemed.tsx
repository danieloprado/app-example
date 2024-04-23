import { Image, ImageProps } from 'react-native';

import { useTw } from '@/hooks/useTw';

interface ImageThemedProps extends Omit<ImageProps, 'source'> {
  lightSource: ImageProps['source'];
  darkSource: ImageProps['source'];
}

const ImageThemed = ({ lightSource, darkSource, ...props }: ImageThemedProps) => {
  const tw = useTw();
  return <Image source={tw.prefixMatch('dark') ? darkSource : lightSource} resizeMode='contain' {...props} />;
};

export default ImageThemed;
