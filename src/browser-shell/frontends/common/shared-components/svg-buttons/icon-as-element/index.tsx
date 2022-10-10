import React, { ReactElement, SVGProps } from "react";
import ButtonTooltip, { TooltipPosition } from "../../button-tooltip";

import "../style-element.scss";

interface IProps {
  tooltipProps: { tooltipText: string; position: TooltipPosition };
  iconProps: {
    icon: ReactElement<SVGProps<SVGSVGElement>>;
    className?: string;
  };
  onClick: () => void;
}

export const SvgTooltipElement = ({
  iconProps,
  tooltipProps,
  onClick,
}: IProps) => {
  const { tooltipText, position } = tooltipProps;

  const svgProps = iconProps.icon.props;

  const clonedIcon = React.cloneElement(iconProps.icon, {
    height: svgProps.height || "20px",
    width: svgProps.width || "18px",
    className: svgProps.className
      ? `${svgProps.className} buttonElemenet`
      : "buttonElemenet",
  });

  return (
    <ButtonTooltip tooltipText={tooltipText} position={position}>
      <div onClick={onClick}>{clonedIcon}</div>
    </ButtonTooltip>
  );
};
