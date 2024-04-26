import { useMemo } from 'react';

import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { IS_ANDROID } from '@/envs';
import { SupportedIcons } from '@/modules/Shared/components/Icon';

import DetailsScreen from '../../screens/Home/Details';
import ListScreen from '../../screens/Home/List';

export type HomeRouterParams = {
  List: undefined;
  Details: { id: number; name: string; icon: SupportedIcons };
};

const Stack = createNativeStackNavigator<HomeRouterParams>();

const HomeRouter = () => {
  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      animation: IS_ANDROID ? 'slide_from_right' : undefined,
      header: () => null
    }),
    []
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name='List' component={ListScreen} />
      <Stack.Screen name='Details' component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeRouter;
