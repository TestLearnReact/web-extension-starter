import { main as BackgroundMainModule } from "./main";

// import scriptPath_main from "../contentScripts/cs-modules/main?script"; //&module

import scriptPath_toolbar from "../contentScripts/cs-scripts/toolbar?script";
import scriptPath_sidebar from "../contentScripts/cs-scripts/sidebar?script";

console.log(" -BG CRXJS DEV- ");

const scriptPaths = {
  // polyfill: "node_modules/webextension-polyfill/dist/browser-polyfill.js",
  // main: scriptPath_main,
  toolbar: scriptPath_toolbar,
  sidebar: scriptPath_sidebar,
};

BackgroundMainModule({ contentScriptsPaths: scriptPaths });

export {};
