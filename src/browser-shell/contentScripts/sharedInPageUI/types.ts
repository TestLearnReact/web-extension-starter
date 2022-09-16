// export type InPageUISidebarAction =
//   | "annotate"
//   | "comment"
//   | "edit_annotation"
//   | "show_annotation"
//   | "set_sharing_access";
// export type InPageUIRibbonAction = "comment" | "tag" | "list" | "bookmark";

// export interface IncomingAnnotationData {
//   highlightText?: string;
//   commentText?: string;
//   isBookmarked?: boolean;
//   tags?: string[];
// }

// export interface SidebarActionOptions {
//   action: InPageUISidebarAction;
//   annotationUrl?: string;
//   annotationData?: IncomingAnnotationData;
// }

// export type InPageUIComponent = "ribbon" | "sidebar" | "highlights" | "tooltip";
export type InPageUIComponent = "toolbar" | "sidebar";
export type InPageUIComponentShowState = {
  [Component in InPageUIComponent]: boolean;
};

export interface SharedInPageUIInterface {
  componentsShown: InPageUIComponentShowState;

  // Ribbon
  // showRibbon(options?: { action?: InPageUIRibbonAction }): Promise<void>;
  showToolbar(): Promise<void>;
  hideToolbar(): Promise<void>;
  removeToolbar(): Promise<void>;
  toggleToolbar(): Promise<void>;
  // updateToolbar(): void;

  // Sidebar
  // showSidebar(options?: SidebarActionOptions): Promise<void>;
  showSidebar(): Promise<void>;
  hideSidebar(): Promise<void>;
  toggleSidebar(): Promise<void>;
}

export type ContentScriptComponent = "toolbar" | "sidebar";
