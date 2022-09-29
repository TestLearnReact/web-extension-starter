import React, { useState } from "react";
import cx from "classnames";
import {
  ButtonTooltip,
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

// export const ToggleSidebarTestCssSvg: React.FC<IProps> = ({
//   tooltipText,
//   position = "leftNarrow",
//   sidebar,
// }) => {
//   const [isOpen, setIsOpen] = useState<boolean>(sidebar.isSidebarOpen);

//   const toggleSidebar = () => {
//     sidebar.toggleSidebar();
//     setIsOpen(!isOpen);
//   };

//   return (
//     <ButtonTooltip tooltipText={tooltipText} position={position}>
//       <div onClick={() => toggleSidebar()}>
//         <div
//           className={cx("button", {
//             arrow2: !isOpen,
//             arrowReverse2: isOpen,
//           })}
//         />
//       </div>
//     </ButtonTooltip>
//   );
// };
