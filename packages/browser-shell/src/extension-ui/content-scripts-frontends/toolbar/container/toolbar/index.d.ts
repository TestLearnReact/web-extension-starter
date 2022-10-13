import React from "react";
import { ToolbarContainerDependencies } from "../../main";
interface IToolbarContainer {
    dependencies: ToolbarContainerDependencies;
    toolbarRef: React.RefObject<HTMLDivElement>;
}
declare const ToolbarContainer: React.FC<IToolbarContainer>;
export default ToolbarContainer;
