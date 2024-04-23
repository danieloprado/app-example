import { useMemo } from 'react';
import { Image, ImageStyle, View } from 'react-native';
import { Text } from 'react-native-paper';

import defaultImage from '@/assets/default-image.png';
import { useTw } from '@/hooks/useTw';

export interface AvatarProps {
  isPro?: boolean;
  url: string | undefined | null;
  style?: ImageStyle;
}

const Avatar = ({ url, style, isPro }: AvatarProps) => {
  const tw = useTw();

  const source = useMemo(() => {
    if (!url) return defaultImage;
    return { uri: url };
  }, [url]);

  return (
    <View style={tw`h-[150px] w-[150px] overflow-hidden rounded-[150px]`}>
      <Image source={source} style={tw.style('h-[150px] w-[150px]', style)} />
      {isPro && (
        <Text
          style={tw`text-onPrimary dark:text-dark-onPrimary absolute bottom-0 w-[150px] bg-primary p-1 text-center text-[12px] font-bold uppercase dark:bg-primary`}
        >
          Pro
        </Text>
      )}
    </View>
  );
};

export default Avatar;
