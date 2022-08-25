//import browser from "webextension-polyfill";
// import mainWorld from "./main?script&module";
// import * as browser from "./browser-polyfill";
import { ms_sendInjectScript } from "~/browser-shell/utils";

//ms_sendInjectScript({ filename: "polyfill" });
ms_sendInjectScript({ filename: "main" });

// const scriptP = document.createElement("script");
// scriptP.src = chrome.runtime.getURL(browser);
// scriptP.type = "module";
// document.head.prepend(scriptP);

// const script = document.createElement("script");
// script.src = chrome.runtime.getURL(mainWorld);
// script.type = "module";
// document.head.prepend(script);
