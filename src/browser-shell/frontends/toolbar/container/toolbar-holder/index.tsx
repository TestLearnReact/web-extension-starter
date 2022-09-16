import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { ToolbarContainerDependencies } from "../../main";
// import {
//   InPageUIComponentShowState,
//   useEventListener,
// } from "@project/frontends-common";

// import RibbonContainer from "../ribbon";

import "./styles.css";
import { useEventListener } from "~/browser-shell/frontends/common";
import {
  InPageUIComponentShowState,
  ms_inPageUiStateStream,
} from "~/browser-shell/utils";
import Toolbar from "../../components/toolbar";
import { CloseToolbar } from "../../components/toolbar-components/closeToolbar";

//import { ms_inPageUiStateStream } from "@project/shared-utils";

const RIBBON_HIDE_TIMEOUT = 2000;

interface IRibbonHolderProps {
  dependencies: ToolbarContainerDependencies;
}

const ToolbarHolder: React.FC<IRibbonHolderProps> = ({ dependencies }) => {
  const holderRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { inPageUI } = dependencies;

  let mouseInRibbon = false;
  let mouseInHolder = false;
  let isAnyPopupOpen = false;

  const [sharedInPageUiState, setSharedInPageUiState] =
    useState<InPageUIComponentShowState>(inPageUI.componentsShown);

  useEffect(() => {
    ms_inPageUiStateStream.subscribe(([{ toolbar, sidebar }, sender]) => {
      isAnyPopupOpen = sidebar;
      setSharedInPageUiState({ toolbar, sidebar });
    });
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef && timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleMouseEnterHolderRef = (event: Event) => {
    //console.log("handleMouseEnter HolderRef");
    mouseInHolder = true;
    inPageUI.showRibbon();
  };

  const handleMouseEnterRibbonRef = (event: Event) => {
    //console.log("handleMouseEnter RibbonRef");
    mouseInRibbon = true;
    inPageUI.showRibbon();
  };

  const handleMouseLeaveRibbonRef = (event: Event) => {
    //console.log("handleMouseLeaveRibbonRef");
    mouseInRibbon = false;
  };

  const hideRibbon = () => {
    //console.log("hideRibbon");
    const shouldHide = !mouseInHolder && !mouseInRibbon && !isAnyPopupOpen;
    shouldHide && inPageUI.hideRibbon();
  };

  const hideRibbonWithTimeout = (event: Event) => {
    mouseInHolder = false;
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(hideRibbon, RIBBON_HIDE_TIMEOUT);
  };

  useEventListener("mouseenter", handleMouseEnterHolderRef, holderRef);
  useEventListener("mouseleave", hideRibbonWithTimeout, holderRef);

  useEventListener("mouseenter", handleMouseEnterRibbonRef, ribbonRef);
  useEventListener("mouseleave", handleMouseLeaveRibbonRef, ribbonRef);

  // todo container ribbon anlegen?
  const handleSidebarOpen = () => {
    // if (this.state.commentBox.showCommentBox) {
    //     this.processEvent('cancelComment', null)
    // }
    inPageUI.showSidebar();
  };

  return (
    <div
      ref={holderRef}
      className={cx("holder", {
        withSidebar: false, // sidebarIsVisible, sharedInPageUiState.sidebar
      })}
    >
      <Toolbar
        dependencies={dependencies}
        toolbarRef={holderRef}
        sharedInPageUiState={sharedInPageUiState}
        handleRemoveRibbon={() => console.log("handleRemoveRibbon")}
        sidebar={{
          isSidebarOpen: sharedInPageUiState.sidebar, // todo
          openSidebar: () => handleSidebarOpen(),
          closeSidebar: () => inPageUI.hideSidebar(),
        }}
      />
    </div>
  );
};

export default ToolbarHolder;
