export type InPageUIComponent = 'toolbar' | 'sidebar';
export type InPageUIComponentShowState = {
  [Component in InPageUIComponent]: boolean;
};

export interface SharedInPageUIInterface {
  componentsShown: InPageUIComponentShowState;

  // Toolbar
  showToolbar(): Promise<void>;
  hideToolbar(): Promise<void>;
  removeToolbar(): Promise<void>;
  toggleToolbar(): Promise<void>;

  // Sidebar
  showSidebar(): Promise<void>;
  hideSidebar(): Promise<void>;
  toggleSidebar(): Promise<void>;

  toggleTheme(): Promise<void>;
}

export type ContentScriptComponent = 'toolbar' | 'sidebar';
