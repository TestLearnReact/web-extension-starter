import browser from "webextension-polyfill";
import { isFirefox, isForbiddenUrl } from "../env"; // ~/ todo

// Firefox fetch files from cache instead of reloading changes from disk,
// hmr will not work as Chromium based browser
browser.webNavigation.onCommitted.addListener(({ tabId, frameId, url }) => {
  // Filter out non main window events.
  console.log("- contentScriptHMR.ts -");
  if (frameId !== 0) return;

  if (isForbiddenUrl(url)) return;

  // inject the latest scripts
  browser.tabs
    .executeScript(tabId, {
      file: `${isFirefox ? "" : "."}/dist/contentScripts/index.global.js`,
      runAt: "document_end",
    })
    .catch((error) => console.error(error));
});
