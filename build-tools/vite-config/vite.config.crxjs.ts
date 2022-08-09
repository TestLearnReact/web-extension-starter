import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineDynamicResource, defineManifest } from "@crxjs/vite-plugin";
import AutoImport from "unplugin-auto-import/vite";

import pkg from "../../package.json";

import packageJson from "../../package.json";
import { isDev, r } from "../dev-scripts/utils";
const { version } = packageJson;

const manifest = defineManifest({
  manifest_version: 3,
  name: "V3 -> CRXJS <-",
  version: pkg.version,
  action: {
    default_popup: "src/browser-shell/popup/index.html",
  },
  options_ui: {
    page: "src/browser-shell/options/index.html",
    open_in_tab: true,
  },
  icons: {
    16: "public/icon-512.png",
    48: "public/icon-512.png",
    128: "public/icon-512.png",
  },
  content_scripts: [
    {
      js: [
        // "public/browser-polyfill.js",
        // "src/browser-shell/contentScripts/scripts/toolbar.tsx",
        // "src/browser-shell/contentScripts/scripts/sidebar.tsx",
        // "src/browser-shell/contentScripts/scripts/main.ts",
        "src/browser-shell/contentScripts/cs-scripts/main.ts",
      ],
      matches: ["https://www.google.com/*"],
      run_at: "document_start",
    },
  ],
  background: {
    service_worker: "src/browser-shell/background/main.ts",
    type: "module",
  },
  permissions: ["scripting", "tabs", "storage", "activeTab", "webNavigation"],
  host_permissions: ["https://www.google.com/*"],
  web_accessible_resources: [
    defineDynamicResource({
      matches: ["https://www.google.com/*"],
    }),
    {
      resources: [
        "dist/*",
        "src/*",
        "assets/*",
        // "src/browser-shell/contentScripts/scripts/main.ts",
        // "src/browser-shell/contentScripts/scripts/toolbar.tsx",
        // "src/browser-shell/contentScripts/scripts/sidebar.tsx",
      ],
      matches: ["<all_urls>"],
    },
  ],
});

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${r("src")}/`,
    },
  },
  define: {
    __DEV__: isDev,
    __IS_WEBPACK__: false,
    __IS_VITE__: false,
    __IS_CRXJS__: true,
  },

  plugins: [
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
        // welcome: resolve(__dirname, "index.html"),
        // output file at '/src/panel.html'
        // panel: resolve(__dirname, "src/panel.html"),
      },
    },
  },
  optimizeDeps: {
    include: ["webextension-polyfill", "styled-components"],
    //entries: ["src/*.html"],
  },
});
