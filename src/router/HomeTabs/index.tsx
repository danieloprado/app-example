import { memo, useMemo } from 'react';

import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { IS_ANDROID, IS_OLD_IPHONE } from '@/envs';
import ListScreen from '@/screens/Home';
import OptionsScreen from '@/screens/Options';
import Icon from '@/shared/Icon';
import AppHeader from '@/shared/Layout/Header';

export type HomeTabsParams = {
  HomeList: undefined;
  HomeCamera: undefined;
  HomeMyCases: undefined;
  HomeProfile: undefined;
  HomeOptions: undefined;
};
const Tab = createBottomTabNavigator<HomeTabsParams>();

const HomeScreen = () => {
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
        <Tab.Screen
          name='HomeOptions'
          component={OptionsScreen}
          options={{
            tabBarLabel: 'Mais',
            tabBarIcon: ({ color }) => <Icon color={color} name='dots-horizontal' size={30} />
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default memo(HomeScreen);
