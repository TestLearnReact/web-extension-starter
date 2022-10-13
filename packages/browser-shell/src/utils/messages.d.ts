import { ContentScriptComponent } from "../contentScripts/types";
import type { InPageUIComponentShowState } from "@ui/common";
/** extension messages */
export declare const ms_sendInjectScript: ((data: T_6, options?: import("packages/message-system/src/types").SendOptions | undefined) => Promise<void>) & {
    toTab: (options?: import("packages/message-system/src/types").SendOptions | undefined) => Promise<void>;
}, ms_injectScriptStream: import("rxjs").Observable<[{
    filename: ContentScriptComponent;
}, import("webextension-polyfill").Runtime.MessageSender]>, ms_waitForInjectScript: (predicate?: ((x: T_6) => boolean) | undefined) => Promise<T_6>;
export declare const ms_sendComponentInit: ((data: T_6, options?: import("packages/message-system/src/types").SendOptions | undefined) => Promise<void>) & {
    toTab: (options?: import("packages/message-system/src/types").SendOptions | undefined) => Promise<void>;
}, ms_componentInitStream: import("rxjs").Observable<[{
    component: ContentScriptComponent;
}, import("webextension-polyfill").Runtime.MessageSender]>, ms_waitForComponentInit: (predicate?: ((x: T_6) => boolean) | undefined) => Promise<T_6>;
export declare const ms_sendComponentDestroy: ((data: T_6, options?: import("packages/message-system/src/types").SendOptions | undefined) => Promise<void>) & {
    toTab: (options?: import("packages/message-system/src/types").SendOptions | undefined) => Promise<void>;
}, ms_componentDestroyStream: import("rxjs").Observable<[{
    component: ContentScriptComponent;
}, import("webextension-polyfill").Runtime.MessageSender]>, ms_waitForComponentDestroy: (predicate?: ((x: T_6) => boolean) | undefined) => Promise<T_6>;
/**
 *
 */
export declare const ms_sendInPageUiState: ((data: T_6, options?: import("packages/message-system/src/types").SendOptions | undefined) => Promise<void>) & {
    toTab: (options?: import("packages/message-system/src/types").SendOptions | undefined) => Promise<void>;
}, ms_inPageUiStateStream: import("rxjs").Observable<[InPageUIComponentShowState & {
    theme?: "dark" | "light" | undefined;
}, import("webextension-polyfill").Runtime.MessageSender]>, ms_waitForInPageUiStateStream: (predicate?: ((x: T_6) => boolean) | undefined) => Promise<T_6>;
export declare const ms_sendSharedStateSettings: ((data: T_6, options?: import("packages/message-system/src/types").SendOptions | undefined) => Promise<void>) & {
    toTab: (options?: import("packages/message-system/src/types").SendOptions | undefined) => Promise<void>;
}, ms_sharedStateSettingsStream: import("rxjs").Observable<[{
    theme: "dark" | "light";
}, import("webextension-polyfill").Runtime.MessageSender]>, ms_waitForSharedStateSettings: (predicate?: ((x: T_6) => boolean) | undefined) => Promise<T_6>;
/**
 * development
 *  */
export declare const ms_sendExtensionReload: ((data: T_6, options?: import("packages/message-system/src/types").SendOptions | undefined) => Promise<void>) & {
    toTab: (options?: import("packages/message-system/src/types").SendOptions | undefined) => Promise<void>;
}, ms_extensionReloadStream: import("rxjs").Observable<[{}, import("webextension-polyfill").Runtime.MessageSender]>, ms_waitForExtensionReload: (predicate?: ((x: T_6) => boolean) | undefined) => Promise<T_6>;
