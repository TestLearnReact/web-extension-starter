import { csMainModule } from "./cs-modules/main";

// const Test = () => <div></div>;

/**
 * CS Module for development without injecting
 * Change MakeHMRworking to makeHMRworking for vite reload instead of hmr
 */
export const MakeHMRworking = async () => {
  console.log("- - - HMR - - - HMR - - - HMR- - - HMR - - -");
  await csMainModule({ loadRemotely: true });
};

MakeHMRworking();
