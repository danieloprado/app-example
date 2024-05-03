import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { InteractionManager } from 'react-native';
import { Portal, useTheme } from 'react-native-paper';

import AuthRouter, { AuthRouterParams } from '@app/auth/router';
import DashboardRouter, { DashboardRouterParams } from '@app/dashboard/router';
import { IS_ANDROID } from '@app/shared/envs';
import useAuthStore from '@app/shared/stores/auth';
import useNavigationStore from '@app/shared/stores/navigation';
import {
  NavigationContainer,
  NavigationContainerRef,
  RouteProp,
  Theme,
  NavigatorScreenParams
} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

export type RootRouterParams = {
  Dashboard: NavigatorScreenParams<DashboardRouterParams>;
  Auth: NavigatorScreenParams<AuthRouterParams>;
};

export type AppRoutes = keyof RootRouterParams;
export type AppRouteParams<T extends AppRoutes> = RootRouterParams[T];
export type AppRouteUseParams<T extends AppRoutes> = RouteProp<RootRouterParams, T>;

export type RootStackScreenProps<T extends keyof RootRouterParams> = NativeStackScreenProps<RootRouterParams, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootRouterParams {}
  }
}

const Stack = createNativeStackNavigator<RootRouterParams>();

const Router = ({ children }: { children?: ReactNode }) => {
  const isAuthenticated = useAuthStore(store => store.isAuthenticated());

  const navigationRef = useRef<NavigationContainerRef<RootRouterParams>>(null);
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
