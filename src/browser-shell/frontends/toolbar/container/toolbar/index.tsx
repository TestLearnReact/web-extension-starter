import React, { useEffect, useRef, useState } from "react";

import { ToolbarContainerDependencies } from "../../main";

//import "./styles.css";

import Toolbar from "../../components/toolbar";
import {
  InPageUIComponentShowState,
  ms_inPageUiStateStream,
} from "~/browser-shell/utils";

interface IToolbarContainer {
  dependencies: ToolbarContainerDependencies;
  toolbarRef: React.RefObject<HTMLDivElement>;
  //sharedInPageUiState: InPageUIComponentShowState;
}

const ToolbarContainer: React.FC<IToolbarContainer> = ({
  dependencies,
  toolbarRef,
  //sharedInPageUiState,
}) => {
  const { inPageUI } = dependencies;

  console.log(".r.e.n.d.e.r ToolbarContainer");

  const [sharedInPageUiState, setSharedInPageUiState] =
    useState<InPageUIComponentShowState>(inPageUI.componentsShown);

  useEffect(() => {
    ms_inPageUiStateStream.subscribe(([{ toolbar, sidebar }, sender]) => {
      //isAnyPopupOpen = sidebar;
      //isAnyPopupOpen.current = sidebar;
      setSharedInPageUiState({ toolbar, sidebar });
    });
  }, []);

  // todo container ribbon anlegen?
  const handleSidebarOpen = () => {
    // if (this.state.commentBox.showCommentBox) {
    //     this.processEvent('cancelComment', null)
    // }
    inPageUI.showSidebar();
  };

  return (
    <Toolbar
      dependencies={dependencies}
      toolbarRef={toolbarRef}
      sharedInPageUiState={sharedInPageUiState}
      handleRemoveRibbon={() => inPageUI.removeRibbon()}
      sidebar={{
        isSidebarOpen: sharedInPageUiState.sidebar,
        openSidebar: () => handleSidebarOpen(),
        closeSidebar: () => inPageUI.hideSidebar(),
        toggleSidebar: () => inPageUI.toggleSidebar(),
      }}
    />
  );
};

export default ToolbarContainer;
