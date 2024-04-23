/** @type {import('expo/config').ExpoConfig} */
export default ({ config }) => ({
  ...config,
  name: 'AppExample',
  slug: 'AppExample',
  scheme: 'appExample',
  version: '1.7.2',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  assetBundlePatterns: ['assets/fonts/MaterialCommunityIcons.ttf'],
  platforms: ['ios', 'android'],
  primaryColor: '#4259a9',
  backgroundColor: '#000000',
  ios: {
    buildNumber: '74',
    supportsTablet: false,
    bundleIdentifier: 'pt.app.example',
    googleServicesFile: './assets/ios/GoogleService-Info.plist',
    infoPlist: {
      NSMicrophoneUsageDescription: '$(PRODUCT_NAME) needs access to your microphone for nothing.',
      NSCameraUsageDescription:
        '$(PRODUCT_NAME) needs access to your Camera for send the verification document and to use the "Scanner de Placas" feature.',
      NSPhotoLibraryAddUsageDescription:
        '$(PRODUCT_NAME) needs access to your photos for send the verification document and request a case.',
      NSPhotoLibraryUsageDescription:
        '$(PRODUCT_NAME) needs access to your photos for send the verification document and request a case.',
      FirebaseAppDelegateProxyEnabled: true,
      LSApplicationQueriesSchemes: ['mailto', 'tel', 'comgooglemaps'],
      UIBackgroundModes: ['remote-notification', 'fetch']
    },
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#FFFFFF',
      dark: {
        image: './assets/splash-dark.png',
        resizeMode: 'contain',
        backgroundColor: '#000000'
      }
    }
  },
  androidStatusBar: { translucent: true },
  android: {
    versionCode: 74,
    adaptiveIcon: {
      foregroundImage: './assets/icon-adaptive.png',
      monochromeImage: './assets/icon-monochrome.png',
      backgroundColor: '#FFFFFF'
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
      backgroundColor: '#FFFFFF',
      dark: {
        image: './assets/splash-dark.png',
        resizeMode: 'native',
        backgroundColor: '#000000'
      }
    }
  },
  notification: {
    icon: './assets/icon-notification.png',
    color: '#FFFFFF',
    androidMode: 'default'
  },
  plugins: [
    '@react-native-firebase/app',
    '@react-native-firebase/messaging',
    '@react-native-firebase/crashlytics',
    ['@sentry/react-native/expo', { organization: 'appExample', project: 'appExample-app', authToken: '' }],
    'expo-notifications',
    ['expo-screen-orientation', { initialOrientation: 'PORTRAIT' }],
    ['expo-build-properties', { ios: { useFrameworks: 'static' } }],
    [
      'expo-tracking-transparency',
      { userTrackingPermission: '$(PRODUCT_NAME) will use this identifier to deliver personalized experience to you.' }
    ],
    './assets/expo-fix-plugin.js',
    './assets/expo-linking.js',
    'expo-tracking-transparency'
  ]
});
