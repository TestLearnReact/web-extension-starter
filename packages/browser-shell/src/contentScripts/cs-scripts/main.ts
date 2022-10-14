import { csMainModule } from '../cs-modules/main';
import { msSendExtensionReload } from '@utils/messages';
import { _DEV_OPTIONS } from '@ui/common/dev_config';

// /**
//  * Main content-script (manifest)
//  * inject in all webpages
//  *  */
export const main = async () => await csMainModule();

(async () => {
  await main();

  /**
   * development
   *  */
  if (__IS_CRXJS__ && import.meta.hot) {
    // hack: crxjs dont create loader-scripts in dist/assets/
    const scriptPathToolbar = await import('./toolbar?script');
    const scriptPathSidebar = await import('./sidebar?script');

    const port = browser.runtime.connect({ name: '@crx/client' }); // chrome

    port.onMessage.addListener((m) => {
      const payload = JSON.parse(m.data);
      console.log('pay', payload);
      if (isCrxHMRPayload(payload)) {
        if (payload.event === 'crx:runtime-reload') {
          // reload Tab always work
        } else {
          // HMR sometimes doesnt work
          // !!! --> Hack: SAVE TWICE ALWAYS WORK TOO <-- !!!
          // call browser.tabs.reload() in background/dev.ts
          _DEV_OPTIONS.DEV_RELOAD_EXTENSION && msSendExtensionReload();
        }
      }
    });
  }
})();

function isCrxHMRPayload(x) {
  return x.type === 'custom' && x.event.startsWith('crx:');
}
