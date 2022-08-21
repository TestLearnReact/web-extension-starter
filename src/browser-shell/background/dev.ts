import { main as BackgroundMainModule } from "./main";
import scriptPath_toolbar from "../contentScripts/cs-scripts/toolbar?script";
import scriptPath_sidebar from "../contentScripts/cs-scripts/sidebar?script";

const scriptPaths = {
  toolbar: scriptPath_toolbar,
  sidebar: scriptPath_sidebar,
};

BackgroundMainModule({ contentScriptsPaths: scriptPaths });

export {};
