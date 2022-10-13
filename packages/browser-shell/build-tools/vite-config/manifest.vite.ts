import { defineDynamicResource, defineManifest } from "@crxjs/vite-plugin";

import packageJson from "../../package.json";

const { version } = packageJson;

export const manifest = defineManifest({
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
