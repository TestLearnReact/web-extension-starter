import browser, { Tabs } from 'webextension-polyfill';
import { ContentScriptComponent } from '../contentScripts/types';
import {
  msInjectScriptStream,
  msComponentInitStream,
  msSendComponentInit,
  msInPageUiStateStream,
  msSendInPageUiState,
  msComponentDestroyStream,
  msSendComponentDestroy,
  msSharedStateSettingsStream,
  msSendSharedStateSettings,
} from '../utils';

export const main = async ({
  contentScriptsPaths,
}: {
  contentScriptsPaths: any;
}) => {
  browser.runtime.onInstalled.addListener((): void => {
    // eslint-disable-next-line no-console
    console.log('Extension instal.led');
  });

  msInjectScriptStream.subscribe(async ([{ filename }, sender]) => {
    await injectContentScriptComponent({
      tabId: sender.tab?.id,
      component: filename,
    });
  });

  const injectContentScriptComponent = async ({
    tabId,
    component,
  }: {
    tabId: Tabs.Tab['id'];
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
        console.error(`worker.ts inject error Tab ${tabId}`, error),
      );
  };

  /**
   * message bridge between content scripts
   */
  msComponentInitStream.subscribe(async ([{ component }, sender]) => {
    await msSendComponentInit({ component }, { tabId: sender.tab?.id });
  });

  msComponentDestroyStream.subscribe(async ([{ component }, sender]) => {
    await msSendComponentDestroy({ component }, { tabId: sender.tab?.id });
  });

  msInPageUiStateStream.subscribe(async ([{ toolbar, sidebar }, sender]) => {
    await msSendInPageUiState({ toolbar, sidebar }, { tabId: sender.tab?.id });
  });

  msSharedStateSettingsStream.subscribe(async ([{ theme }, sender]) => {
    await msSendSharedStateSettings({ theme }, { tabId: sender.tab?.id });
  });
};
