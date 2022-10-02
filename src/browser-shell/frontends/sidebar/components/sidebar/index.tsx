import {
  StyledButtonTest,
  SvgTooltipStyledComponent,
} from "@browser-shell/frontends/common/shared-components/svg-buttons/styled-component-icon";
import React from "react";
import * as S from "./styles";

import IconClose from "~icons/public-assets-icons/close.svg";
import IconAccessibility from "~icons/carbon/accessibility";

export const Sidebar: React.FC<{}> = () => {
  return (
    <S.Container>
      <S.Content className="content">
        <SvgTooltipStyledComponent
          iconProps={{
            icon: IconClose,
            fill: "#c41010",
          }}
          tooltipProps={{ tooltipText: "tooltipText", position: "leftNarrow" }}
          onClick={() => console.log("...")}
        />

        <SvgTooltipStyledComponent
          iconProps={{
            icon: IconAccessibility,
            fill: "#c41010",
          }}
          tooltipProps={{ tooltipText: "tooltipText", position: "leftNarrow" }}
          onClick={() => console.log("...")}
        />
        <StyledButtonTest />

        <br />
        <br />
        <br />
        <div className="crx-root"> Sidebar !!!</div>
        <br />
        <div> content script: sidebar.ts </div>
        <br />
      </S.Content>
    </S.Container>
  );
};
