import React from 'react';
import * as ReactDOM from 'react-dom';
import { StyleSheetManager } from 'styled-components';
import ToolbarHolderContainer from './container/toolbar-holder';
import { SharedInPageUIState } from '@ui/common/sharedInPageUI';
import { InPageUIRootMount, ThemeProviderContext } from '@ui/common';

export interface ToolbarContainerDependencies {
  inPageUI: SharedInPageUIState;
}

export function setupFrontendToolbar(
  mount: InPageUIRootMount,
  dependencies: ToolbarContainerDependencies,
): void {
  ReactDOM.render(
    <React.StrictMode>
      <StyleSheetManager target={mount.shadowRoot as any}>
        <ThemeProviderContext>
          <ToolbarHolderContainer dependencies={dependencies} />
        </ThemeProviderContext>
      </StyleSheetManager>
    </React.StrictMode>,
    mount.rootElement,
  );
}

export function destroyFrontendToolbar(
  target: HTMLElement,
  shadowRoot: ShadowRoot | null,
): void {
  ReactDOM.unmountComponentAtNode(target); // todo

  if (shadowRoot) {
    shadowRoot.removeChild(target);
  } else {
    document.body.removeChild(target);
  }
}
