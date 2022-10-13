import { ReactElement, SVGProps } from "react";
import { TooltipPosition } from "../button-tooltip";
import "../style-element.scss";
interface ISvgTooltipElementProps {
    tooltipProps: {
        tooltipText: string;
        position: TooltipPosition;
    };
    iconProps: {
        icon: ReactElement<SVGProps<SVGSVGElement>>;
        className?: string;
    };
    onClick: () => void;
}
export declare const SvgTooltipElement: ({ iconProps, tooltipProps, onClick, }: ISvgTooltipElementProps) => JSX.Element;
export {};
