import { csMainModule } from "./cs-modules/main";

import { sidebarMain } from "./cs-modules/sidebar";
import { toolbarMain } from "./cs-modules/toolbar";

/**
 * CS Module for development without injecting
 * Change MakeHMRworking to makeHMRworking for vite reload instead of hmr
 */
export const MakeHMRworking = async () => {
  console.log("- - - HMR - - - HMR - - - HMR- - - HMR - - -");
  await csMainModule({
    loadRemotely: true,
    devScripts: {
      toolbarDevModule: toolbarMain,
      sidebarDevModule: sidebarMain,
    },
  });
};

MakeHMRworking();
