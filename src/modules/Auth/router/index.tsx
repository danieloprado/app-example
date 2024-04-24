import { useMemo } from 'react';

import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login';

export type AuthRouterParams = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthRouterParams>();

const AuthRouter = () => {
  const screenOptions = useMemo<NativeStackNavigationOptions>(() => ({ header: () => null }), []);

  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={screenOptions}>
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthRouter;
