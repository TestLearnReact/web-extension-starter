import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import svgr from "@honkhonk/vite-plugin-svgr";
// const reactSvgPlugin = require('vite-plugin-react-svg');
import reactSvgPlugin from "vite-plugin-react-svg";
import Icons from "unplugin-icons/vite";

import { crx, defineDynamicResource, defineManifest } from "@crxjs/vite-plugin";
import AutoImport from "unplugin-auto-import/vite";
import { isDev, r } from "../dev-scripts/utils";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { promises as fs } from "fs";
// loader helpers
import { FileSystemIconLoader } from "unplugin-icons/loaders";

import packageJson from "../../package.json";
import path, { dirname, relative } from "path";

const { version } = packageJson;

//import dns from "dns";

//dns.setDefaultResultOrder("verbatim");

const manifest = defineManifest({
  manifest_version: 3,
  name: "V3 -> CRXJS <-",
  version: version,
  action: {
    default_popup: "src/browser-shell/popup/index.html",
  },
  options_ui: {
    page: "src/browser-shell/options/index.html",
    open_in_tab: true,
  },
  icons: {
    16: "public/assets/icons/icon-512.png",
    48: "public/assets/icons/icon-512.png",
    128: "public/assets/icons/icon-512.png",
  },
  content_scripts: [
    {
      js: ["src/browser-shell/contentScripts/cs-scripts/main.ts"],
      matches: ["https://www.google.com/*"],
      run_at: "document_idle",
      //run_at: "document_end",
    },
  ],
  background: {
    service_worker: "src/browser-shell/background/dev.ts",
    type: "module",
  },
  permissions: ["scripting", "tabs", "storage", "activeTab", "webNavigation"],
  host_permissions: ["https://www.google.com/*"], //
  web_accessible_resources: [
    defineDynamicResource({
      matches: ["https://www.google.com/*"], //"https://www.google.com/*"
    }),
    {
      resources: [
        "dist/*",
        "src/*",
        "assets/*",
        "public/*",
        "public/assets/icons/close.svg",
        "public/assets/icons/openSidebar.svg",
        "assets/icons/openSidebar.svg",
      ],
      matches: ["<all_urls>"],
    },
  ],
});

export default defineConfig({
  resolve: {
    alias: {
      //"@browser-shell": `${r("src/browser-shell")}/`,
      "@ui": `${r("src/browser-shell/extension-ui")}/`,
      "@utils": `${r("src/browser-shell/utils")}/`,
      "@message-system": r("src/message-system/index.ts"),
      "~icons/public-assets-icons/*": r("public/assets/icons/"),
    },
  },
  define: {
    __DEV__: isDev,
    __IS_WEBPACK__: false,
    __IS_VITE__: false,
    __IS_CRXJS__: true,
  },

  plugins: [
    // svgr(),
    // Icons({
    //   compiler: "jsx",
    //   jsx: "react",
    //   customCollections: {
    //     // key as the collection name
    //     "my-icons": {
    //       account: "<svg><!-- ... --></svg>",
    //       // load your custom icon lazily
    //       settings: () => fs.readFile("./path/to/my-icon.svg", "utf-8"),
    //       /* ... */
    //     },
    //     "my-other-icons": async (iconName) => {
    //       // your custom loader here. Do whatever you want.
    //       // for example, fetch from a remote server:
    //       return await fetch(`https://example.com/icons/${iconName}.svg`).then(
    //         (res) => res.text()
    //       );
    //     },
    //     // a helper to load icons from the file system
    //     // files under `./assets/icons` with `.svg` extension will be loaded as it's file name
    //     // you can also provide a transform callback to change each icon (optional)
    //     icons: FileSystemIconLoader(r("./public/assets/icons"), (svg) =>
    //       svg.replace(/^<svg /, '<svg fill="currentColor" ')
    //     ),
    //   },
    // }),
    Icons({
      compiler: "jsx",
      jsx: "react",
      customCollections: {
        // key as the collection name
        "my-icons": {
          account: "<svg><!-- ... --></svg>",
          // load your custom icon lazily
          settings: () => fs.readFile("./path/to/my-icon.svg", "utf-8"),
          /* ... */
        },
        "my-other-icons": async (iconName) => {
          // your custom loader here. Do whatever you want.
          // for example, fetch from a remote server:
          return await fetch(`https://example.com/icons/${iconName}.svg`).then(
            (res) => res.text()
          );
        },
        // a helper to load icons from the file system
        // files under `./assets/icons` with `.svg` extension will be loaded as it's file name
        // you can also provide a transform callback to change each icon (optional)
        "public-assets-icons": FileSystemIconLoader(
          r("./public/assets/icons"),
          (svg) => svg.replace(/^<svg /, '<svg fill="currentColor" ')
        ),
      },
    }),
    react(),

    crx({ manifest }),

    AutoImport({
      imports: [
        {
          "webextension-polyfill": [["*", "browser"]],
        },
      ],
      dts: r("src/browser-shell/auto-imports.d.ts"),
    }),
  ],
  build: {
    rollupOptions: {
      // add any html pages here
      input: {
        // output file at '/index.html'
        welcome: r("src/browser-shell/frontends/sidebar", "index.html"),
        // output file at '/src/panel.html'
        // panel: resolve(__dirname, "src/panel.html"),
      },
    },
  },
  optimizeDeps: {
    include: ["webextension-polyfill"], //"styled-components"
  },
});
