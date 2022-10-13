import React, { ReactElement, SVGProps } from "react";
import { TooltipPosition } from "../button-tooltip";
import "../style-element.scss";
declare type SvgIconProps = (props: SVGProps<SVGSVGElement>) => ReactElement;
interface ISvgTooltipComponentProps {
    tooltipProps: {
        tooltipText: string;
        position: TooltipPosition;
    };
    iconProps: {
        icon: SvgIconProps;
        className?: string;
        height?: SVGProps<SVGSVGElement>["height"];
        width?: SVGProps<SVGSVGElement>["width"];
        fill?: SVGProps<SVGSVGElement>["fill"];
    };
    wrapperClassName?: string;
    onClick: () => void;
}
export declare const SvgTooltipComponent: React.FC<ISvgTooltipComponentProps>;
export {};
