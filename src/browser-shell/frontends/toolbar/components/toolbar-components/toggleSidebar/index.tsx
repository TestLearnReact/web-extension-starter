import React, { useState } from "react";
import cx from "classnames";
import {
  ButtonTooltip,
  TooltipPosition,
} from "~/browser-shell/frontends/common";

import IconOpenSidebar from "~icons/my-yet-other-icons/openSidebar";
import { RibbonSidebarProps } from "../../toolbar";

interface IProps {
  tooltipText: string;
  position?: TooltipPosition;
  sidebar: RibbonSidebarProps;
}

export const ToggleSidebar: React.FC<IProps> = ({
  tooltipText,
  position = "leftNarrow",
  sidebar,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(sidebar.isSidebarOpen);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ButtonTooltip tooltipText={tooltipText} position={position}>
      <div onClick={() => toggleSidebar()}>
        <IconOpenSidebar
          className={cx("button", {
            arrow: !isOpen,
            arrowReverse: isOpen,
          })}
        />
      </div>
    </ButtonTooltip>
  );
};
