import React from "react";
import { ToolbarSidebarProps } from "../../toolbar";
export interface IToolbarActionsProps {
    sidebar: ToolbarSidebarProps;
    handleRemoveToolbar: () => void;
    toggleSidebar: () => void;
    toggleTheme: () => void;
}
declare const ToolbarActions: React.FC<IToolbarActionsProps>;
export default ToolbarActions;
