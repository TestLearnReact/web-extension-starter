import React, { useEffect, useState } from "react";
import { ToolbarContainerDependencies } from "../../main";
import { ms_inPageUiStateStream } from "@utils/messages";

import { useThemeContext } from "@ui/common/context";
import { darkTheme, lightTheme, ThemeProvider } from "@ui/common/styles";

import Toolbar from "../../components/toolbar";
import { InPageUIComponentShowState } from "@ui/common";

interface IToolbarContainer {
  dependencies: ToolbarContainerDependencies;
  toolbarRef: React.RefObject<HTMLDivElement>;
}

const ToolbarContainer: React.FC<IToolbarContainer> = ({
  dependencies,
  toolbarRef,
}) => {
  console.log(".r.e.n.d.e.r ToolbarContainer");

  const { inPageUI } = dependencies;

  const { themeType, theme } = useThemeContext();

  const [sharedInPageUiState, setSharedInPageUiState] =
    useState<InPageUIComponentShowState>(inPageUI.componentsShown);

  useEffect(() => {
    ms_inPageUiStateStream.subscribe(([{ toolbar, sidebar }, sender]) => {
      setSharedInPageUiState({ toolbar, sidebar });
    });
  }, []);

  const handleSidebarOpen = () => {
    inPageUI.showSidebar();
  };

  //  if (!sharedInPageUiState.toolbar) return null;
  return (
    <>
      {/* Theme styled-component */}
      <ThemeProvider theme={themeType === "light" ? lightTheme : darkTheme}>
        {/* Theme scss + css variables in style={} */}
        <div
          className={"theme-" + (themeType === "dark" ? "dark" : "light")}
          style={
            {
              ...theme,
            } as React.CSSProperties
          }
        >
          <Toolbar
            dependencies={dependencies} // no need container/component structure
            toolbarRef={toolbarRef}
            sharedInPageUiState={sharedInPageUiState}
            handleRemoveToolbar={() => inPageUI.removeToolbar()}
            sidebar={{
              isSidebarOpen: sharedInPageUiState.sidebar,
              openSidebar: () => handleSidebarOpen(),
              closeSidebar: () => inPageUI.hideSidebar(),
              toggleSidebar: () => inPageUI.toggleSidebar(),
            }}
          />
        </div>
      </ThemeProvider>
    </>
  );
};

export default ToolbarContainer;
