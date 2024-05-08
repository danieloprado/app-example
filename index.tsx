import { LogBox } from 'react-native';

import { registerRootComponent } from 'expo';

import App from './src/app';

LogBox.ignoreLogs([/Warning: .+ Support for defaultProps.+/gim]);

registerRootComponent(App);
