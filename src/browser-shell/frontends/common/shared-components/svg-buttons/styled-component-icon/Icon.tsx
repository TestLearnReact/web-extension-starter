import React from "react";
import { IPropsStyledComponentsSvg } from ".";

import * as S from "./styles";

export type IconProps = Pick<
  IPropsStyledComponentsSvg["iconProps"],
  "icon" | "className" | "height" | "width" | "fill"
>;

export const Icon: React.FC<IconProps> = (props) => {
  const { icon, className, height = "20px", width = "18px", fill } = props;

  const Icon = icon;

  return (
    <S.Wrapper>
      <Icon className={className} height={height} width={width} fill={fill} />
    </S.Wrapper>
  );
};
