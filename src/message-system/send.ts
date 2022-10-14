import browser from 'webextension-polyfill';
import { ChromeMessageError } from './ChromeMessageError';
import { CoreMessage, CoreResponse, SendOptions } from './types';

export const scopeSend =
  (scope: string) =>
  (message: any, { tabId, frameId } = {} as SendOptions): Promise<void> =>
    new Promise((resolve, reject) => {
      const coreMessage: CoreMessage = {
        async: false,
        tabId: tabId || null,
        payload: message,
        scope,
      };

      const callback = (response: CoreResponse) => {
        try {
          if (browser.runtime.lastError) {
            const lastError = browser.runtime.lastError.message;
            const noResponse =
              'The message port closed before a response was received';

            if (lastError && lastError.includes(noResponse)) {
              resolve();
            } else {
              reject(new ChromeMessageError({ coreMessage }));
            }
          } else if (response && !response.success) {
            reject(response.payload);
          } else {
            resolve();
          }
        } catch (error) {}
      };

      if (typeof tabId === 'number' && typeof frameId === 'number') {
        browser.tabs
          .sendMessage(tabId, coreMessage, { frameId })
          .then(callback);
      } else if (typeof tabId === 'number') {
        browser.tabs
          .sendMessage(tabId, coreMessage)
          .then(() => {
            callback;
            //console.log("Tru: ", coreMessage, tabId, coreMessage);
          })
          .catch((err) => console.log('Err: ', err, tabId, coreMessage));
      } else {
        browser.runtime.sendMessage(coreMessage).then(callback);
      }
    });

export const scopeAsyncSend =
  (scope: string) =>
  (message: any, { tabId, frameId } = {} as SendOptions): Promise<any> =>
    new Promise((resolve, reject) => {
      const coreMessage: CoreMessage = {
        async: true,
        tabId: tabId || null,
        payload: message,
        scope,
      };

      const callback = (coreResponse: CoreResponse | null) => {
        console.log(coreResponse);
        if (
          browser.runtime.lastError ||
          coreResponse === null ||
          !coreResponse.success
        ) {
          reject(new ChromeMessageError({ coreMessage, coreResponse }));
          return false;
        } else {
          resolve(coreResponse!.payload);
          return true; //
        }
      };

      if (typeof tabId === 'number' && typeof frameId === 'number') {
        browser.tabs
          .sendMessage(tabId, coreMessage, { frameId })
          .then(callback);
      } else if (typeof tabId === 'number') {
        browser.tabs.sendMessage(tabId, coreMessage).then(callback);
      } else {
        browser.runtime.sendMessage(coreMessage).then(callback);
      }
    });
