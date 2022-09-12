import getMessage from "@message-system";
import { ContentScriptComponent } from "../contentScripts/types";

export const [
  ms_sendInjectScript,
  ms_injectScriptStream,
  ms_waitForInjectScript,
] = getMessage<{ filename: ContentScriptComponent }>("INJECT_SCRIPT");

export const [
  ms_sendComponentInit,
  ms_componentInitStream,
  ms_waitForComponentInit,
] = getMessage<{ component: ContentScriptComponent }>("COMPONENT_INIT"); // InPageUIComponent

export const [
  ms_sendComponentDestroy,
  ms_componentDestroyStream,
  ms_waitForComponentDestroy,
] = getMessage<{ component: ContentScriptComponent }>("COMPONENT_DESTROY");

export const [
  ms_sendExtensionReload,
  ms_extensionReloadStream,
  ms_waitForExtensionReload,
] = getMessage<void>("EXTENSION_RELOAD");
