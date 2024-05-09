/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const { getSentryExpoConfig } = require('@sentry/react-native/metro');

const mdsMetroConfig = require('@mds/core/metro-config');

const projectRoot = __dirname;
const config = mdsMetroConfig(getSentryExpoConfig(projectRoot));

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (!moduleName.startsWith('@/')) {
    return context.resolveRequest(context, moduleName, platform);
  }

  const module = /[\/\\]src[\/\\]((?:modules[\/\\])?[a-zA-Z]+)[\/\\]/gim.exec(context.originModulePath)?.[1];

  if (!module) {
    return context.resolveRequest(context, moduleName, platform);
  }

  const baseFile = path.join(__dirname, 'src', module, ...moduleName.replace('@/', '').split('/'));
  const filePath = ['.tsx', '.ts', 'index.tsx', 'index.ts', '']
    .map(ext => {
      if (!ext) return baseFile;
      if (ext.startsWith('.')) return `${baseFile}${ext}`;
      return path.join(baseFile, ext);
    })
    .find(filePath => fs.existsSync(filePath));

  if (!filePath) {
    return context.resolveRequest(context, moduleName, platform);
  }

  return { filePath, type: 'sourceFile' };
};

config.resolver.extraNodeModules = {
  '@mds/core': path.resolve(__dirname, '../mds-shared-component-library/src/packages/core'),
  '@mds/general': path.resolve(__dirname, '../mds-shared-component-library/src/packages/general'),
  'react': path.resolve(__dirname, 'node_modules/react'),
  'react-native': path.resolve(__dirname, 'node_modules/react-native')
};

config.watchFolders = [
  path.resolve(__dirname, '../mds-shared-component-library/src/packages/core'),
  path.resolve(__dirname, '../mds-shared-component-library/src/packages/general')
];

module.exports = config;
