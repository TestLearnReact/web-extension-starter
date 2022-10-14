import React, { ReactElement, SVGProps } from 'react';

import { ButtonTooltip, TooltipPosition } from '../button-tooltip'; // "@ui/common/shared-components";
import { Icon } from './Icon';

type SvgIconProps = (props: SVGProps<SVGSVGElement>) => ReactElement;

export interface IPropsStyledComponentsSvg {
  tooltipProps: { tooltipText: string; position?: TooltipPosition };
  iconProps: {
    icon: SvgIconProps;
    className?: string;
    height?: string | undefined; // SVGProps<SVGSVGElement>["height"];
    width?: string | undefined; // SVGProps<SVGSVGElement>["width"];
    fill?: SVGProps<SVGSVGElement>['fill'];
  };
  onClick: () => void;
}

export const TooltipButtonIcon: React.FC<IPropsStyledComponentsSvg> = ({
  iconProps,
  tooltipProps,
  onClick,
}) => {
  const { tooltipText, position } = tooltipProps;

  return (
    <ButtonTooltip tooltipText={tooltipText} position={position}>
      <div onClick={onClick} className='s-container'>
        <Icon {...iconProps} />
      </div>
    </ButtonTooltip>
  );
};
