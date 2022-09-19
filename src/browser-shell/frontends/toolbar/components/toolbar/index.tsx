import React, { useRef } from "react";
import cx from "classnames";

import "./styles.scss";
import { CloseToolbar } from "../toolbar-components/closeToolbar";
import { ToggleSidebar } from "../toolbar-components/toggleSidebar";
import { ToolbarContainerDependencies } from "../../main";
import { InPageUIComponentShowState } from "~/browser-shell/utils";

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
  dependencies: ToolbarContainerDependencies; // no need container/component structure
  toolbarRef: React.RefObject<HTMLDivElement>;
  handleRemoveToolbar: () => void;
  sharedInPageUiState: InPageUIComponentShowState;
}

const Toolbar: React.FC<IToolbarProps> = (props) => {
  const {
    dependencies, // no need container/component structure
    toolbarRef,
    handleRemoveToolbar,
    sharedInPageUiState,
    sidebar,
  } = props;

  const getTooltipText = (name: string): string => {
    return name;
  };

  return (
    <div
      className={cx("toolbar", {
        toolbarExpanded: sharedInPageUiState.toolbar,
        toolbarSidebarOpen: sharedInPageUiState.sidebar,
      })}
    >
      <div
        ref={toolbarRef}
        className={cx("innerToolbar", {
          innerToolbarExpanded: sharedInPageUiState.toolbar,
          innerToolbarSidebarOpen: sharedInPageUiState.sidebar,
        })}
      >
        {(sharedInPageUiState.toolbar || sidebar.isSidebarOpen) && (
          <>
            <div className="generalActions">
              {(!sidebar.isSidebarOpen || true) && (
                <>
                  <CloseToolbar
                    tooltipText={"Close Toolbar for session"}
                    handleRemoveToolbar={handleRemoveToolbar}
                  />
                  <ToggleSidebar
                    tooltipText={getTooltipText("toggleSidebar")}
                    sidebar={sidebar}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
