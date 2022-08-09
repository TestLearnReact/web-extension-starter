import { resolve } from "path";
import { Configuration } from "webpack";

export const nodeEnv = (process.env.NODE_ENV ||
  "development") as Configuration["mode"];
export const targetBrowser = process.env.TARGET_BROWSER || "chrome";
export const isEnvDevelopment = nodeEnv === "development";
export const isEnvProduction = nodeEnv === "production";

const res = (...args: string[]) => resolve(__dirname, "../../", ...args);

export const getExtensionFileType = (browser) => {
  if (browser === "opera") return "crx";
  if (browser === "firefox") return "xpi";
  return "zip";
};

export const sharedWebpackconfig: Configuration = {
  entry: {
    // "lib/browser-polyfill": res(
    //   "../../node_modules/webextension-polyfill/dist",
    //   "browser-polyfill.js"
    // ),
    //manifest: path.join(__dirname, "src", "manifest.json"),
    "dist/background/background": res("src", "background", "main.ts"),
    "dist/contentScripts/index.global": res(
      "src",
      "contentScripts",
      "content-scripts",
      "cs-main.ts"
    ),
    "dist/contentScripts/index.ribbon": res(
      "src",
      "contentScripts",
      "content-scripts",
      "cs-ribbon.ts"
    ),
    "dist/contentScripts/index.sidebar": res(
      "src",
      "contentScripts",
      "content-scripts",
      "cs-sidebar.ts"
    ),
    "dist/popup/popup": res("src", "popup", "main.tsx"),
    "dist/options/options": res("src", "options", "main.tsx"),
  },
  output: {
    path: res("../../extWeb", targetBrowser),
    filename: "[name].js",
  },
  resolve: {
    //plugins: [new TsconfigPathsPlugin()], // BUG webpack 5
    alias: {
      "webextension-polyfill": res(
        "../../node_modules/webextension-polyfill/dist",
        "browser-polyfill.js"
      ),
      "@project/app-backend": res("../app-backend/dist/index.es.js"),
      "@project/message-system": res("../message-system/dist/index.es.js"),
      "@project/shared-utils": res("../shared-utils/dist/index.es.js"),
      "@project/frontend-ribbon-cs": res(
        "../frontends/frontend-ribbon-cs/src/index.ts"
      ),
      "@project/frontend-sidebar-cs": res(
        "../frontends/frontend-sidebar-cs/src/index.ts"
      ),
      "@project/frontends-common": res(
        "../frontends/frontends-common/src/index.ts"
      ),
      "/@vite/client": res("../../node_modules/vite/dist/client/"),
    },
  },
};
