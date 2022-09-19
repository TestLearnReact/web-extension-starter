import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { ToolbarContainerDependencies } from "../../main";
import { useEventListener } from "~/browser-shell/frontends/common";
import {
  InPageUIComponentShowState,
  ms_inPageUiStateStream,
} from "~/browser-shell/utils";

import ToolbarContainer from "../toolbar";

import "./styles.css";

const RIBBON_HIDE_TIMEOUT = 2000;

interface IRibbonHolderProps {
  dependencies: ToolbarContainerDependencies;
}

const ToolbarHolderContainer: React.FC<IRibbonHolderProps> = ({
  dependencies,
}) => {
  const holderRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { inPageUI } = dependencies;

  let mouseInRibbon = false;
  let mouseInHolder = false;
  let isAnyPopupOpen = false;

  //let isAnyPopupOpen = useRef(false);

  console.log("render ??", isAnyPopupOpen);

  // const [sharedInPageUiState, setSharedInPageUiState] =
  //   useState<InPageUIComponentShowState>(inPageUI.componentsShown);

  // useEffect(() => {
  //   console.log("render ?? useEffect", isAnyPopupOpen);
  //   ms_inPageUiStateStream.subscribe(([{ toolbar, sidebar }, sender]) => {
  //     isAnyPopupOpen = sidebar;
  //     //isAnyPopupOpen.current = sidebar;
  //     setSharedInPageUiState({ toolbar, sidebar });
  //   });
  // }, []);

  useEffect(() => {
    console.log("render ?? useEffect", isAnyPopupOpen);
    ms_inPageUiStateStream.subscribe(([{ toolbar, sidebar }, sender]) => {
      isAnyPopupOpen = sidebar;
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
    console.log("handleMouseEnter HolderRef");
    mouseInHolder = true;
    inPageUI.showRibbon();
  };

  const handleMouseEnterRibbonRef = (event: Event) => {
    console.log("handleMouseEnter RibbonRef");
    mouseInRibbon = true;
    inPageUI.showRibbon();
  };

  const handleMouseLeaveRibbonRef = (event: Event) => {
    console.log("handleMouseLeaveRibbonRef");
    mouseInRibbon = false;
  };

  const hideRibbon = () => {
    const shouldHide = !mouseInHolder && !mouseInRibbon && !isAnyPopupOpen; // !isAnyPopupOpen.current; //
    shouldHide && inPageUI.hideRibbon();
  };

  const hideRibbonWithTimeout = (event: Event) => {
    mouseInHolder = false;
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(hideRibbon, RIBBON_HIDE_TIMEOUT);
  };

  useEventListener("mouseenter", handleMouseEnterHolderRef, holderRef);
  useEventListener("mouseleave", hideRibbonWithTimeout, holderRef);

  useEventListener("mouseenter", handleMouseEnterRibbonRef, toolbarRef);
  useEventListener("mouseleave", handleMouseLeaveRibbonRef, toolbarRef);

  return (
    <div
      ref={holderRef}
      className={cx("holder", {
        withSidebar: inPageUI.componentsShown.sidebar, // sharedInPageUiState.sidebar,
      })}
    >
      <ToolbarContainer
        dependencies={dependencies}
        toolbarRef={toolbarRef}
        // sharedInPageUiState={sharedInPageUiState}
      />
    </div>
  );
};

export default ToolbarHolderContainer;
