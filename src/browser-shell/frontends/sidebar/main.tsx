import React from "react";
import * as ReactDOM from "react-dom";
import { InPageUIRootMount } from "../common";
import { StyleSheetManager, ThemeProvider } from "styled-components";

import SidebarHolder from "./container/sidebar-holder";
import { SharedInPageUIState } from "@browser-shell/contentScripts/sharedInPageUI";

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
        <ThemeProvider theme={{}}>
          <SidebarHolder dependencies={dependencies} />
        </ThemeProvider>
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
