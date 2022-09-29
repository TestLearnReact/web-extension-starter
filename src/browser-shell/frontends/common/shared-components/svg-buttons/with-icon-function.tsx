import React, { ReactNode, ReactElement, useState } from "react";
import ButtonTooltip, { TooltipPosition } from "../button-tooltip";
import { IconProps } from "./types";

export interface ExampleFCProps {
  height: string;
  width: string;
}

export const Example = ({
  tooltip,
  SomeSvgComponent,
}: {
  tooltip: { tooltipText: string; position: TooltipPosition };
  SomeSvgComponent: React.FC<ExampleFCProps>;
}) => {
  const { tooltipText, position } = tooltip;

  const icon = SomeSvgComponent({ height: "20px", width: "20px" });

  return (
    <ButtonTooltip tooltipText={tooltipText} position={position}>
      {icon}
    </ButtonTooltip>
  );
};

/**
 *
 *
 */

type RenderIcon = {
  renderIcon: (settings: {
    fontSize: IconProps["fontSize"];
    color: IconProps["color"];
    height: string | number;
    width: string | number;
  }) => any; // ReactElement<IconProps>;
};

interface IProps {
  renderIcon: RenderIcon["renderIcon"];
  tooltip: { tooltipText: string; position: TooltipPosition };
  height?: IconProps["height"];
  width?: IconProps["width"];
}

export const ButtFunc: React.FC<IProps> = ({
  renderIcon,
  tooltip,
  height = "28px",
  width = "28px",
}) => {
  const { tooltipText, position } = tooltip;

  const icon = renderIcon({
    fontSize: "small",
    color: "#66593d",
    height: height,
    width: width,
  });

  return (
    <ButtonTooltip tooltipText={tooltipText} position={position}>
      {icon}
    </ButtonTooltip>
  );
};

/**
 *
 *
 *
 *
 */
type ButtonProps = {
  children?: ReactNode;
  renderIcon: (settings: {
    fontSize: IconProps["fontSize"];
    color: IconProps["color"];
    isHovered: boolean;
    height?: IconProps["height"];
    width: IconProps["width"];
  }) => ReactElement<IconProps>;
  tooltip: { tooltipText: string; position: TooltipPosition };
  height?: IconProps["height"];
  width?: IconProps["width"];
};

export const ButtonWithIconRenderFunc = ({
  children,
  renderIcon,
  tooltip,
  height = "28px",
  width = "28px",
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { tooltipText, position } = tooltip;

  const icon = renderIcon({
    fontSize: "small",
    isHovered: isHovered,
    color: "#66593d",
    height: height,
    width: width,
  });

  return (
    <ButtonTooltip tooltipText={tooltipText} position={position}>
      {icon}
    </ButtonTooltip>
  );
};
