import React, { type SVGProps, ReactElement, useState } from 'react';
import { ButtonTooltip, TooltipPosition } from '../button-tooltip';

export type IconPropsRenderFunction = {
  fontSize?: SVGProps<SVGSVGElement>['fontSize'];
  color?: SVGProps<SVGSVGElement>['color'];
  height?: SVGProps<SVGSVGElement>['height'];
  width?: SVGProps<SVGSVGElement>['width'];
  className?: string;
  // isHovered: boolean;
};

type ButtonProps = {
  // children?: ReactNode;
  renderIcon: (settings: {
    fontSize: IconPropsRenderFunction['fontSize'];
    color: IconPropsRenderFunction['color'];
    isHovered: boolean;
    height?: IconPropsRenderFunction['height'];
    width: IconPropsRenderFunction['width'];
  }) => ReactElement<IconPropsRenderFunction>;
  tooltip: { tooltipText: string; position: TooltipPosition };
  height?: IconPropsRenderFunction['height'];
  width?: IconPropsRenderFunction['width'];
};

export const ButtonWithIconRenderFunc: React.FC<ButtonProps> = ({
  // children,
  renderIcon,
  tooltip,
  height = '28px',
  width = '28px',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const { tooltipText, position } = tooltip;

  const icon = renderIcon({
    fontSize: 'small',
    isHovered: isHovered,
    color: '#66593d',
    height: height,
    width: width,
  });

  return (
    <ButtonTooltip tooltipText={tooltipText} position={position}>
      {icon}
    </ButtonTooltip>
  );
};
