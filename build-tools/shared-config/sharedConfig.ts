import path from 'path';
import { res, resRoot, resSrc } from './sharedUtils';

export const packages = ['browser-shell', 'message-system'];

//   'webextension-polyfill': resRoot(
//     'node_modules/webextension-polyfill/dist',
//     'browser-polyfill.js',
//   ),
//   '@browser-shell': resRoot('src/browser-shell/'),
//   '@message-system': resRoot('src/message-system/index.ts'),
//   '~icons/public-assets-icons': path.resolve(
//     __dirname,
//     '../../public/assets/icons/',
//   ),
//   '@ui': resRoot('src/browser-shell/extension-ui/'),
//   '@utils': resRoot('src/browser-shell/utils/'),

export const aliasVite = {
  '~icons/public-assets-icons/*': res('public/assets/icons/'),
  // '@browser-shell': resSrc('browser-shell'),
  '@ui': resSrc('browser-shell/extension-ui/'),
  '@utils': resSrc('browser-shell/utils/'),
};

export const aliasWebpack = {
  'webextension-polyfill': resRoot(
    'node_modules/webextension-polyfill/dist',
    'browser-polyfill.js',
  ),
  '~icons/public-assets-icons': res('public/assets/icons/'),
  // '@browser-shell': resSrc('browser-shell'),
  '@ui': resSrc('browser-shell/extension-ui/'),
  '@utils': resSrc('browser-shell/utils/'),
};

export const getAlias = (alias) =>
  packages.reduce(
    (alias, p) => ({
      ...alias,
      [`@${p}`]: path.resolve(__dirname, `../../src/${p}/`),
    }),
    alias,
  );
