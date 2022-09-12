import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineDynamicResource, defineManifest } from "@crxjs/vite-plugin";
import AutoImport from "unplugin-auto-import/vite";
import { isDev, r } from "../dev-scripts/utils";

import packageJson from "../../package.json";

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
      resources: ["dist/*", "src/*", "assets/*"],
      matches: ["<all_urls>"],
    },
  ],
});

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${r("src")}/`,
      "@message-system": r("src/message-system/index.ts"),
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
  },
});
