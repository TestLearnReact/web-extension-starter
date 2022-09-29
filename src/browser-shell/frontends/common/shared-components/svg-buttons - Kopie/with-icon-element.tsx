import React, { ReactElement, ReactNode, useState } from "react";
import { IconProps } from "./types";

type ButtonProps = {
  children: ReactNode;
  icon: ReactElement<IconProps>;
};

export const ButtonWithIconElement = ({ children, icon }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const clonedIcon = React.cloneElement(icon, {
    fontSize: icon.props.fontSize || "small",
    isHovered: isHovered,
  });

  return (
    <button
      className="button"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <span className="button-icon">{clonedIcon}</span>
      <span>{children}</span>
    </button>
  );
};
