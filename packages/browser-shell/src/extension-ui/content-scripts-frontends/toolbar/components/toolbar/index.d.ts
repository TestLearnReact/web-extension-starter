import React from "react";
import { ToolbarContainerDependencies } from "../../main";
import { InPageUIComponentShowState } from "@ui/common/sharedInPageUI";
import "./styles.scss";
export interface ToolbarSubcomponentProps {
    sidebar: ToolbarSidebarProps;
}
export interface ToolbarSidebarProps {
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
}
interface IToolbarProps extends ToolbarSubcomponentProps {
    dependencies: ToolbarContainerDependencies;
    toolbarRef: React.RefObject<HTMLDivElement>;
    handleRemoveToolbar: () => void;
    sharedInPageUiState: InPageUIComponentShowState;
}
declare const Toolbar: React.FC<IToolbarProps>;
export default Toolbar;
