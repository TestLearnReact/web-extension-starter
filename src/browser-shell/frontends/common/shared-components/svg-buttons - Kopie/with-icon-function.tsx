import React, { ReactNode, ReactElement, useState } from "react";
import { IconProps } from "./types";

type ButtonProps = {
  children?: ReactNode;
  renderIcon: (settings: {
    fontSize: IconProps["fontSize"];
    color: IconProps["color"];
    isHovered: boolean;
  }) => ReactElement<IconProps>;
};

export const ButtonWithIconRenderFunc = ({
  children,
  renderIcon,
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const icon = renderIcon({
    fontSize: "small",
    isHovered: isHovered,
    color: "#b38729",
  });

  console.log("isHovered", isHovered);

  return (
    <button
      className="button"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <span className="button-icon">{icon}</span>
      {/* <span>{children}</span> */}
    </button>
  );
};
