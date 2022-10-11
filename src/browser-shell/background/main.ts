import browser, { Tabs } from "webextension-polyfill";
import { ContentScriptComponent } from "../contentScripts/types";
import {
  ms_injectScriptStream,
  ms_componentInitStream,
  ms_sendComponentInit,
  ms_inPageUiStateStream,
  ms_sendInPageUiState,
  ms_componentDestroyStream,
  ms_sendComponentDestroy,
  ms_sharedStateSettingsStream,
  ms_sendSharedStateSettings,
} from "../utils";

export const main = async ({
  contentScriptsPaths,
}: {
  contentScriptsPaths: any;
}) => {
  browser.runtime.onInstalled.addListener((): void => {
    // eslint-disable-next-line no-console
    console.log("Extension instal.led");
  });

  ms_injectScriptStream.subscribe(async ([{ filename }, sender]) => {
    await injectContentScriptComponent({
      tabId: sender.tab?.id,
      component: filename,
    });
  });

  const injectContentScriptComponent = async ({
    tabId,
    component,
  }: {
    tabId: Tabs.Tab["id"];
    component: ContentScriptComponent;
  }): Promise<void> => {
    await browser.scripting
      .executeScript({
        target: { tabId: tabId as number, allFrames: true },
        files: [contentScriptsPaths[component]],
      })
      .then(() => {
        console.log(`worker.ts inject script '${component}' in Tab ${tabId}`);
      })
      .catch((error) =>
        console.error(`worker.ts inject error Tab ${tabId}`, error)
      );
  };

  /**
   * message bridge between content scripts
   */
  ms_componentInitStream.subscribe(async ([{ component }, sender]) => {
    await ms_sendComponentInit({ component }, { tabId: sender.tab?.id });
  });

  ms_componentDestroyStream.subscribe(async ([{ component }, sender]) => {
    await ms_sendComponentDestroy({ component }, { tabId: sender.tab?.id });
  });

  ms_inPageUiStateStream.subscribe(async ([{ toolbar, sidebar }, sender]) => {
    await ms_sendInPageUiState({ toolbar, sidebar }, { tabId: sender.tab?.id });
  });

  ms_sharedStateSettingsStream.subscribe(async ([{ theme }, sender]) => {
    await ms_sendSharedStateSettings({ theme }, { tabId: sender.tab?.id });
  });
};
