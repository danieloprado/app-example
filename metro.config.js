/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const { getSentryExpoConfig } = require('@sentry/react-native/metro');

const projectRoot = __dirname;
const config = getSentryExpoConfig(projectRoot);

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

module.exports = config;
