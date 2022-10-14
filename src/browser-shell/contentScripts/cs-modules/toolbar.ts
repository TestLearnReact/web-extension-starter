import browser from 'webextension-polyfill';
import {
  destroyFrontendToolbar,
  setupFrontendToolbar,
} from '@ui/content-scripts-frontends/toolbar';
import { createInPageUI, destroyInPageUI, InPageUIRootMount } from '@ui/common';
import { ToolbarScriptMain } from '../types';
import {
  ms_componentDestroyStream,
  ms_componentInitStream,
} from '@utils/messages';

export const toolbarMain: ToolbarScriptMain = async (dependencies) => {
  const cssFile = __IS_CRXJS__
    ? ''
    : browser.runtime.getURL(`css/contentScripts/cs.toolbar.css`);

  let mount: InPageUIRootMount;
  const createMount = () => {
    if (!mount) {
      mount = createInPageUI('toolbar', cssFile);
    }
  };
  createMount();

  ms_componentInitStream.subscribe(async ([{ component }, sender]) => {
    if (component !== 'toolbar') return;
    console.log('TOOLBAR -> S ETU P <-', component);

    await setUp();
  });

  ms_componentDestroyStream.subscribe(async ([{ component }, sender]) => {
    if (component !== 'toolbar') return;
    console.log('TOOLBAR -> DESTROY <-', component);
    destroy();
  });

  const setUp = async () => {
    createMount();
    setupFrontendToolbar(mount, {
      ...dependencies,
    });
  };

  const destroy = () => {
    if (!mount) {
      return;
    }

    destroyInPageUI('toolbar');
    destroyFrontendToolbar(mount.rootElement, mount.shadowRoot);
  };
};
