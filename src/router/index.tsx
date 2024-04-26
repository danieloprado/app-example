import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { InteractionManager } from 'react-native';
import { Portal, useTheme } from 'react-native-paper';

import {
  NavigationContainer,
  NavigationContainerRef,
  RouteProp,
  Theme,
  NavigatorScreenParams
} from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import { IS_ANDROID } from '@/envs';
import AuthRouter, { AuthRouterParams } from '@/modules/Auth/router';
import DashboardRouter, { DashboardRouterParams } from '@/modules/Dashboard/router';
import useAuthStore from '@/stores/auth';
import useNavigationStore from '@/stores/navigation';

export type RootStackParams = {
  Dashboard: NavigatorScreenParams<DashboardRouterParams>;
  Auth: NavigatorScreenParams<AuthRouterParams>;
} & DashboardRouterParams &
  AuthRouterParams;

export type AppRoutes = keyof RootStackParams;
export type AppRouteParams<T extends AppRoutes> = RootStackParams[T];
export type AppRouteUseParams<T extends AppRoutes> = RouteProp<RootStackParams, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}

const Stack = createNativeStackNavigator<RootStackParams>();

const Router = ({ children }: { children?: ReactNode }) => {
  const isAuthenticated = useAuthStore(store => store.isAuthenticated());

  const navigationRef = useRef<NavigationContainerRef<RootStackParams>>(null);
  const setCurrentScreen = useNavigationStore(store => store.setCurrentScreen);

  const theme = useTheme();

  const onReady = useCallback(() => {
    const currentRoute = navigationRef.current?.getCurrentRoute();
    setCurrentScreen(currentRoute?.name, currentRoute?.params);

    setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        SplashScreen.hideAsync();
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onStateChange = useCallback(async () => {
    const currentRoute = navigationRef.current?.getCurrentRoute();
    setCurrentScreen(currentRoute?.name, currentRoute?.params);
  }, [setCurrentScreen]);

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      gestureEnabled: true,
      headerShadowVisible: false,
      animation: IS_ANDROID ? 'fade_from_bottom' : undefined,
      header: () => null
    }),
    []
  );

  const navigatorTheme = useMemo<Theme>(
    () => ({
      dark: theme.dark,
      colors: {
        primary: theme.colors.primary,
        background: theme.colors.background,
        card: theme.colors.surface,
        text: theme.colors.onBackground,
        border: theme.colors.outline,
        notification: theme.colors.primary
      }
    }),
    [
      theme.colors.background,
      theme.colors.onBackground,
      theme.colors.outline,
      theme.colors.primary,
      theme.colors.surface,
      theme.dark
    ]
  );

  return (
    <NavigationContainer ref={navigationRef} onReady={onReady} theme={navigatorTheme} onStateChange={onStateChange}>
      <Portal.Host>
        {children}

        <Stack.Navigator initialRouteName='Dashboard' screenOptions={screenOptions}>
          {isAuthenticated && (
            <>
              <Stack.Screen name='Dashboard' component={DashboardRouter} />
            </>
          )}

          {!isAuthenticated && (
            <>
              <Stack.Screen name='Auth' component={AuthRouter} />
            </>
          )}
        </Stack.Navigator>
      </Portal.Host>
    </NavigationContainer>
  );
};

export default Router;
