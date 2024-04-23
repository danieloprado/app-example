/* eslint-disable @typescript-eslint/no-require-imports */

const proxyquire = require('proxyquire').noCallThru();

const tokens = proxyquire('react-native-paper/lib/commonjs/styles/themes/v3/tokens', {
  'react-native': {
    '@noCallThru': true,
    'Platform': { select: op => op.default }
  }
});

const lightTheme = proxyquire('react-native-paper/lib/commonjs/styles/themes/v3/LightTheme', {
  './tokens': { ...tokens, '@noCallThru': true },
  '../../fonts': () => null
});

const darkTheme = proxyquire('react-native-paper/lib/commonjs/styles/themes/v3/DarkTheme', {
  './tokens': { ...tokens, '@noCallThru': true },
  './LightTheme': lightTheme,
  '../../fonts': () => null
});

module.exports = {
  MD3LightTheme: lightTheme.MD3LightTheme,
  MD3DarkTheme: darkTheme.MD3DarkTheme
};
