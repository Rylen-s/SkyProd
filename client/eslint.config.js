// https://docs.expo.dev/guides/using-eslint/
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('cjs');
module.exports = defaultConfig;


