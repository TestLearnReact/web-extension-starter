import { styled } from "@browser-shell/frontends/common/styled-components";
import { IconProps } from "./Icon";

export const Wrapper = styled.div<Pick<IconProps, "height" | "width" | "fill">>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  margin: 5px 0;
  fill: ${(props) =>
    props.fill ? props.fill : props.theme.themeColors.iconColor};
  color: ${(props) =>
    props.fill ? props.fill : props.theme.themeColors.iconColor};

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;
