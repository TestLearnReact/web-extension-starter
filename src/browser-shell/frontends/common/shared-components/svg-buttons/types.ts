// import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

// export type IconProps = {
//   fontSize?: SvgIconTypeMap["props"]["fontSize"];
//   color?: SvgIconTypeMap["props"]["color"];
//   isHovered: boolean;
// };

import type { SVGProps } from "react";

export type IconProps = {
  fontSize?: SVGProps<SVGSVGElement>["fontSize"];
  color?: SVGProps<SVGSVGElement>["color"];
  height?: SVGProps<SVGSVGElement>["height"];
  width?: SVGProps<SVGSVGElement>["width"];
  className?: string;
  // isHovered: boolean;
};
