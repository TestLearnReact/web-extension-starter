import React, { useState } from "react";
import cx from "classnames";
import { CloseToolbar } from "../toolbar-components/closeToolbar";
import { ToggleSidebar } from "../toolbar-components/toggleSidebar";
import { ToolbarContainerDependencies } from "../../main";
import { InPageUIComponentShowState } from "@browser-shell/utils";

import "./ss.scss";

import { ToggleTheme } from "../toolbar-components/toggleTheme";
import { useTheme } from "@browser-shell/frontends/common/context";
import ToolbarActions from "../toolbar-components/toolbarActions";

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
  console.log("r.e.r.e.n.d.e.r Toolbar");

  const {
    dependencies, // no need container/component structure
    toolbarRef,
    handleRemoveToolbar,
    sharedInPageUiState,
    sidebar,
  } = props;

  const { themeType, setCurrentTheme } = useTheme();

  const toggleSidebar = () => {
    sidebar.toggleSidebar();
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
        className={cx("innerToolbar", "ignore-react-onclickoutside", {
          innerToolbarExpanded: sharedInPageUiState.toolbar,
          innerToolbarSidebarOpen: sharedInPageUiState.sidebar,
        })}
      >
        {(sharedInPageUiState.toolbar || sidebar.isSidebarOpen) && (
          <>
            <ToolbarActions
              sidebar={sidebar}
              handleRemoveToolbar={handleRemoveToolbar}
              toggleSidebar={toggleSidebar}
              toggleTheme={() =>
                setCurrentTheme(themeType === "dark" ? "light" : "dark")
              }
            />
            {/* <div className="generalActions">
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
                  <ToggleTheme tooltipText="Toggle Theme" />
                </>
              )}
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
