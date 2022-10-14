import { main as BackgroundMainModule } from './main';

// import scriptPath_main from "../contentScripts/cs-modules/main?script"; //&module

import scriptPath_toolbar from '../contentScripts/cs-scripts/toolbar?script';
import scriptPath_sidebar from '../contentScripts/cs-scripts/sidebar?script';
import { ms_extensionReloadStream } from '../utils/messages';

console.log(' -BG CRXJS DEV- ');

ms_extensionReloadStream.subscribe(([_, sender]) => {
  console.log("services worker 'dev.ts' browser.runtime.reload();");

  //browser.tabs.query({ active: true }).then((tab) => {
  // browser.runtime.reload();
  browser.tabs.reload(sender.tab?.id, { bypassCache: false });
  //});
});

const scriptPaths = {
  // polyfill: "node_modules/webextension-polyfill/dist/browser-polyfill.js",
  // main: scriptPath_main,
  toolbar: scriptPath_toolbar,
  sidebar: scriptPath_sidebar,
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
