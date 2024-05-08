/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  name: 'AppExample',
  slug: 'AppExample',
  scheme: 'appExample',
  version: '1.7.2',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  assetBundlePatterns: ['assets/fonts/MaterialCommunityIcons.ttf'],
  platforms: ['ios', 'android'],
  primaryColor: '#00599b',
  backgroundColor: '#000000',
  ios: {
    buildNumber: '74',
    supportsTablet: false,
    bundleIdentifier: 'pt.app.example',
    googleServicesFile: './assets/ios/GoogleService-Info.plist',
    infoPlist: {
      NSMicrophoneUsageDescription: '$(PRODUCT_NAME) needs access to your microphone for nothing.',
      FirebaseAppDelegateProxyEnabled: true,
      LSApplicationQueriesSchemes: ['mailto', 'tel', 'comgooglemaps'],
      UIBackgroundModes: ['remote-notification', 'fetch']
    },
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#071b35'
    }
  },
  androidStatusBar: { translucent: true },
  android: {
    versionCode: 74,
    adaptiveIcon: {
      foregroundImage: './assets/icon-adaptive.png',
      monochromeImage: './assets/icon-monochrome.png',
      backgroundColor: '#071b35'
    },
    package: 'pt.app.example',
    googleServicesFile: './assets/android/google-services.json',
    permissions: [
      'android.permission.CAMERA',
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.FOREGROUND_SERVICE'
    ],
    splash: {
      image: './assets/splash.png',
      resizeMode: 'native',
      backgroundColor: '#071b35'
    }
  },
  notification: {
    icon: './assets/icon-notification.png',
    color: '#00599b',
    androidMode: 'default'
  },
  plugins: [
    '@react-native-firebase/app',
    '@react-native-firebase/messaging',
    '@react-native-firebase/crashlytics',
    'expo-notifications',
    ['expo-screen-orientation', { initialOrientation: 'PORTRAIT' }],
    ['expo-build-properties', { ios: { useFrameworks: 'static' } }],
    [
      'expo-tracking-transparency',
      { userTrackingPermission: '$(PRODUCT_NAME) will use this identifier to deliver personalized experience to you.' }
    ],
    [
      'expo-font',
      {
        fonts: [
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/lato/font/lato_black.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/lato/font/lato_blackitalic.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/lato/font/lato_bold.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/lato/font/lato_bolditalic.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/lato/font/lato_light.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/lato/font/lato_lightitalic.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/lato/font/lato_regular.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/lato/font/lato_regularitalic.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/lato/font/lato_thin.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/lato/font/lato_thinitalic.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font/opensans_bold.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font/opensans_bolditalic.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font/opensans_extrabold.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font/opensans_extrabolditalic.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font/opensans_light.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font/opensans_lightitalic.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font/opensans_medium.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font/opensans_mediumitalic.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font/opensans_regular.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font/opensans_regularitalic.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font/opensans_semibold.ttf',
          '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font/opensans_semibolditalic.ttf'
        ]
      }
    ],
    [
      'expo-xml-font',
      [
        {
          name: 'Lato',
          folder: '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/lato/font',
          variants: [
            { fontFile: 'lato_black', fontWeight: 900, italic: false },
            { fontFile: 'lato_blackitalic', fontWeight: 900, italic: true },
            { fontFile: 'lato_bold', fontWeight: 700, italic: false },
            { fontFile: 'lato_bolditalic', fontWeight: 700, italic: true },
            { fontFile: 'lato_regular', fontWeight: 400, italic: false },
            { fontFile: 'lato_regularitalic', fontWeight: 400, italic: true },
            { fontFile: 'lato_light', fontWeight: 300, italic: false },
            { fontFile: 'lato_lightitalic', fontWeight: 300, italic: true },
            { fontFile: 'lato_thin', fontWeight: 100, italic: false },
            { fontFile: 'lato_thinitalic', fontWeight: 100, italic: true }
          ]
        },
        {
          name: 'Open Sans',
          folder: '../mds-shared-component-library/src/packages/core/src/providers/mdsFontProvider/fonts/opensans/font',
          variants: [
            { fontFile: 'opensans_extrabold', fontWeight: 800, italic: false },
            { fontFile: 'opensans_extrabolditalic', fontWeight: 800, italic: false },
            { fontFile: 'opensans_bold', fontWeight: 700, italic: false },
            { fontFile: 'opensans_bolditalic', fontWeight: 700, italic: false },
            { fontFile: 'opensans_semibold', fontWeight: 600, italic: false },
            { fontFile: 'opensans_semibolditalic', fontWeight: 600, italic: false },
            { fontFile: 'opensans_medium', fontWeight: 500, italic: false },
            { fontFile: 'opensans_mediumitalic', fontWeight: 500, italic: false },
            { fontFile: 'opensans_regular', fontWeight: 400, italic: false },
            { fontFile: 'opensans_regularitalic', fontWeight: 400, italic: false },
            { fontFile: 'opensans_light', fontWeight: 300, italic: false },
            { fontFile: 'opensans_lightitalic', fontWeight: 300, italic: false }
          ]
        }
      ]
    ],
    './assets/expo-fix-plugin.js',
    './assets/expo-linking.js',
    'expo-tracking-transparency'
  ]
};
