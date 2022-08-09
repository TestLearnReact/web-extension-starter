import fs from "fs-extra";
import type { Manifest } from "webextension-polyfill";
import type PkgType from "../../package.json";
import { isDev, port, r } from "../../build-tools/dev-scripts/utils";

export async function getManifest() {
  const pkg = (await fs.readJSON(r("package.json"))) as typeof PkgType;

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    // browser_action: {
    //   default_icon: "./assets/icon-512.png",
    //   default_popup: "./dist/popup/index.html",
    // },
    action: {
      default_icon: "./assets/icon-512.png",
      default_popup: "./dist/popup/index.html",
    },
    options_ui: {
      page: "./dist/options/index.html",
      open_in_tab: true,
      //chrome_style: false,
    },
    background: {
      service_worker: "./dist/background/index.js",
      //page: "./dist/background/index.html",
      // persistent: false,
    },
    icons: {
      16: "./assets/icon-512.png",
      48: "./assets/icon-512.png",
      128: "./assets/icon-512.png",
    },
    //permissions: ["tabs", "storage", "activeTab", "http://*/", "https://*/"],
    permissions: [
      "scripting",
      "tabs",
      "storage",
      "activeTab",
      "webNavigation",
      // "http://*/",
      // "https://*/",
    ],
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
      // "dist/contentScripts/style.css",
      // "dist/contentScripts/*.css",
      // "dist/contentScripts/*.js",
      {
        resources: ["dist/*", "src/*", "assets/*"],
        matches: ["<all_urls>"],
      },
    ],
    content_security_policy: {
      extension_pages: `script-src http://localhost:${port}; object-src http://localhost:${port}`,
      //sandbox: "popup.html",
    },

    //content_security_policy: `script-src \'self\' 'sha256-uqvjqQ+3tIw3tAixESLIm5CD+GATXktILXrajK5e4wo=' http://localhost:${port}; object-src \'self\'`,
  };
  console.log("isDev", isDev, process.env.NODE_ENV);
  if (isDev) {
    // for content script, as browsers will cache them for each reload,
    // we use a background script to always inject the latest version
    // see src/background/contentScriptHMR.ts
    delete manifest.content_scripts;
    manifest.permissions?.push("webNavigation");

    // this is required on dev for Vite script to load
    ///manifest.content_security_policy = `script-src \'self\' http://localhost:${port}; object-src \'self\'`;
    //manifest.content_security_policy = `script-src \'self\' 'sha256-TikAVT3TDd8KfZOLAW9TG6pVSDjWWktyzhTMs7Rm+1o=' http://localhost:${port}; object-src \'self\'`;
  }

  return manifest;
}
