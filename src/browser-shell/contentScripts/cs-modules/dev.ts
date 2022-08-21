import { isFirefox } from "~/browser-shell/env";

import scriptPath_toolbar from "../cs-scripts/toolbar?script";
import scriptPath_sidebar from "../cs-scripts/sidebar?script";

//let scriptPath_toolbar = "";
//let scriptPath_sidebar = "";
// let scriptPaths = {};

export const getScriptPaths = async () => {
  if (__DEV__ && __IS_CRXJS__) {
    // scriptPath_toolbar = await import("../cs-scripts/toolbar?script"!);
    // scriptPath_sidebar = await import("../cs-scripts/sidebar?script"!);
  }

  const scriptPaths = {
    toolbar:
      __DEV__ && __IS_CRXJS__
        ? scriptPath_toolbar
        : `${isFirefox ? "" : "."}/dist/contentScripts/index.toolbar.js`,
    sidebar:
      __DEV__ && __IS_CRXJS__
        ? scriptPath_sidebar
        : `${isFirefox ? "" : "."}/dist/contentScripts/index.sidebar.js`,
  };

  console.log(".dev: ", scriptPaths);
  return scriptPaths;
};
