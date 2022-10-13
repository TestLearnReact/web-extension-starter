import React, { ReactElement } from "react";
import { TooltipPosition } from "../button-tooltip";
import type { SVGProps } from "react";
export declare type IconPropsRenderFunction = {
    fontSize?: SVGProps<SVGSVGElement>["fontSize"];
    color?: SVGProps<SVGSVGElement>["color"];
    height?: SVGProps<SVGSVGElement>["height"];
    width?: SVGProps<SVGSVGElement>["width"];
    className?: string;
};
declare type ButtonProps = {
    renderIcon: (settings: {
        fontSize: IconPropsRenderFunction["fontSize"];
        color: IconPropsRenderFunction["color"];
        isHovered: boolean;
        height?: IconPropsRenderFunction["height"];
        width: IconPropsRenderFunction["width"];
    }) => ReactElement<IconPropsRenderFunction>;
    tooltip: {
        tooltipText: string;
        position: TooltipPosition;
    };
    height?: IconPropsRenderFunction["height"];
    width?: IconPropsRenderFunction["width"];
};
export declare const ButtonWithIconRenderFunc: React.FC<ButtonProps>;
export {};
