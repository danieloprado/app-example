import { useMemo } from 'react';

import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { IS_ANDROID, IS_OLD_IPHONE } from '@/envs';
import AppHeader from '@/modules/Shared/components/Header';
import Icon from '@/modules/Shared/components/Icon';

import ListScreen from '../screens/Home';

export type HomeRouterParams = {
  HomeList: undefined;
  HomeOptions: undefined;
};

const Tab = createBottomTabNavigator<HomeRouterParams>();

const HomeRouter = () => {
  const screenOptions = useMemo<BottomTabNavigationOptions>(
    () => ({
      tabBarStyle: {
        paddingTop: 10,
        borderTopWidth: 0,
        elevation: 0,
        ...(IS_ANDROID || IS_OLD_IPHONE ? { paddingBottom: 10, height: 70 } : { height: 80 })
      },
      header: () => null
    }),
    []
  );

  return (
    <>
      <AppHeader />

      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name='HomeList'
          component={ListScreen}
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({ color }) => <Icon color={color} name='home-search-outline' size={30} />
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default HomeRouter;
