import React, { ReactNode, ReactElement, useState } from "react";
import ButtonTooltip, { TooltipPosition } from "../../button-tooltip";

import type { SVGProps } from "react";

export type IconProps = {
  fontSize?: SVGProps<SVGSVGElement>["fontSize"];
  color?: SVGProps<SVGSVGElement>["color"];
  height?: SVGProps<SVGSVGElement>["height"];
  width?: SVGProps<SVGSVGElement>["width"];
  className?: string;
  // isHovered: boolean;
};

type ButtonProps = {
  //children?: ReactNode;
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

export const ButtonWithIconRenderFunc: React.FC<ButtonProps> = ({
  //children,
  renderIcon,
  tooltip,
  height = "28px",
  width = "28px",
}) => {
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
