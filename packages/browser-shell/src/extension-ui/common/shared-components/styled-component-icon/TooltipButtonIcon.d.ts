import React, { ReactElement, SVGProps } from "react";
import { TooltipPosition } from "../button-tooltip";
declare type SvgIconProps = (props: SVGProps<SVGSVGElement>) => ReactElement;
export interface IPropsStyledComponentsSvg {
    tooltipProps: {
        tooltipText: string;
        position?: TooltipPosition;
    };
    iconProps: {
        icon: SvgIconProps;
        className?: string;
        height?: string | undefined;
        width?: string | undefined;
        fill?: SVGProps<SVGSVGElement>["fill"];
    };
    onClick: () => void;
}
export declare const TooltipButtonIcon: React.FC<IPropsStyledComponentsSvg>;
export {};
