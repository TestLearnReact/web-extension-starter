import React, { ReactElement, SVGProps } from "react";
import ButtonTooltip, { TooltipPosition } from "../button-tooltip";

type SvgIconProps = (props: SVGProps<SVGSVGElement>) => ReactElement;

interface IProps {
  tooltipProps: { tooltipText: string; position: TooltipPosition };
  iconProps: {
    icon: SvgIconProps;
    className?: string;
    height?: SVGProps<SVGSVGElement>["height"];
    width?: SVGProps<SVGSVGElement>["width"];
    fill?: SVGProps<SVGSVGElement>["fill"];
  };
  onClick: () => void;
}

export const SvgTooltipComponent = ({
  iconProps,
  tooltipProps,
  onClick,
}: IProps) => {
  const { tooltipText, position } = tooltipProps;

  const {
    height = 20,
    width = 18,
    fill = "currentColor",
    className,
  } = iconProps;

  const Icon = iconProps.icon;

  return (
    <ButtonTooltip tooltipText={tooltipText} position={position}>
      <div onClick={onClick}>
        <Icon
          fill={fill}
          className={
            className ? `${className} buttonElemenet` : "buttonElemenet"
          }
          height={height}
          width={width}
          // style={{ fontSize: "2em", color: "red" }}
        />
      </div>
    </ButtonTooltip>
  );
};
