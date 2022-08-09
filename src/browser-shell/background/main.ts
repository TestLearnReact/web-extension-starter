import browser, { Tabs } from "webextension-polyfill";
import {
  ms_injectScriptStream,
  ms_componentInitStream,
  ms_sendComponentInit,
} from "../utils";
import { isFirefox, isForbiddenUrl } from "../env";

//** CRXJS imports */
// import scriptPath_toolbar from "../contentScripts/cs-scripts/toolbar?script";
// import scriptPath_sidebar from "../contentScripts/cs-scripts/sidebar?script";

let scriptPath_toolbar = "";
let scriptPath_sidebar = "";

type P = { [key: string]: string };
const scriptPaths: P = {
  toolbar: __IS_CRXJS__
    ? scriptPath_toolbar
    : `${isFirefox ? "" : "."}/dist/contentScripts/index.toolbar.js`,
  sidebar: __IS_CRXJS__
    ? scriptPath_sidebar
    : `${isFirefox ? "" : "."}/dist/contentScripts/index.sidebar.js`,
};

export const main = async () => {
  // inject content script in dev mode
  if (!__IS_CRXJS__ && import.meta?.hot) {
    // @ts-expect-error for background HMR
    import("/@vite/client");
    // load latest content script
    import("./contentScriptHMR");
  }

  if (__IS_WEBPACK__) {
    browser.webNavigation.onCommitted.addListener(({ tabId, frameId, url }) => {
      // Filter out non main window events.
      console.log("- contentScriptHMR.ts -");
      if (frameId !== 0) return;

      if (isForbiddenUrl(url)) return;

      // browser.scripting
      //   .executeScript({
      //     target: { tabId: tabId as number, allFrames: true },
      //     files: [`${isFirefox ? "" : "."}/lib/browser-polyfill.js`],
      //   })
      //   .then(() => {
      //     console.log(
      //       `worker.ts inject script 'browser-polyfill' in Tab ${tabId}`
      //     );
      //   })
      //   .catch((error) =>
      //     console.error(`worker.ts inject error Tab ${tabId}`, error)
      //   );

      // inject the latest scripts
      browser.scripting
        .executeScript({
          target: { tabId: tabId as number, allFrames: true },
          files: [
            `${isFirefox ? "" : "."}/dist/contentScripts/index.global.js`,
          ],
        })
        .then(() => {
          console.log(
            `worker.ts inject script 'index.global.js' in Tab ${tabId}`
          );
        })
        .catch((error) =>
          console.error(`worker.ts inject error Tab ${tabId}`, error)
        );
    });
  }

  browser.runtime.onInstalled.addListener((): void => {
    // eslint-disable-next-line no-console
    console.log("Extension installed");
  });

  ms_injectScriptStream.subscribe(async ([{ filename }, sender]) => {
    await injectContentScriptComponent({
      tabId: sender.tab?.id,
      component: filename,
    });
  });

  // message bridge
  ms_componentInitStream.subscribe(async ([{ component }, sender]) => {
    await ms_sendComponentInit({ component }, { tabId: sender.tab?.id });
  });

  const injectContentScriptComponent = async ({
    tabId,
    component,
  }: {
    tabId: Tabs.Tab["id"];
    component: string;
  }): Promise<void> => {
    await browser.scripting
      .executeScript({
        target: { tabId: tabId as number, allFrames: true },
        files: [scriptPaths[component]],
      })
      .then(() => {
        console.log(`worker.ts inject script '${component}' in Tab ${tabId}`);
      })
      .catch((error) =>
        console.error(`worker.ts inject error Tab ${tabId}`, error)
      );
  };
};

main();
