import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { ToolbarContainerDependencies } from "../../main";
import { useEventListener } from "@browser-shell/frontends/common";
import {
  InPageUIComponentShowState,
  ms_inPageUiStateStream,
} from "@browser-shell/utils";

import ToolbarContainer from "../toolbar";

import "./styles.css";
import { ThemeProvider } from "@browser-shell/frontends/common/context";

const TOOLBAR_HIDE_TIMEOUT = 2000;

interface IToolbarHolderProps {
  dependencies: ToolbarContainerDependencies;
}

const ToolbarHolderContainer: React.FC<IToolbarHolderProps> = ({
  dependencies,
}) => {
  console.log(".r.e.n.d.e.r ToolbarHolderContainer");

  const holderRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { inPageUI } = dependencies;

  let mouseInToolbar = false;
  let mouseInHolder = false;
  let isAnyPopupOpen = false;

  useEffect(() => {
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
    //console.log("handleMouseEnter HolderRef");
    mouseInHolder = true;
    inPageUI.showToolbar();
  };

  const handleMouseEnterToolbarRef = (event: Event) => {
    //console.log("handleMouseEnter ToolbarRef");
    mouseInToolbar = true;
    inPageUI.showToolbar();
  };

  const handleMouseLeaveToolbarRef = (event: Event) => {
    //console.log("handleMouseLeaveToolbarRef");
    mouseInToolbar = false;
  };

  const hideToolbar = () => {
    const shouldHide = !mouseInHolder && !mouseInToolbar && !isAnyPopupOpen; // !isAnyPopupOpen.current; //
    shouldHide && inPageUI.hideToolbar();
  };

  const hideToolbarWithTimeout = (event: Event) => {
    mouseInHolder = false;
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(hideToolbar, TOOLBAR_HIDE_TIMEOUT);
  };

  useEventListener("mouseenter", handleMouseEnterHolderRef, holderRef);
  useEventListener("mouseleave", hideToolbarWithTimeout, holderRef);

  useEventListener("mouseenter", handleMouseEnterToolbarRef, toolbarRef);
  useEventListener("mouseleave", handleMouseLeaveToolbarRef, toolbarRef);

  return (
    <ThemeProvider>
      <div
        ref={holderRef}
        className={cx("holder", "example", {
          withSidebar: inPageUI.componentsShown.sidebar, // sharedInPageUiState.sidebar,
        })}
        // style={
        //   {
        //     ...theme,
        //   } as React.CSSProperties
        // }
      >
        <ToolbarContainer dependencies={dependencies} toolbarRef={toolbarRef} />
      </div>
    </ThemeProvider>
  );
};

export default ToolbarHolderContainer;
