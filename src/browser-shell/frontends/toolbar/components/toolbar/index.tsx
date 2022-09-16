import React, { useRef } from "react";
import cx from "classnames";

// import {
//   CloseToolbar,
//   CreateBookmark,
//   Search,
//   ToggleSidebar,
// } from "../ribbon-components";

import "./styles.scss";
import { CloseToolbar } from "../toolbar-components/closeToolbar";
import { ToggleSidebar } from "../toolbar-components/toggleSidebar";
import { ToolbarContainerDependencies } from "../../main";
import { InPageUIComponentShowState } from "~/browser-shell/utils";

export interface RibbonSubcomponentProps {
  sidebar: RibbonSidebarProps;
}
export interface RibbonSidebarProps {
  isSidebarOpen: boolean; // todo doppelt sharedsate...
  openSidebar: () => void;
  closeSidebar: () => void;
}

// interface RibbonSubcomponentProps {
//   sidebar: any;
// }

interface IRibbonProps extends RibbonSubcomponentProps {
  dependencies: ToolbarContainerDependencies;
  toolbarRef: React.RefObject<HTMLDivElement>;
  handleRemoveRibbon: () => void;
  sharedInPageUiState: InPageUIComponentShowState;
}

const Toolbar: React.FC<IRibbonProps> = (props) => {
  const {
    dependencies,
    toolbarRef,
    handleRemoveRibbon,
    sharedInPageUiState,
    sidebar,
  } = props;

  const getTooltipText = (name: string): string => {
    return name;
  };

  return (
    <div
      className={cx("ribbon", {
        ribbonExpanded: sharedInPageUiState.toolbar,
        ribbonSidebarOpen: sharedInPageUiState.sidebar,
      })}
    >
      <div
        ref={toolbarRef}
        className={cx("innerRibbon", {
          innerRibbonExpanded: true || sharedInPageUiState.toolbar,
          innerRibbonSidebarOpen: false || sharedInPageUiState.sidebar,
        })}
      >
        {(sharedInPageUiState.toolbar || sidebar.isSidebarOpen || true) && (
          <>
            <div className="generalActions">
              {(!sidebar.isSidebarOpen || true) && (
                <>
                  <CloseToolbar
                    tooltipText={"Close Toolbar for session"}
                    handleRemoveRibbon={handleRemoveRibbon}
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

// import React from "react";

// import * as S from "./styles";

// export const Toolbar: React.FC<{}> = () => {
//   return (
//     <S.Container>
//       <div className="crx-root">Toolbar !!!</div>
//     </S.Container>
//   );
// };
