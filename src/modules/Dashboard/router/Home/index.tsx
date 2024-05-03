import { useMemo } from 'react';

import { SupportedIcons } from '@app/shared/components/Icon';
import { IS_ANDROID } from '@app/shared/envs';
import type { CompositeScreenProps } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps
} from '@react-navigation/native-stack';

import DetailsScreen from '@/screens/Home/Details';
import ListScreen from '@/screens/Home/List';

import { DashboardRouterParams, DashboardRouterProps } from '..';

export type HomeRouterParams = {
  List: undefined;
  Details: { id: number; name: string; icon: SupportedIcons };
};

export type HomeRouterProps<T extends keyof HomeRouterParams> = CompositeScreenProps<
  NativeStackScreenProps<HomeRouterParams, T>,
  DashboardRouterProps<keyof DashboardRouterParams>
>;

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
