import fs from "fs-extra";
import type PkgType from "../../package.json";
import { r } from "../../build-tools/dev-scripts/utils";
import type { ManifestV3Export } from "@crxjs/vite-plugin";

export async function getManifest(): Promise<ManifestV3Export> {
  const pkg = (await fs.readJSON(r("package.json"))) as typeof PkgType;

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: ManifestV3Export = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    // action: {
    //   default_icon: "./assets/icons/icon-512.png",
    //   default_popup: "./dist/popup/index.html",
    // },
    // options_ui: {
    //   page: "./dist/options/index.html",
    //   open_in_tab: true,
    // },
    background: {
      service_worker: "./dist/background.js",
      type: "module",
    },
    icons: {
      16: "./assets/icons/icon-512.png",
      32: "./assets/icons/icon-512.png",
      48: "./assets/icons/icon-512.png",
      128: "./assets/icons/icon-512.png",
    },
    permissions: ["scripting", "tabs", "storage", "activeTab", "webNavigation"],
    host_permissions: ["https://www.google.com/*", "http://*/", "https://*/"],
    content_scripts: [
      {
        matches: ["http://*/*", "https://*/*"],
        js: [
          "./lib/browser-polyfill.js",
          "./dist/vendor.js",
          "./dist/messages.js",
          "./dist/contentScripts/cs.global.js",
        ],
      },
    ],
    web_accessible_resources: [
      {
        resources: ["dist/*", "src/*", "assets/*", "*.css"],
        matches: ["<all_urls>"],
      },
    ],
  };

  return manifest;
}
