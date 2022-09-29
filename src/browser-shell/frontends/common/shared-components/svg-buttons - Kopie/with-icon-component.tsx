import React, { ComponentType, ReactNode, useState } from "react";
import { IconProps } from "./types";

type ButtonProps = {
  children: ReactNode;
  Icon: ComponentType<IconProps>;
};

export const ButtonWithIconComponent = ({ children, Icon }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className="button"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <span className="button-icon">
        <Icon fontSize="small" isHovered={isHovered} />
      </span>
      <span>{children}</span>
    </button>
  );
};
