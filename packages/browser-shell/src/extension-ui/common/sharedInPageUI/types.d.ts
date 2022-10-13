export declare type InPageUIComponent = "toolbar" | "sidebar";
export declare type InPageUIComponentShowState = {
    [Component in InPageUIComponent]: boolean;
};
export interface SharedInPageUIInterface {
    componentsShown: InPageUIComponentShowState;
    showToolbar(): Promise<void>;
    hideToolbar(): Promise<void>;
    removeToolbar(): Promise<void>;
    toggleToolbar(): Promise<void>;
    showSidebar(): Promise<void>;
    hideSidebar(): Promise<void>;
    toggleSidebar(): Promise<void>;
    toggleTheme(): Promise<void>;
}
export declare type ContentScriptComponent = "toolbar" | "sidebar";
