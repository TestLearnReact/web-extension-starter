import React from "react";
import * as ReactDOM from "react-dom";
import { InPageUIRootMount } from "../common";
import { StyleSheetManager, ThemeProvider } from "styled-components";

import { Sidebar } from "./Sidebar";

//export const Test = () => <div>Test HMR</div>;

export interface SidebarContainerDependencies {
  inPageUI: any;
}

export function setupFrontendSidebar(
  mount: InPageUIRootMount,
  dependencies: any
): void {
  ReactDOM.render(
    <React.StrictMode>
      <StyleSheetManager target={mount.shadowRoot as any}>
        <ThemeProvider theme={{}}>
          <Sidebar />
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
