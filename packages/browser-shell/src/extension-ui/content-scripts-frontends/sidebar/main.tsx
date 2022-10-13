import React from "react";
import * as ReactDOM from "react-dom";
import { InPageUIRootMount } from "@ui/common";
import { StyleSheetManager } from "styled-components";

import { SharedInPageUIState } from "@ui/common/sharedInPageUI";
import { ThemeProviderContext } from "@ui/common/context";
import SidebarHolderContainer from "./container/sidebar-holder";

export interface SidebarContainerDependencies {
  inPageUI: SharedInPageUIState;
}

export function setupFrontendSidebar(
  mount: InPageUIRootMount,
  dependencies: SidebarContainerDependencies
): void {
  ReactDOM.render(
    <React.StrictMode>
      <StyleSheetManager target={mount.shadowRoot as any}>
        <ThemeProviderContext>
          <SidebarHolderContainer dependencies={dependencies} />
        </ThemeProviderContext>
      </StyleSheetManager>
    </React.StrictMode>,
    mount.rootElement
  );
}

export function destroyFrontendSidebar(
  target: HTMLElement,
  shadowRoot: ShadowRoot | null
): void {
  ReactDOM.unmountComponentAtNode(target);

  if (shadowRoot) {
    shadowRoot.removeChild(target);
  } else {
    document.body.removeChild(target);
  }
}
