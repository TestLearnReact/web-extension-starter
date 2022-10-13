import getMessage from '@workspace/message-system';
import { ContentScriptComponent } from '../contentScripts/types';
import type { InPageUIComponentShowState } from '@ui/common';

/** extension messages */
export const [
  ms_sendInjectScript,
  ms_injectScriptStream,
  ms_waitForInjectScript,
] = getMessage<{
  filename: ContentScriptComponent;
}>('INJECT_SCRIPT');

export const [
  ms_sendComponentInit,
  ms_componentInitStream,
  ms_waitForComponentInit,
] = getMessage<{
  component: ContentScriptComponent;
}>('COMPONENT_INIT');

export const [
  ms_sendComponentDestroy,
  ms_componentDestroyStream,
  ms_waitForComponentDestroy,
] = getMessage<{ component: ContentScriptComponent }>('COMPONENT_DESTROY');

/**
 *
 */
export const [
  ms_sendInPageUiState,
  ms_inPageUiStateStream,
  ms_waitForInPageUiStateStream,
] = getMessage<InPageUIComponentShowState & { theme?: 'dark' | 'light' }>(
  'INPAGE_UI_STATE',
);

export const [
  ms_sendSharedStateSettings,
  ms_sharedStateSettingsStream,
  ms_waitForSharedStateSettings,
] = getMessage<{ theme: 'dark' | 'light' }>('SHARED_STATE_SETTINGS');

/**
 * development
 *  */
export const [
  ms_sendExtensionReload,
  ms_extensionReloadStream,
  ms_waitForExtensionReload,
] = getMessage<{}>('EXTENSION_RELOAD');
