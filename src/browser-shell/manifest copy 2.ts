import fs from "fs-extra";
import type { Manifest } from "webextension-polyfill";
import type PkgType from "../../package.json";
// @ts-ignore
import { isDev, port, r } from "../../build-tools/dev-scripts/utils";

import type { ManifestV3Export } from "@crxjs/vite-plugin";

export async function getManifest(): Promise<ManifestV3Export> {
  const pkg = (await fs.readJSON(r("package.json"))) as typeof PkgType;

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: ManifestV3Export = {
    //Manifest.WebExtensionManifest
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: "./assets/icons/icon-512.png",
      default_popup: "./dist/popup/index.html",
    },
    options_ui: {
      page: "./dist/options/index.html",
      open_in_tab: true,
    },
    background: {
      service_worker: "./dist/background.js",
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
          //"./lib/react-refresh.js",
          "./lib/browser-polyfill.js",
          "./dist/vendor.js",
          "./dist/messages.js",
          "./dist/contentScripts/cs.global.js",
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

  const manifest2: ManifestV3Export = {
    manifest_version: 2,
    name: "Sample WebExtension",
    version: "0.0.0",

    icons: {
      "16": "assets/icons/favicon-16.png",
      "32": "assets/icons/favicon-32.png",
      "48": "assets/icons/favicon-48.png",
      "128": "assets/icons/favicon-128.png",
    },
    description: "Sample description",
    homepage_url: "https://github.com/abhijithvijayan/web-extension-starter",
    short_name: "Sample Name",

    permissions: ["activeTab", "storage", "http://*/*", "https://*/*"],

    content_security_policy: "script-src 'self'; object-src 'self'",

    "__chrome|firefox__author": "abhijithvijayan",
    __opera__developer: {
      name: "abhijithvijayan",
    },

    __firefox__applications: {
      gecko: {
        id: "{754FB1AD-CC3B-4856-B6A0-7786F8CA9D17}",
      },
    },

    __chrome__minimum_chrome_version: "49",
    __opera__minimum_opera_version: "36",

    browser_action: {
      default_popup: "popup.html",
      default_icon: {
        "16": "assets/icons/favicon-16.png",
        "32": "assets/icons/favicon-32.png",
        "48": "assets/icons/favicon-48.png",
        "128": "assets/icons/favicon-128.png",
      },
      default_title: "tiny title",
      "__chrome|opera__chrome_style": false,
      __firefox__browser_style: false,
    },

    "__chrome|opera__options_page": "options.html",
    options_ui: {
      page: "options.html",
      open_in_tab: true,
      __chrome__chrome_style: false,
    },

    background: {
      scripts: ["js/background.bundle.js"],
      "__chrome|opera__persistent": false,
    },

    content_scripts: [
      {
        matches: ["http://*/*", "https://*/*"],
        js: ["js/contentScript.bundle.js"],
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
