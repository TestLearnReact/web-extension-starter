import {
  StyleClosetTheme,
  styled,
} from "@browser-shell/frontends/common/styled-components";
import { IPropsStyledComponentsSvg } from ".";
import { SvgTooltipStyledComponent } from "./index";

export const Component = (Comp) => Comp;

const fill = (props: PickProps) => {
  if (props.fill) {
    //return "red";
    return props.fill;
  }
  //return "green";
  return props.theme.themeColors.lineColor;
};

type PickProps = Pick<
  IPropsStyledComponentsSvg["iconProps"],
  "className" | "height" | "width" | "fill"
> & { theme: StyleClosetTheme };

export const StyledIcon = styled(Component)<PickProps>`
  height: 20px;
  width: 18px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  margin: 5px 0;
  fill: ${(props) => fill(props)};

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

export const Container = styled.div<PickProps>`
  .test {
    height: 20px;
    width: 18px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    cursor: pointer;
    margin: 5px 0;
    fill: ${(props) => fill(props)};
    color: ${(props) => fill(props)};

    &:hover {
      opacity: 0.7;
    }

    &:active {
      opacity: 1;
    }

    &:focus {
      outline: none;
    }
  }
`;
