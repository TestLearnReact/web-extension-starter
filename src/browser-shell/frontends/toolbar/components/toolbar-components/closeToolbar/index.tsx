import * as React from "react";
import {
  SvgTooltipComponent,
  TooltipPosition,
} from "@browser-shell/frontends/common";

import IconClose from "~icons/public-assets-icons/close.svg";
//import IconAccessibility from "~icons/carbon/accessibility";

interface IProps {
  tooltipText: string;
  position?: TooltipPosition;
  handleRemoveToolbar: () => void;
}

export const CloseToolbar: React.FC<IProps> = ({
  tooltipText,
  position = "leftNarrow",
  handleRemoveToolbar,
}) => {
  return (
    <>
      <SvgTooltipComponent
        iconProps={{
          icon: IconClose,
          //fill: "#c41010",
        }}
        tooltipProps={{ tooltipText: tooltipText, position: position }}
        onClick={() => handleRemoveToolbar()}
      />
      {/* <SvgTooltipComponent
        iconProps={{
          icon: IconAccessibility,
          //fill: "#c41010",
        }}
        tooltipProps={{ tooltipText: tooltipText, position: position }}
        onClick={() => handleRemoveToolbar()}
      /> */}
    </>
  );
};
