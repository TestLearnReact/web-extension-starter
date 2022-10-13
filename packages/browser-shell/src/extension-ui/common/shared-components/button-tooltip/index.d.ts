import React from "react";
export declare type TooltipPosition = "left" | "leftNarrow" | "leftBig" | "right" | "rightCentered" | "rightContentTooltip" | "top" | "bottom" | "bottomSidebar" | "bottomRightEdge" | "popupLeft";
export interface IButtonTooltipProps {
    tooltipText: string;
    position?: TooltipPosition;
    children: React.ReactNode;
}
export declare const ButtonTooltip: React.FC<IButtonTooltipProps>;
export default ButtonTooltip;
