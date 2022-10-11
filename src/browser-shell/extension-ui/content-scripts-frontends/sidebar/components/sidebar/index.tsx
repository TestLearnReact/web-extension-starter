import React from "react";
import * as S from "./styles";

import IconClose from "~icons/public-assets-icons/close.svg";
import { TooltipButtonIcon } from "@ui/common/shared-components";

import styles from "./Button.module.css";

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
      <S.Content>Content...</S.Content>

      {/* <CssModuleTestButton>.</CssModuleTestButton> */}
    </S.Container>
  );
};

const SidbarTopBar = ({ children }) => (
  <>
    <S.TopBarContainer>{children}</S.TopBarContainer>
  </>
);

const CssModuleTestButton = ({ children }) => (
  <>
    <button className={styles.error}>Error Button</button>
  </>
);
