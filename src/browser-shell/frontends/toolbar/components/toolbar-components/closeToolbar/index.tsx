import React from "react";
import {
  ButtonTooltip,
  TooltipPosition,
} from "~/browser-shell/frontends/common";

import IconClose from "~icons/my-yet-other-icons/close.svg";

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
    <ButtonTooltip tooltipText={tooltipText} position={position}>
      <div onClick={() => handleRemoveToolbar()}>
        <IconClose className="button" />
      </div>
    </ButtonTooltip>
  );
};
