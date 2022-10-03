import {
  ms_sendComponentInit,
  ms_sendInjectScript,
} from "@browser-shell/utils";
import { SharedInPageUIState } from "../sharedInPageUI";
import {
  ContentScriptComponent,
  ContentScriptRegistry,
  SidebarScriptMain,
  ToolbarScriptMain,
} from "../types";
import { Resolvable, resolvablePromise } from "../utils";

/**
 * Main Module for HMR && inject in webpage
 */
const csMainModule = async (
  params: {
    loadRemotely?: boolean;
    devScripts?: {
      toolbarDevModule: ToolbarScriptMain;
      sidebarDevModule: SidebarScriptMain;
    };
  } = { loadRemotely: true }
) => {
  console.log("cs-modules/main.ts...");

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

  const inPageUI = new SharedInPageUIState({
    loadComponent: (component) => {
      if (!components[component]) {
        components[component] = resolvablePromise<void>();
        loadContentScript(component);
      }
      return components[component]!;
    },
    unloadComponent: (component) => {
      delete components[component];
    },
  });

  // const inPageUI = {
  //   loadComponent: (component: any) => {
  //     // ContentScriptComponent

  //     if (!components[component]) {
  //       components[component] = resolvablePromise<void>();
  //       loadContentScript(component);
  //     }

  //     return components[component]!;
  //   },
  //   unloadComponent: (component) => {
  //     delete components[component];
  //   },
  // };

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

  // 6. Setup other interactions with this page (things that always run)
  const loadContentScript = createContentScriptLoader({
    loadRemotely: params.loadRemotely,
  });

  // use es modules in development for frontend stuff
  // (chrome-extension://xxx/src/browser-shell/contentScripts/index.html)
  if (__DEV__ && window.location.href.startsWith("chrome-extension://")) {
    // webpack bundles code in production mode too, so we passed modules as parameter only in dev
    // no need inject scripts
    await params.devScripts?.toolbarDevModule(csDeps.toolbar);
    await params.devScripts?.sidebarDevModule(csDeps.toolbar);
    // await toolbarMain(csDeps.toolbar);
    // await sidebarMain(csDeps.sidebar);

    ms_sendComponentInit({ component: "toolbar" }).then(() =>
      inPageUI.setComponentShouldSetup({
        component: "toolbar",
        shouldSetUp: true,
      })
    );
    ms_sendComponentInit({ component: "sidebar" }).then(() =>
      inPageUI.setComponentShouldSetup({
        component: "sidebar",
        shouldSetUp: true,
      })
    );
  } else {
    // inject scripts
    await inPageUI.loadComponent("toolbar");
    await inPageUI.loadComponent("sidebar");
  }

  // ms_sendComponentInit({ component: "toolbar" });
  // ms_sendComponentInit({ component: "sidebar" });

  return inPageUI;
};

export { csMainModule };

type ContentScriptLoader = (component: ContentScriptComponent) => Promise<void>;
export function createContentScriptLoader(args: { loadRemotely?: boolean }) {
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
