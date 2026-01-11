// import { tamaguiPlugin } from '@tamagui/vite-plugin-tamagui'
const path = require('path');

module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    'nativewind/babel', // NativeWind v4 应该放在 presets 中
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname, 'src')],
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
        ],
      },
      // tamaguiPlugin({
      //   config: './src/tamagui.config.ts',
      //   outputCSS: './src/tamagui.css',
      // }),
    ],
    'react-native-worklets/plugin',
  ],
};
