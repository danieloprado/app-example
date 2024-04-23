/* eslint-disable @typescript-eslint/no-require-imports */
const { MD3LightTheme, MD3DarkTheme } = require('./tailwind.themes');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...convertPaperTheme({
          ...MD3LightTheme.colors,
          backdrop: 'rgba(0, 0, 0, 0.5)',
          primary: '#4259a9',
          onPrimary: '#ffffff',
          primaryContainer: '#dce1ff',
          onPrimaryContainer: '#00164f',
          secondary: 'rgb(0, 99, 154)',
          onSecondary: 'rgb(255, 255, 255)',
          secondaryContainer: 'rgb(206, 229, 255)',
          onSecondaryContainer: 'rgb(0, 29, 50)',
          elevation: {
            level0: 'transparent',
            level1: '#FFFBFE',
            level2: '#F4EFF4',
            level3: '#E6E1E5',
            level4: '#C9C5CA',
            level5: '#939094'
          }
        }),
        ...convertPaperTheme(
          {
            ...MD3DarkTheme.colors,
            backdrop: 'rgba(0, 0, 0, 0.7)',
            primary: '#a5c8ff',
            onPrimary: '#00315e',
            primaryContainer: '#004785',
            onPrimaryContainer: '#d4e3ff',
            secondary: 'rgb(150, 204, 255)',
            onSecondary: 'rgb(0, 51, 83)',
            secondaryContainer: 'rgb(0, 74, 117)',
            onSecondaryContainer: 'rgb(206, 229, 255)',
            elevation: {
              level0: 'transparent',
              level1: '#212121',
              level2: '#252525',
              level3: '#272727',
              level4: '#2C2C2C',
              level5: '#2D2D2D'
            }
          },
          'dark-'
        )
      }
    }
  },
  plugins: []
};

function convertPaperTheme(colors, prefix = '') {
  return Object.keys(colors).reduce((acc, key) => {
    if (key === 'elevation') {
      return {
        ...acc,
        ...Object.keys(colors['elevation']).reduce((acc, key) => {
          return { ...acc, [`${prefix}elevation-${key}`]: colors['elevation'][key] };
        }, {})
      };
    }

    return { ...acc, [`${prefix}${key}`]: colors[key] };
  }, {});
}
