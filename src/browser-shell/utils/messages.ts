import getMessage from '@message-system';
import { InPageUIComponentShowState } from '@ui/common';
import { ContentScriptComponent } from '../contentScripts/types';

// export declare type InPageUIComponent = 'toolbar' | 'sidebar';

// export declare type InPageUIComponentShowState = {
//   [Component in InPageUIComponent]: boolean;
// };

/** extension messages */
export const [msSendInjectScript, msInjectScriptStream, msWaitForInjectScript] =
  getMessage<{ filename: ContentScriptComponent }>('INJECT_SCRIPT');

export const [
  msSendComponentInit,
  msComponentInitStream,
  msWaitForComponentInit,
] = getMessage<{ component: ContentScriptComponent }>('COMPONENT_INIT'); // InPageUIComponent

export const [
  msSendComponentDestroy,
  msComponentDestroyStream,
  msWaitForComponentDestroy,
] = getMessage<{ component: ContentScriptComponent }>('COMPONENT_DESTROY');

/**
 *
 */
export const [
  msSendInPageUiState,
  msInPageUiStateStream,
  msWaitForInPageUiStateStream,
] = getMessage<InPageUIComponentShowState & { theme?: 'dark' | 'light' }>(
  'INPAGE_UI_STATE',
);

export const [
  msSendSharedStateSettings,
  msSharedStateSettingsStream,
  msWaitForSharedStateSettings,
] = getMessage<{ theme: 'dark' | 'light' }>('SHARED_STATE_SETTINGS');

/**
 * development
 *  */
export const [
  msSendExtensionReload,
  msExtensionReloadStream,
  msWaitForExtensionReload,
] = getMessage<void>('EXTENSION_RELOAD');
