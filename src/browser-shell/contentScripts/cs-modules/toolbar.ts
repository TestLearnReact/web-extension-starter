import browser from "webextension-polyfill";
import {
  // destroyFrontendToolbar,
  setupFrontendToolbar,
} from "@browser-shell/frontends/toolbar";
import {
  createInPageUI,
  destroyInPageUI,
  InPageUIRootMount,
} from "@browser-shell/frontends/common";
import { ToolbarScriptMain } from "../types";
import {
  ms_componentDestroyStream,
  ms_componentInitStream,
} from "@browser-shell/utils";

export const toolbarMain: ToolbarScriptMain = async (dependencies) => {
  // const cssFile = ""; //browser.runtime.getURL(`css/contentScript_toolbar.css`);
  // console.log(window.location, isCsBuild, __CS_BUILD__); //
  // const cssFile =
  //   !__CS_BUILD__ || isCsDevHtmlchrome() // isViteAndDev
  //     ? ""
  //     : browser.extension.getURL(`dist/contentScripts/toolbar.css`);

  const cssFile = browser.runtime.getURL(`css/contentScripts/cs.toolbar.css`);

  let mount: InPageUIRootMount;
  const createMount = () => {
    if (!mount) {
      mount = createInPageUI("toolbar", cssFile);
    }
  };
  createMount();

  ms_componentInitStream.subscribe(async ([{ component }, sender]) => {
    if (component !== "toolbar") return;
    console.log("TOOLBAR -> S ETU P <-", component);

    await setUp();
  });

  ms_componentDestroyStream.subscribe(async ([{ component }, sender]) => {
    if (component !== "toolbar") return;
    console.log("TOOLBAR -> DESTROY <-", component);
    destroy();
  });

  const setUp = async () => {
    createMount();
    setupFrontendToolbar(mount, {
      ...dependencies,
    });
  };
  //setUp();
  const destroy = () => {
    if (!mount) {
      return;
    }

    destroyInPageUI("toolbar");
    //destroyFrontendToolbar(mount.rootElement, mount.shadowRoot);
  };
};
