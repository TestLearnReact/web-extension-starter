import React, { ReactElement, ReactNode, useState } from "react";
import ButtonTooltip, { TooltipPosition } from "../button-tooltip";
import { IconProps } from "./types";

import "./style-element.scss";

type ButtonProps = {
  children?: ReactNode;
  icon: ReactElement<IconProps>;
  tooltip: { tooltipText: string; position: TooltipPosition };
  height?: IconProps["height"];
  width?: IconProps["width"];
  className?: string;
};

export const ButtonWithIconElement = ({
  children,
  icon,
  tooltip,
  height = "20px",
  width = "18px",
  className,
}: ButtonProps) => {
  const { tooltipText, position } = tooltip;

  const clonedIcon = React.cloneElement(icon, {
    fontSize: icon.props.fontSize || "small",
    height,
    width,
    className: "buttonElemenet",
  });

  return (
    <ButtonTooltip tooltipText={tooltipText} position={position}>
      {clonedIcon}
    </ButtonTooltip>
  );
};
