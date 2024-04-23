/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const { withDangerousMod, withPlugins } = require('@expo/config-plugins');
const { mergeContents } = require('@expo/config-plugins/build/utils/generateCode');

async function readFileAsync(path) {
  return fs.promises.readFile(path, 'utf8');
}

async function saveFileAsync(path, content) {
  return fs.promises.writeFile(path, content, 'utf8');
}

const fixPodfile = type => c => {
  return withDangerousMod(c, [
    'ios',
    async config => {
      const file = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      const contents = await readFileAsync(file);
      await saveFileAsync(file, type === 'pre' ? preInstall(contents) : postInstall(contents));
      return config;
    }
  ]);
};

function preInstall(src) {
  return mergeContents({
    tag: 'assets/expo-fix-plugin.js#podfile-pre',
    src,
    newSrc: `
$RNFirebaseAnalyticsWithoutAdIdSupport = true
$RNFirebaseAsStaticFramework = true

# Convert all permission pods into static libraries
pre_install do |installer|
  Pod::Installer::Xcode::TargetValidator.send(:define_method, :verify_no_static_framework_transitive_dependencies) {}

  installer.pod_targets.each do |pod|
    if pod.name.eql?('VisionCameraOcr') || pod.name.eql?('VisionCamera')
      def pod.build_type;
        Pod::BuildType.static_library
      end
    end
  end
end
    `,
    anchor: /target 'Tracers' do/,
    offset: 0,
    comment: '#'
  }).contents;
}

function postInstall(src) {
  return mergeContents({
    tag: 'assets/expo-fix-plugin.js#podfile-post',
    src,
    newSrc: `
installer.pods_project.targets.each do |target|
  target.build_configurations.each do |config|
    config.build_settings.delete 'IPHONEOS_DEPLOYMENT_TARGET'
    config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
    config.build_settings['HEADER_SEARCH_PATHS'] ||= '$(inherited) '
    config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_ROOT}/../../../node_modules/react-native/ReactCommon"'
  end
end
    `,
    anchor: /installer.target_installation_results.pod_target_installation_results/,
    offset: 0,
    comment: '#'
  }).contents;
}

module.exports = config => withPlugins(config, [fixPodfile('pre'), fixPodfile('post')]);
