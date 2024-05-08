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
          './assets/fonts/FiraCode/firacode_bold.ttf',
          './assets/fonts/FiraCode/firacode_light.ttf',
          './assets/fonts/FiraCode/firacode_medium.ttf',
          './assets/fonts/FiraCode/firacode_regular.ttf',
          './assets/fonts/FiraCode/firacode_semibold.ttf'
        ]
      }
    ],
    [
      'expo-xml-font',
      [
        {
          name: 'Fira Code',
          folder: './assets/fonts/FiraCode',
          variants: [
            { fontFile: 'firacode_light', fontWeight: 300 },
            { fontFile: 'firacode_regular', fontWeight: 400 },
            { fontFile: 'firacode_medium', fontWeight: 500 },
            { fontFile: 'firacode_semibold', fontWeight: 600 },
            { fontFile: 'firacode_bold', fontWeight: 700 }
          ]
        }
      ]
    ],
    './assets/expo-fix-plugin.js',
    './assets/expo-linking.js',
    'expo-tracking-transparency'
  ]
};
