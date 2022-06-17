/** @type {import('next').NextConfig} */
const { withExpo } = require('@expo/next-adapter');
const withFonts = require('next-fonts');

const { withNativebase } = require('@native-base/next-adapter')

module.exports = withNativebase({
  plugins: [
    withFonts,
    [
      withExpo,
      { projectRoot: __dirname }
    ]
  ],
  dependencies: [
    '@expo/next-adapter',
    'react-native-vector-icons',
    'react-native-vector-icons-for-web',
    'solito',
    'app',
  ],
  nextConfig: {
    projectRoot: __dirname,
    reactStrictMode: true,
    webpack5: true,
    webpack: (config, options) => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'react-native$': 'react-native-web',
        '@expo/vector-icons': 'react-native-vector-icons',
      }
      config.resolve.extensions = [
        '.web.js',
        '.web.ts',
        '.web.tsx',
        ...config.resolve.extensions,
      ]
      return config
    },
  },
})
