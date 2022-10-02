import React, { useState } from "react";

import {
  SvgTooltipElement,
  TooltipPosition,
} from "@browser-shell/frontends/common";

import IconOpenSidebar from "~icons/public-assets-icons/openSidebar.svg";

import { ToolbarSidebarProps } from "../../toolbar";

interface IProps {
  tooltipText: string;
  position?: TooltipPosition;
  sidebar: ToolbarSidebarProps;
}

export const ToggleSidebar: React.FC<IProps> = ({
  tooltipText,
  position = "leftNarrow",
  sidebar,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(sidebar.isSidebarOpen);

  const toggleSidebar = () => {
    sidebar.toggleSidebar();
    setIsOpen(!isOpen);
  };

  return (
    <SvgTooltipElement
      iconProps={{
        icon: <IconOpenSidebar />,
      }}
      tooltipProps={{ tooltipText: tooltipText, position: position }}
      onClick={() => toggleSidebar()}
    />
  );
};
