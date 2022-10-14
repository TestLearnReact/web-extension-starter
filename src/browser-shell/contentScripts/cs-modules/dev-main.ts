import { csMainModule } from './main';

import { sidebarMain } from './sidebar';
import { toolbarMain } from './toolbar';

/**
 * CS Module for development without injecting
 * Change MakeHMRworking to makeHMRworking for vite reload instead of hmr
 */
export const MakeHMRworking = async () => {
  //console.log("- - - HMR - - - HMR - - - HMR- - - HMR - - -");
  console.log('! contentScripts/cs-modules/dev-main.ts !');
  await csMainModule({
    loadRemotely: true,
    devScripts: {
      toolbarDevModule: toolbarMain,
      sidebarDevModule: sidebarMain,
    },
  });
};

MakeHMRworking();
