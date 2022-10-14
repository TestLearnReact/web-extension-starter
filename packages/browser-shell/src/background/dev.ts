import { main as BackgroundMainModule } from './main';

// import scriptPath_main from "../contentScripts/cs-modules/main?script"; //&module

import scriptPathToolbar from '../contentScripts/cs-scripts/toolbar?script';
import scriptPathSidebar from '../contentScripts/cs-scripts/sidebar?script';
import { msExtensionReloadStream } from '../utils/messages';

console.log(' -BG CRXJS DEV- ');

msExtensionReloadStream.subscribe(([_, sender]) => {
  console.log('services worker dev.ts browser.runtime.reload()');

  // browser.tabs.query({ active: true }).then((tab) => {
  // browser.runtime.reload();
  browser.tabs.reload(sender.tab?.id, { bypassCache: false });
  // });
});

const scriptPaths = {
  // polyfill: "node_modules/webextension-polyfill/dist/browser-polyfill.js",
  // main: scriptPath_main,
  toolbar: scriptPathToolbar,
  sidebar: scriptPathSidebar,
};

BackgroundMainModule({ contentScriptsPaths: scriptPaths });

export {};

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete') {
//     chrome.tabs.query({url: url}, function(tabs) {
//         try {
//             chrome.scripting.executeScript({
//                 target: { tabId: tabs[0].id },
//                 files: ["js/script.js"]
//             })
//         }
//         catch(err) {
//             console.log(err)
//         }
//     })
//   }
// });
