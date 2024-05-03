import { useMemo } from 'react';

import type { RootRouterParams, RootStackScreenProps } from '@app/router/types';
import Icon from '@app/shared/components/Icon';
import { IS_ANDROID, IS_OLD_IPHONE } from '@app/shared/envs';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabScreenProps
} from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';

import HomeRouter, { HomeRouterParams } from './Home';
import OptionsScreen from '../screens/Options';

export type DashboardRouterParams = {
  Home: NavigatorScreenParams<HomeRouterParams>;
  Options: undefined;
};

export type DashboardRouterProps<T extends keyof DashboardRouterParams> = CompositeScreenProps<
  BottomTabScreenProps<DashboardRouterParams, T>,
  RootStackScreenProps<keyof RootRouterParams>
>;

const Tab = createBottomTabNavigator<DashboardRouterParams>();

const DashboardRouter = () => {
  const screenOptions = useMemo<BottomTabNavigationOptions>(
    () => ({
      tabBarStyle: {
        paddingTop: 10,
        borderTopWidth: 0,
        ...(IS_ANDROID || IS_OLD_IPHONE ? { paddingBottom: 10, height: 70 } : { height: 80 })
      },
      header: () => null
    }),
    []
  );

  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={screenOptions}>
      <Tab.Screen
        name='Home'
        component={HomeRouter}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <Icon color={color} name='view-dashboard' size={30} />
        }}
      />
      <Tab.Screen
        name='Options'
        component={OptionsScreen}
        options={{
          tabBarLabel: 'Opções',
          tabBarIcon: ({ color }) => <Icon color={color} name='cog' size={30} />
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardRouter;
