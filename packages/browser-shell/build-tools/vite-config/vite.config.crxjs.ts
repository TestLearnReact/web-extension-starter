import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Icons from 'unplugin-icons/vite';
import { crx } from '@crxjs/vite-plugin';
import AutoImport from 'unplugin-auto-import/vite';
import { promises as fs } from 'fs';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

import { manifest } from './manifest.vite';
import { isDev, OUTDIR_VITE_NAME, resSrc } from '../shared';
import path from 'path';
import { aliasVite, getAlias, packages } from '../shared/sharedConfig';

// alias: {
//   "@workspace/browser-shell": resSrc("../../browser-shell/src/"),
//   "@workspace/message-system": resSrc("../../message-system/src/index.ts"),
//   "@browser-shell": resSrc(),
//   "@ui": `${resSrc("extension-ui")}/`,
//   "@utils": `${resSrc("utils")}/`,
//   "~icons/public-assets-icons/*": resSrc("../public/assets/icons/"),
// },

export default defineConfig({
  resolve: {
    alias: getAlias(aliasVite),
  },
  define: {
    __DEV__: isDev,
    __IS_WEBPACK__: false,
    __IS_VITE__: false,
    __IS_CRXJS__: true,
  },

  plugins: [
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      customCollections: {
        // key as the collection name
        'my-icons': {
          account: '<svg><!-- ... --></svg>',
          // load your custom icon lazily
          settings: () => fs.readFile('./path/to/my-icon.svg', 'utf-8'),
          /* ... */
        },
        'my-other-icons': async (iconName) => {
          // your custom loader here. Do whatever you want.
          // for example, fetch from a remote server:
          return await fetch(`https://example.com/icons/${iconName}.svg`).then(
            (res) => res.text(),
          );
        },
        // a helper to load icons from the file system
        // files under `./assets/icons` with `.svg` extension will be loaded as it's file name
        // you can also provide a transform callback to change each icon (optional)
        'public-assets-icons': FileSystemIconLoader(
          resSrc('../public/assets/icons'),
          (svg) => svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
      },
    }),
    react(),
    crx({ manifest }),
    AutoImport({
      imports: [
        {
          'webextension-polyfill': [['*', 'browser']],
        },
      ],
      dts: resSrc('auto-imports.d.ts'),
    }),
  ],
  build: {
    outDir: `../../${OUTDIR_VITE_NAME}`,
    rollupOptions: {
      // add any html pages here
      input: {
        // output file at '/index.html'
        // welcome: r("src/browser-shell/frontends/sidebar", "index.html"),
        // output file at '/src/panel.html'
        // panel: resolve(__dirname, "src/panel.html"),
      },
    },
  },
  optimizeDeps: {
    include: ['webextension-polyfill'], //"styled-components"
  },
});
