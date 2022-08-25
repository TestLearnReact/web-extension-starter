import fs from "fs-extra";
import type { Manifest } from "webextension-polyfill";
import type PkgType from "../../package.json";
// @ts-ignore
import { isDev, port, r } from "../../build-tools/dev-scripts/utils";

import type { ManifestV3Export } from "@crxjs/vite-plugin";

export async function getManifest() {
  const pkg = (await fs.readJSON(r("package.json"))) as typeof PkgType;

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: ManifestV3Export = {
    //Manifest.WebExtensionManifest
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
      service_worker: "./dist/background/index.js",
      type: "module",
    },
    icons: {
      16: "./assets/icons/icon-512.png",
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
          "./dist/contentScripts/index.global.js",
        ],
      },
    ],
    web_accessible_resources: [
      {
        resources: ["dist/*", "src/*", "assets/*"],
        matches: ["<all_urls>"],
      },
    ],
  };
  // console.log("isDev", isDev, process.env.NODE_ENV);
  // if (isDev) {
  //   // for content script, as browsers will cache them for each reload,
  //   // we use a background script to always inject the latest version
  //   // see src/background/contentScriptHMR.ts
  //   delete manifest.content_scripts;
  //   manifest.permissions?.push("webNavigation");

  //   // this is required on dev for Vite script to load
  //   ///manifest.content_security_policy = `script-src \'self\' http://localhost:${port}; object-src \'self\'`;
  //   //manifest.content_security_policy = `script-src \'self\' 'sha256-TikAVT3TDd8KfZOLAW9TG6pVSDjWWktyzhTMs7Rm+1o=' http://localhost:${port}; object-src \'self\'`;
  // }

  return manifest;
}
