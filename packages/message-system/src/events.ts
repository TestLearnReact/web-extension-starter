import browser from 'webextension-polyfill';
import { _getListener, _removeListener, _setListener } from './ListenerMap';
import {
  AsyncMessageListener,
  CoreListener,
  CoreResponse,
  MessageListener,
} from './types';

export const scopeOn = (scope: string) => (callback: MessageListener) => {
  const listener: CoreListener = (message, sender) => {
    if (message.async || message.scope !== scope) {
      // console.log("false:: ", scope, message); todo 1000 mal bei inject
      return false;
    }
    // console.log(
    //   "ttt:: ",
    //   message.tabId,
    //   message.payload.greeting,
    //   message.payload.data
    // );
    try {
      callback(message.payload, sender);
    } catch (error) {
      // Log listener error
      console.error('Uncaught error in chrome.runtime.onMessage listener');
      console.error(error);
    }

    return false;
  };

  browser.runtime.onMessage.addListener(listener);
  _setListener(scope, callback, listener);
};

export const scopeAsyncOn =
  (scope: string) => (callback: AsyncMessageListener) => {
    const listener: CoreListener = (message, sender) => {
      if (!message.async || scope !== message.scope) return false;

      return new Promise((resolve) => {
        handleMessage();

        function handleMessage() {
          try {
            const respond = (response: any): any => {
              const coreResponse: CoreResponse = {
                success: true,
                payload: response,
              };

              resolve(coreResponse);
            };

            callback(message.payload, sender, respond);
          } catch (error) {
            const response: CoreResponse = {
              success: false,
              payload: {
                greeting: (error as any).message,
              },
            };

            resolve(response);
          }
        }
      });
    };

    browser.runtime.onMessage.addListener(listener);
    _setListener(scope, callback, listener);
  };

export const scopeOff =
  (scope: string) => (listener: MessageListener | AsyncMessageListener) => {
    const _listener = _getListener(scope, listener);

    if (_listener) {
      _removeListener(scope, listener);
      browser.runtime.onMessage.removeListener(_listener);
    }
  };

// import browser from "webextension-polyfill";
// import { _getListener, _removeListener, _setListener } from "./ListenerMap";
// import {
//   AsyncMessageListener,
//   CoreListener,
//   CoreResponse,
//   MessageListener,
// } from "./types";

// export const scopeOn = (scope: string) => (callback: MessageListener) => {
//   const listener: CoreListener = (message, sender) => {
//     if (message.async || message.scope !== scope) {
//       return false;
//     }

//     try {
//       callback(message.payload, sender);
//       // console.log('send: ', message);
//     } catch (error) {
//       // Log listener error
//       console.error("Uncaught error in chrome.runtime.onMessage listener");
//       console.error(error);
//     }

//     return false;
//   };
//   // @ts-ignore
//   browser.runtime.onMessage.addListener(listener);
//   _setListener(scope, callback, listener);
// };

// export const scopeAsyncOn = (scope: string) => (
//   callback: AsyncMessageListener
// ) => {
//   const listener: CoreListener = (message, sender, sendResponse) => {
//     if (message.async && scope === message.scope) {
//       handleMessage();
//       return true;
//     }

//     return false;

//     //async function handleMessage() {
//     async function handleMessage() {
//       try {
//         const respond = (response: any): any => {
//           //void
//           //void
//           const coreResponse: CoreResponse = {
//             success: true,
//             payload: response,
//           };
//           console.log("send Async: ", message);
//           // return new Promise(coreResponse);
//           sendResponse(coreResponse);
//           //return true;

//           //Promise.resolve(sendResponse(coreResponse));
//           //return new Promise(resolve => resolve(sendResponse(coreResponse)));
//         };

//         callback(message.payload, sender, respond);
//         //callback(message.payload, sender).then(respond);

//         // console.log("send Async: ", message); todo 20 send
//       } catch (error) {
//         const response: CoreResponse = {
//           success: false,
//           payload: {
//             greeting: (error as any).message,
//           },
//         };

//         console.error(error);
//         // sendResponse(response);
//         //return true;

//         //Promise.resolve(sendResponse(response));
//         //return new Promise(resolve => resolve(sendResponse(response)));
//       }
//     }
//   };
//   // @ts-ignore
//   browser.runtime.onMessage.addListener(listener);
//   _setListener(scope, callback, listener);
// };

// export const scopeOff = (scope: string) => (
//   listener: MessageListener | AsyncMessageListener
// ) => {
//   console.log("66");
//   const _listener = _getListener(scope, listener);

//   if (_listener) {
//     _removeListener(scope, listener);
//     // @ts-ignore
//     browser.runtime.onMessage.removeListener(_listener);
//   }
// };

// export const scopeAsyncOn = (scope: string) => (
//   callback: AsyncMessageListener
// ) => {
//   const listener: any = (message, sender, sendResponse) => {
//     //CoreListener
//     if (message.async && scope === message.scope) {
//       handleMessage();
//       return true;
//     }

//     return false;

//     async function handleMessage() {
//       try {
//         const respond = (response: any): void => {
//           const coreResponse: CoreResponse = {
//             success: true,
//             payload: response,
//           };

//           sendResponse(coreResponse);
//         };

//         await callback(message.payload, sender, respond);
//       } catch (error) {
//         const response: CoreResponse = {
//           success: false,
//           payload: {
//             greeting: (error as any).message,
//           },
//         };

//         sendResponse(response);
//       }
//     }
//   };

//   browser.runtime.onMessage.addListener(listener);
//   _setListener(scope, callback, listener);
// };
