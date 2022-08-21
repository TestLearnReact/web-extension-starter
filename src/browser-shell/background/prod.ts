import { main as BackgroundMainModule } from "./main";
import { isFirefox } from "~/browser-shell/env";

const scriptPaths = {
  toolbar: `${isFirefox ? "" : "."}/dist/contentScripts/index.toolbar.js`,
  sidebar: `${isFirefox ? "" : "."}/dist/contentScripts/index.sidebar.js`,
};

BackgroundMainModule({ contentScriptsPaths: scriptPaths });

export {};
