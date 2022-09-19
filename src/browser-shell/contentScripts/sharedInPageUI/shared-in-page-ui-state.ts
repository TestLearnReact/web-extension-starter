/* eslint-disable */
import {
  ms_sendComponentInit,
  ms_sendInPageUiState,
} from "~/browser-shell/utils";
import { InPageUIComponentShowState, InPageUIComponent } from "./types";

export const isCsDevHtmlFirefox = (url: string) =>
  url.includes("moz-extension://") && url.includes("/dist/csdev/index.html");

export interface SharedInPageUIDependencies {
  loadComponent: (component: InPageUIComponent) => void;
  unloadComponent: (component: InPageUIComponent) => void;
}

export class SharedInPageUIState {
  componentsShown: InPageUIComponentShowState = {
    toolbar: false,
    sidebar: false,
  };

  componentsSetUp: InPageUIComponentShowState = {
    toolbar: false,
    sidebar: false,
  };

  constructor(private options: SharedInPageUIDependencies) {
    // ms_reloadRibbonStream.subscribe(async ([{}]) => {
    //   console.log("R-R-R-EEELO");
    //   await this.reloadRibbon();
    // });
  }

  async showSidebar(options?: any) {
    // SidebarActionOptions
    if (this.componentsShown.sidebar) return;

    this.componentsShown.sidebar = true;
    this.componentsShown.toolbar = true; // ?
    await ms_sendInPageUiState({
      ...this.componentsShown,
      toolbar: true,
      sidebar: true,
    });
  }

  async hideSidebar() {
    if (!this.componentsShown.sidebar) return;

    this.componentsShown.sidebar = false;

    await ms_sendInPageUiState({
      ...this.componentsShown,
      sidebar: false,
    });
  }

  async toggleSidebar() {
    if (this.componentsShown.sidebar) {
      await this.hideSidebar();
    } else {
      await this.showSidebar({ action: "comment" });
    }
  }

  async loadComponent(
    component: InPageUIComponent,
    options: any = {} //ShouldSetUpOptions
  ) {
    await this.options.loadComponent(component);
    this._maybeEmitShouldSetUp(component, options);
  }

  async showRibbon(options?: { action?: any }) {
    //InPageUIRibbonAction

    if (this.componentsShown.toolbar) return;

    this.componentsShown.toolbar = true;
    await ms_sendInPageUiState({
      ...this.componentsShown,
      toolbar: true,
    });
  }

  async hideRibbon() {
    if (!this.componentsShown.toolbar) return;

    this.componentsShown.toolbar = false;
    this.componentsShown.sidebar = false;
    await ms_sendInPageUiState({
      ...this.componentsShown,
      toolbar: false,
      sidebar: false,
    });
  }

  async toggleRibbon() {
    if (this.componentsShown.toolbar) {
      await this.hideRibbon();
    } else {
      await this.showRibbon();
    }
  }

  async removeRibbon() {
    if (this.componentsSetUp.sidebar) {
      await this._removeComponent("sidebar");
    }
    await this._removeComponent("toolbar");
  }

  async reloadRibbon() {
    // if (!this.componentsSetUp.ribbon) return; //
    await this.reloadComponent("toolbar");
    await this.reloadComponent("sidebar");
  }

  _removeComponent(component: InPageUIComponent) {
    this.options.unloadComponent(component);
    this.componentsShown[component] = false;
    this.componentsSetUp[component] = false;
    //ms_sendComponentDestroy(component); // todo change state?
  }

  async reloadComponent(
    component: InPageUIComponent,
    options: any = {} //ShouldSetUpOptions
  ) {
    // console.log("//* reloadComponent()", component);
    await this.options.loadComponent(component);
    ms_sendComponentInit({ component: component }); //await //todo
  }

  private async _maybeEmitShouldSetUp(
    component: InPageUIComponent,
    options: any = {} //ShouldSetUpOptions
  ) {
    if (this.componentsSetUp[component]) return;
    await ms_sendComponentInit({ component: component });
    this.componentsSetUp[component] = true;
  }
}
