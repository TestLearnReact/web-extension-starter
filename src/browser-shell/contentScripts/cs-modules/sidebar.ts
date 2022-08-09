import browser from "webextension-polyfill";
import {
  createInPageUI,
  destroyInPageUI,
  InPageUIRootMount,
} from "~/browser-shell/frontends/common";
import {
  setupFrontendSidebar,
  //destroyFrontendSidebar,
} from "~/browser-shell/frontends/sidebar";
import { SidebarScriptMain } from "../types";
import {
  ms_componentInitStream,
  ms_componentDestroyStream,
} from "~/browser-shell/utils";

export const sidebarMain: SidebarScriptMain = async (dependencies) => {
  const cssFile = ""; //browser.runtime.getURL(`dist/contentScripts/sidebar.css`); //browser.extension.getURL(`css/contentScript_sidebar.css`);

  // const cssFile =
  //   !__CS_BUILD__ || isCsDevHtmlchrome() //isViteAndDev
  //     ? ""
  //     : browser.extension.getURL(`dist/contentScripts/sidebar.css`); //browser.extension.getURL(`css/contentScript_sidebar.css`);

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
  //setUp();
  const destroy = () => {
    if (!mount) {
      return;
    }

    destroyInPageUI("sidebar");
    //destroyFrontendSidebar(mount.rootElement, mount.shadowRoot);
  };
};
