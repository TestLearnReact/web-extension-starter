import { SharedInPageUIState } from "@ui/common/sharedInPageUI";
import { InPageUIRootMount } from "@ui/common";
export interface ToolbarContainerDependencies {
    inPageUI: SharedInPageUIState;
}
export declare function setupFrontendToolbar(mount: InPageUIRootMount, dependencies: ToolbarContainerDependencies): void;
export declare function destroyFrontendToolbar(target: HTMLElement, shadowRoot: ShadowRoot | null): void;
