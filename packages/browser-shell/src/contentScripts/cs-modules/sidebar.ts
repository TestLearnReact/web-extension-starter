import browser from "webextension-polyfill";
import { createInPageUI, destroyInPageUI, InPageUIRootMount } from "@ui/common";
import {
  setupFrontendSidebar,
  destroyFrontendSidebar,
} from "@ui/content-scripts-frontends/sidebar";
import { SidebarScriptMain } from "../types";
import {
  ms_componentInitStream,
  ms_componentDestroyStream,
} from "@utils/messages";

export const sidebarMain: SidebarScriptMain = async (dependencies) => {
  const cssFile = __IS_CRXJS__
    ? ""
    : browser.runtime.getURL(`css/contentScripts/cs.sidebar.css`);

  let mount: InPageUIRootMount;
  const createMount = () => {
    if (!mount) {
      mount = createInPageUI("sidebar", cssFile);
    }
  };
  createMount();

  ms_componentInitStream.subscribe(async ([{ component }, sender]) => {
    if (component !== "sidebar") return;
    console.log("SIDEBAR -> S ETU P <-", component);
    await setUp();
  });

  ms_componentDestroyStream.subscribe(async ([{ component }, sender]) => {
    if (component !== "sidebar") return;
    console.log("SIDEBAR -> DESTROY <-", component);
    destroy();
  });

  const setUp = async (options: { showOnLoad?: boolean } = {}) => {
    createMount();

    setupFrontendSidebar(mount, {
      ...dependencies,
    });
  };

  const destroy = () => {
    if (!mount) {
      return;
    }

    destroyInPageUI("sidebar");
    // destroyFrontendSidebar(mount.rootElement, mount.shadowRoot);
  };
};
