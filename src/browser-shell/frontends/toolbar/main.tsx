import React from "react";
import * as ReactDOM from "react-dom";
import { InPageUIRootMount } from "../common";
import { StyleSheetManager, ThemeProvider } from "styled-components";

import { Toolbar } from "./Toolbar";

export const Test = () => <div>Test HMR</div>;

export interface ToolbarContainerDependencies {
  inPageUI: any;
}

export function setupFrontendToolbar(
  mount: InPageUIRootMount,
  dependencies: ToolbarContainerDependencies
): void {
  ReactDOM.render(
    <React.StrictMode>
      <StyleSheetManager target={mount.shadowRoot as any}>
        <ThemeProvider theme={{}}>
          <Toolbar />
        </ThemeProvider>
      </StyleSheetManager>
    </React.StrictMode>,
    mount.rootElement
  );
}

export function destroyFrontendToolbar(
  target: HTMLElement,
  shadowRoot: ShadowRoot | null
): void {
  ReactDOM.unmountComponentAtNode(target); // todo

  if (shadowRoot) {
    shadowRoot.removeChild(target);
  } else {
    document.body.removeChild(target);
  }
}
