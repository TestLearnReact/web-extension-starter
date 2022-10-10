import React from "react";
import cx from "classnames";
import {
  SvgTooltipComponent,
  SvgTooltipElement,
} from "@browser-shell/frontends/common";

import IconClose from "~icons/public-assets-icons/close.svg";
import IconOpenSidebar from "~icons/public-assets-icons/openSidebar.svg";
import IconAsleep from "~icons/public-assets-icons/asleep.svg";
import IconAsleepFilled from "~icons/public-assets-icons/asleepFilled.svg";
// import IconAsleep from "~icons/carbon/asleep";
// import IconAsleepFilled from "~icons/carbon/asleep-filled";
import { useTheme } from "@browser-shell/frontends/common/context";

import { ToolbarSidebarProps } from "../../toolbar";

export interface IToolbarActionsProps {
  sidebar: ToolbarSidebarProps;
  handleRemoveToolbar: () => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
}

const ToolbarActions: React.FC<IToolbarActionsProps> = ({
  sidebar,
  handleRemoveToolbar,
  toggleSidebar,
  toggleTheme,
}) => {
  const { themeType } = useTheme();

  const getTooltipText = (name: string): string => {
    return name;
  };

  return (
    <div className="generalActions">
      <SvgTooltipComponent
        iconProps={{
          icon: IconClose,
        }}
        tooltipProps={{
          tooltipText: getTooltipText("Close Toolbar for session"),
          position: "leftNarrow",
        }}
        onClick={() => handleRemoveToolbar()}
      />
      {/* <SvgTooltipElement
        iconProps={{
          icon: (
            <IconOpenSidebar
              className={cx({
                arrow: !sidebar.isSidebarOpen,
                arrowReverse: sidebar.isSidebarOpen,
              })}
            />
          ),
        }}
        tooltipProps={{
          tooltipText: getTooltipText("Toggle sidebar"),
          position: "leftNarrow",
        }}
        onClick={() => toggleSidebar()}
      /> */}
      {/* <div
        className={cx({
          arrow: !sidebar.isSidebarOpen,
          arrowReverse: sidebar.isSidebarOpen,
        })}
      > */}
      <SvgTooltipComponent
        iconProps={{
          icon: IconOpenSidebar,
          className: cx({
            arrow: !sidebar.isSidebarOpen,
            arrowReverse: sidebar.isSidebarOpen,
          }),
        }}
        tooltipProps={{
          tooltipText: getTooltipText("Toggle sidebar"),
          position: "leftNarrow",
        }}
        onClick={() => toggleSidebar()}
      />
      {/* </div> */}
      <SvgTooltipComponent
        iconProps={{
          icon: themeType === "dark" ? IconAsleep : IconAsleepFilled,
          className: "ignore-react-onclickoutside",
        }}
        tooltipProps={{
          tooltipText: getTooltipText("Toggle theme"),
          position: "leftNarrow",
        }}
        onClick={() => toggleTheme()}
      />
    </div>
  );
};

export default ToolbarActions;
