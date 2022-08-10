import {
  ms_sendComponentInit,
  ms_sendInjectScript,
} from "~/browser-shell/utils";
import { ContentScriptComponent, ContentScriptRegistry } from "../types";
import { Resolvable, resolvablePromise } from "../utils";
import { sidebarMain } from "./sidebar";
import { toolbarMain } from "./toolbar";

import scriptPath_toolbar from "../cs-scripts/toolbar?script";
import scriptPath_sidebar from "../cs-scripts/sidebar?script";

// let scriptPath_toolbar = "";
// let scriptPath_sidebar = "";

// (async () => {
//   if (__IS_CRXJS__) {
//     scriptPath_toolbar = await import("../cs-scripts/toolbar?script"!);
//     scriptPath_sidebar = await import("../cs-scripts/sidebar?script"!);
//     console.log(scriptPath_sidebar, scriptPath_toolbar);
//   }
// })();

const test = { toolbar: scriptPath_toolbar, sidebar: scriptPath_sidebar };
console.log(test);

/**
 * Main Module for HMR && inject in webpage
 */
const csMainModule = async (
  params: {
    loadRemotely?: boolean;
  } = {}
) => {
  params.loadRemotely = params.loadRemotely ?? true;

  console.log("cs-modules/main.ts......");

  // 1. Create a local object with promises to track each content script
  // initialisation and provide a function which can initialise a content script
  // or ignore if already loaded.
  const components: {
    toolbar?: Resolvable<void>;
    sidebar?: Resolvable<void>;
  } = {};

  // 2. Initialise dependencies required by content scripts

  // 3. Creates an instance of the InPageUI manager class to encapsulate
  // business logic of initialising and hide/showing components.
  const inPageUI = {
    loadComponent: (component: ContentScriptComponent) => {
      if (!components[component]) {
        components[component] = resolvablePromise<void>();
        loadContentScript(component);
      }

      return components[component]!;
    },
    unloadComponent: (component) => {
      delete components[component];
    },
  };

  // 4. Create a contentScriptRegistry object with functions for each content script
  // component, that when run, initialise the respective component with it's
  // dependencies

  const csDeps = {
    toolbar: { inPageUI },
    sidebar: { inPageUI },
  };

  const contentScriptRegistry: ContentScriptRegistry = {
    async registerToolbarScript(executeToolbarScript): Promise<void> {
      await executeToolbarScript(csDeps.toolbar);
      components.toolbar?.resolve();
    },
    async registerSidebarScript(executeSidebarScript): Promise<void> {
      await executeSidebarScript(csDeps.sidebar);
      components.sidebar?.resolve();
    },
  };

  window["contentScriptRegistry"] = contentScriptRegistry;

  /** use vite HMR  */
  // if (true) { // todo
  //   //!__CS_BUILD__
  //   await toolbarMain(csDeps.toolbar);
  //   await sidebarMain(csDeps.sidebar);
  // }

  // 6. Setup other interactions with this page (things that always run)
  const loadContentScript = createContentScriptLoader({
    loadRemotely: params.loadRemotely,
  });

  await inPageUI.loadComponent("toolbar");
  ms_sendComponentInit({ component: "toolbar" });

  await inPageUI.loadComponent("sidebar");
  ms_sendComponentInit({ component: "sidebar" });

  return inPageUI;
};

export { csMainModule };

type ContentScriptLoader = (component: ContentScriptComponent) => Promise<void>;
export function createContentScriptLoader(args: { loadRemotely: boolean }) {
  const remoteLoader: ContentScriptLoader = async (
    component: ContentScriptComponent
  ) => {
    await ms_sendInjectScript({ filename: component });
  };

  const localLoader: ContentScriptLoader = async (
    component: ContentScriptComponent
  ) => {
    const script = document.createElement("script");
    script.src = `../content_script_${component}.js`;
    document.body.appendChild(script);
  };

  return args?.loadRemotely ? remoteLoader : localLoader;
}
