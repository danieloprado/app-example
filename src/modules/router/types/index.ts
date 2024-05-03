import { AuthRouterParams } from '@app/auth/router';
import { DashboardRouterParams } from '@app/dashboard/router';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootRouterParams = {
  Dashboard: NavigatorScreenParams<DashboardRouterParams>;
  Auth: NavigatorScreenParams<AuthRouterParams>;
};

export type RootStackScreenProps<T extends keyof RootRouterParams> = NativeStackScreenProps<RootRouterParams, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootRouterParams {}
  }
}
