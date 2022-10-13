import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import { crx, defineDynamicResource, defineManifest } from "@crxjs/vite-plugin";
import AutoImport from "unplugin-auto-import/vite";
import { isDev, r } from "../dev-scripts/utils";
import { promises as fs } from "fs";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

import packageJson from "../../package.json";

const { version } = packageJson;

const manifest = defineManifest({
  manifest_version: 3,
  name: "V3 -> CRXJS <-",
  version: version,
  action: {
    default_popup: "src/popup/index.html",
  },
  options_ui: {
    page: "src/options/index.html",
    open_in_tab: true,
  },
  icons: {
    16: "public/assets/icons/icon-512.png",
    48: "public/assets/icons/icon-512.png",
    128: "public/assets/icons/icon-512.png",
  },
  content_scripts: [
    {
      js: ["src/contentScripts/cs-scripts/main.ts"],
      matches: ["https://www.google.com/*"],
      run_at: "document_idle",
    },
  ],
  background: {
    service_worker: "src/background/dev.ts",
    type: "module",
  },
  permissions: ["scripting", "tabs", "storage", "activeTab", "webNavigation"],
  host_permissions: ["https://www.google.com/*"],
  web_accessible_resources: [
    defineDynamicResource({
      matches: ["https://www.google.com/*"],
    }),
    {
      resources: ["public/*", "dist/*", "src/*"],
      matches: ["<all_urls>"],
    },
  ],
});

export default defineConfig({
  resolve: {
    alias: {
      "@ui": `${r("src/extension-ui")}/`,
      "@utils": `${r("src/utils")}/`,
      "@workspace/message-system": r("../message-system/src/index.ts"),
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
      dts: r("src/auto-imports.d.ts"),
    }),
  ],
  build: {
    outDir: "../../dist",
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
    include: ["webextension-polyfill"], //"styled-components"
  },
});
