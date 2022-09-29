import { on } from "events";
import React, { ComponentType, ReactNode, useRef, useState } from "react";
import ButtonTooltip, { TooltipPosition } from "../button-tooltip";
import { IconProps } from "./types";
import useWithViewbox from "./use-with-viewbox";

type ButtonProps = {
  children?: ReactNode;
  Icon: ComponentType<IconProps>;
  height?: string;
  width?: string;
  tooltip: { tooltipText: string; position: TooltipPosition };
  className?: string;
  onClick: () => void;
};

export const ButtonWithIconComponent = ({
  children,
  Icon,
  height = "20px",
  width = "18px",
  tooltip,
  className,
  onClick,
}: ButtonProps) => {
  const { tooltipText, position } = tooltip;

  return (
    <ButtonTooltip tooltipText={tooltipText} position={position}>
      <div onClick={onClick}>
        <Icon
          fontSize="small"
          height={height}
          width={width}
          className={className}
        />
      </div>
    </ButtonTooltip>
  );
};
