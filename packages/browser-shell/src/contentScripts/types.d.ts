import { SidebarContainerDependencies } from "@ui/content-scripts-frontends/sidebar";
import { ToolbarContainerDependencies } from "@ui/content-scripts-frontends/toolbar";
export declare type ContentScriptComponent = "sidebar" | "toolbar" | "main" | "polyfill";
export interface ContentScriptRegistry {
    registerToolbarScript(main: ToolbarScriptMain): Promise<void>;
    registerSidebarScript(main: SidebarScriptMain): Promise<void>;
}
export declare type ToolbarScriptMain = (dependencies: ToolbarContainerDependencies) => Promise<void>;
export declare type SidebarScriptMain = (dependencies: SidebarContainerDependencies) => Promise<void>;
