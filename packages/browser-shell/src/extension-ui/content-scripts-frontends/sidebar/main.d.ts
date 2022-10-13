import { InPageUIRootMount } from "@ui/common";
import { SharedInPageUIState } from "@ui/common/sharedInPageUI";
export interface SidebarContainerDependencies {
    inPageUI: SharedInPageUIState;
}
export declare function setupFrontendSidebar(mount: InPageUIRootMount, dependencies: SidebarContainerDependencies): void;
export declare function destroyFrontendSidebar(target: HTMLElement, shadowRoot: ShadowRoot | null): void;
