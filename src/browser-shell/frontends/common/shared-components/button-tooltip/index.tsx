import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useEventListener } from "../../hooks";

import * as S from "./styles";

export type TooltipPosition =
  | "left"
  | "leftNarrow"
  | "leftBig"
  | "right"
  | "rightCentered"
  | "rightContentTooltip"
  | "top"
  | "bottom"
  | "bottomSidebar"
  | "bottomRightEdge"
  | "popupLeft";

export interface IProps {
  tooltipText: string;
  position?: TooltipPosition;
  children: React.ReactNode;
}

export const ButtonTooltip: React.FC<IProps> = ({
  children,
  tooltipText,
  position = "leftNarrow",
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<{ displayTooltip: boolean }>({
    displayTooltip: false,
  });

  useEffect(() => {
    return () => {};
  }, []);

  const handleMouseEnter = () => setState({ displayTooltip: true });
  const handleMouseLeave = () => setState({ displayTooltip: false });

  useEventListener("mouseenter", handleMouseEnter, tooltipRef);
  useEventListener("mouseleave", handleMouseLeave, tooltipRef);

  return (
    <S.Container ref={tooltipRef} position={position}>
      {state.displayTooltip && (
        <S.TooltipBubble position={position}>
          <S.TooltipText>{tooltipText}</S.TooltipText>
        </S.TooltipBubble>
      )}

      {children}
    </S.Container>
  );
};

export default ButtonTooltip;
