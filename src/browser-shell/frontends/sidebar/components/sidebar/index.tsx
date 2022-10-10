import React from "react";
import * as S from "./styles";

import IconClose from "~icons/public-assets-icons/close.svg";
import { TooltipButtonIcon } from "@browser-shell/frontends/common/shared-components/svg-buttons/styled-component-icon";
//import IconAccessibility from "~icons/carbon/accessibility";

export const Sidebar: React.FC<{}> = () => {
  return (
    <S.Container>
      <SidbarTopBar>
        <TooltipButtonIcon
          iconProps={{
            icon: IconClose,
          }}
          tooltipProps={{ tooltipText: "Close" }}
          onClick={() => console.log("...")}
        />
      </SidbarTopBar>
    </S.Container>
  );
};

const SidbarTopBar = ({ children }) => (
  <>
    <S.TopBarContainer>{children}</S.TopBarContainer>
  </>
);

{
  /* <SidbarTopBar>
        <TooltipButtonIcon
          iconProps={{
            icon: IconClose,
          }}
          tooltipProps={{ tooltipText: "Close" }}
          onClick={() => console.log("...")}
        />

        {/* <TooltipButtonIcon
          iconProps={{
            icon: IconAccessibility,
          }}
          tooltipProps={{ tooltipText: "Test" }}
          onClick={() => console.log("...")}
        /> */
}
