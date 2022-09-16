import React from "react";
import {
  ButtonTooltip,
  TooltipPosition,
} from "~/browser-shell/frontends/common";

import IconClose from "~icons/my-yet-other-icons/close.svg";

interface IProps {
  tooltipText: string;
  position?: TooltipPosition;
  handleRemoveRibbon: () => void;
}

export const CloseToolbar: React.FC<IProps> = ({
  tooltipText,
  position = "leftNarrow",
  handleRemoveRibbon,
}) => {
  return (
    <ButtonTooltip tooltipText={tooltipText} position={position}>
      <div onClick={() => handleRemoveRibbon()}>
        <IconClose className="button" />
      </div>
    </ButtonTooltip>
  );
};
