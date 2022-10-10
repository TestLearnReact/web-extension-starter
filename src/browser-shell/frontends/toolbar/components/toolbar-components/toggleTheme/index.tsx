import * as React from "react";
import {
  SvgTooltipComponent,
  TooltipPosition,
} from "@browser-shell/frontends/common";
import { useTheme } from "@browser-shell/frontends/common/context";

import IconAsleep from "~icons/carbon/asleep";
import IconAsleepFilled from "~icons/carbon/asleep-filled";
import { TooltipButtonIcon } from "@browser-shell/frontends/common/shared-components/svg-buttons/styled-component-icon/TooltipButtonIcon";

interface IProps {
  tooltipText: string;
  position?: TooltipPosition;
}

export const ToggleTheme: React.FC<IProps> = ({
  tooltipText,
  position = "leftNarrow",
}) => {
  const { themeType, setCurrentTheme } = useTheme();

  const toggleTheme = () => {
    setCurrentTheme(themeType === "dark" ? "light" : "dark");
  };

  return (
    <>
      <SvgTooltipComponent
        iconProps={{
          icon: themeType === "dark" ? IconAsleep : IconAsleepFilled,
          className: "ignore-react-onclickoutside",
        }}
        tooltipProps={{ tooltipText: tooltipText, position: position }}
        onClick={() => toggleTheme()}
      />
    </>
  );
};
