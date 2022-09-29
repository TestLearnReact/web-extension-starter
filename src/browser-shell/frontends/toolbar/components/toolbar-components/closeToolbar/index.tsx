import * as React from "react";
import type { SVGProps } from "react";
import {
  ButtFunc,
  ButtonTooltip,
  ButtonWithIconComponent,
  ButtonWithIconElement,
  ButtonWithIconRenderFunc,
  Example,
  ExampleFCProps,
  TooltipPosition,
} from "@browser-shell/frontends/common";
//import SvgIcon from "@browser-shell/frontends/common/shared-components/svg-icon";

import IconClose from "~icons/public-assets-icons/close.svg";

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
      {/* <ButtonTooltip tooltipText={tooltipText} position={position}>
        <div onClick={() => handleRemoveToolbar()}>
          <IconClose className="button" />
        </div>
      </ButtonTooltip> */}

      <ButtonWithIconComponent
        className="button"
        Icon={IconClose}
        tooltip={{ tooltipText: "Comp", position: position }}
        onClick={() => handleRemoveToolbar()}
      />

      <ButtonWithIconElement
        icon={<IconClose />}
        tooltip={{ tooltipText: "Elem", position: position }}
      />
    </>
  );
};
