// import { StyleClosetTheme } from "@browser-shell/frontends/common/styled-components";
// import React, { ReactElement, SVGProps } from "react";
// import styled from "styled-components";
// import ButtonTooltip, { TooltipPosition } from "../../button-tooltip";

// import * as S from "./styles";

// export const ButtonTest = () => {
//   return <button onClick={() => console.log("Push")}>Holla</button>;
// };

// export const StyledButtonTest = styled(ButtonTest)`
//   height: 30;
//   width: 30;
//   background-color: red;
// `;

// type SvgIconProps = (props: SVGProps<SVGSVGElement>) => ReactElement;

// export interface IPropsStyledComponentsSvg {
//   tooltipProps: { tooltipText: string; position: TooltipPosition };
//   iconProps: {
//     icon: SvgIconProps;
//     className?: string;
//     height?: SVGProps<SVGSVGElement>["height"];
//     width?: SVGProps<SVGSVGElement>["width"];
//     fill?: SVGProps<SVGSVGElement>["fill"];
//   };
//   onClick: () => void;
// }

// export const SvgTooltipStyledComponent = ({
//   iconProps,
//   tooltipProps,
//   onClick,
// }: IPropsStyledComponentsSvg) => {
//   const { tooltipText, position } = tooltipProps;

//   const {
//     height = 20,
//     width = 18,
//     fill, // = "currentColor",
//     className,
//   } = iconProps;

//   const Icon = iconProps.icon;

//   return (
//     <ButtonTooltip tooltipText={tooltipText} position={position}>
//       <S.Container onClick={onClick}>
//         <Icon
//           fill={fill}
//           // className={
//           //   className ? `${className} buttonElemenet` : "buttonElemenet"
//           // }
//           height={height}
//           width={width}
//           style={{ fontSize: "2em", color: "red" }}
//         />
//       </S.Container>
//     </ButtonTooltip>
//   );
// };
