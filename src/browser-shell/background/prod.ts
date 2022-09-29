import { main as BackgroundMainModule } from "./main";
import { isFirefox } from "@browser-shell/env";

console.log(" -BG WEBPACK PROD- ");

const scriptPaths = {
  // toolbar: `${isFirefox ? "" : "."}/cs.toolbar.js`,
  // sidebar: `${isFirefox ? "" : "."}/cs.sidebar.js`,
  toolbar: `${isFirefox ? "" : "."}/dist/contentScripts/cs.toolbar.js`,
  sidebar: `${isFirefox ? "" : "."}/dist/contentScripts/cs.sidebar.js`,
};

BackgroundMainModule({ contentScriptsPaths: scriptPaths });

export {};
