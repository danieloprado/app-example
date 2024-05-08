/* eslint-disable @typescript-eslint/no-require-imports */
const { withPlugins } = require('@expo/config-plugins');

const withMDSFonts = config => {
  return withPlugins(config, [
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
            { fontFile: 'opensans_extrabolditalic', fontWeight: 800, italic: true },
            { fontFile: 'opensans_bold', fontWeight: 700, italic: false },
            { fontFile: 'opensans_bolditalic', fontWeight: 700, italic: true },
            { fontFile: 'opensans_semibold', fontWeight: 600, italic: false },
            { fontFile: 'opensans_semibolditalic', fontWeight: 600, italic: true },
            { fontFile: 'opensans_medium', fontWeight: 500, italic: false },
            { fontFile: 'opensans_mediumitalic', fontWeight: 500, italic: true },
            { fontFile: 'opensans_regular', fontWeight: 400, italic: false },
            { fontFile: 'opensans_regularitalic', fontWeight: 400, italic: true },
            { fontFile: 'opensans_light', fontWeight: 300, italic: false },
            { fontFile: 'opensans_lightitalic', fontWeight: 300, italic: true }
          ]
        }
      ]
    ]
  ]);
};

module.exports = withMDSFonts;
