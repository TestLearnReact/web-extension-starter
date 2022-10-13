import { SharedInPageUIState } from "@ui/common/sharedInPageUI";
import { ContentScriptComponent, SidebarScriptMain, ToolbarScriptMain } from "../types";
/**
 * Main Module for HMR && inject in webpage
 */
declare const csMainModule: (params?: {
    loadRemotely?: boolean;
    devScripts?: {
        toolbarDevModule: ToolbarScriptMain;
        sidebarDevModule: SidebarScriptMain;
    };
}) => Promise<SharedInPageUIState>;
export { csMainModule };
declare type ContentScriptLoader = (component: ContentScriptComponent) => Promise<void>;
export declare function createContentScriptLoader(args: {
    loadRemotely?: boolean;
}): ContentScriptLoader;
