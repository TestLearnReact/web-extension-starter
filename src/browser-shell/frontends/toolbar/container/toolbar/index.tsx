import React, { useEffect, useState } from "react";
import { ToolbarContainerDependencies } from "../../main";
import {
  InPageUIComponentShowState,
  ms_inPageUiStateStream,
} from "@browser-shell/utils";

import Toolbar from "../../components/toolbar";
import { useTheme } from "@browser-shell/frontends/common/context";

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

  const [sharedInPageUiState, setSharedInPageUiState] =
    useState<InPageUIComponentShowState>(inPageUI.componentsShown);

  const { themeType } = useTheme();

  useEffect(() => {
    ms_inPageUiStateStream.subscribe(([{ toolbar, sidebar }, sender]) => {
      setSharedInPageUiState({ toolbar, sidebar });
    });
  }, []);

  const handleSidebarOpen = () => {
    inPageUI.showSidebar();
  };

  return (
    <div
      className={
        "theme " + (themeType === "dark" ? "theme--dark" : "theme--default")
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
  );
};

export default ToolbarContainer;
