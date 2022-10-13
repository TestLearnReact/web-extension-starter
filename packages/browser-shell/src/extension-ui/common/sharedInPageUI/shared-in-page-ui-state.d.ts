import { InPageUIComponentShowState, InPageUIComponent, SharedInPageUIInterface } from "./types";
export declare const isCsDevHtmlFirefox: (url: string) => boolean;
export interface SharedInPageUIDependencies {
    loadComponent: (component: InPageUIComponent) => void;
    unloadComponent: (component: InPageUIComponent) => void;
}
export declare class SharedInPageUIState implements SharedInPageUIInterface {
    private options;
    componentsShown: InPageUIComponentShowState;
    componentsSetUp: InPageUIComponentShowState;
    constructor(options: SharedInPageUIDependencies);
    toggleTheme(options?: any): Promise<void>;
    showSidebar(options?: any): Promise<void>;
    hideSidebar(): Promise<void>;
    toggleSidebar(): Promise<void>;
    loadComponent(component: InPageUIComponent, options?: any): Promise<void>;
    showToolbar(options?: {
        action?: any;
    }): Promise<void>;
    hideToolbar(): Promise<void>;
    toggleToolbar(): Promise<void>;
    removeToolbar(): Promise<void>;
    reloadToolbar(): Promise<void>;
    _removeComponent(component: InPageUIComponent): void;
    reloadComponent(component: InPageUIComponent, options?: any): Promise<void>;
    private _maybeEmitShouldSetUp;
    /** development -> no script injected */
    setComponentShouldSetup({ component, shouldSetUp, }: {
        component: InPageUIComponent;
        shouldSetUp: boolean;
    }): Promise<void>;
}
