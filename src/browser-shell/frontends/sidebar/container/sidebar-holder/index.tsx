import React, { useEffect, useRef, useState } from "react";
import { SidebarContainerDependencies } from "../../main";
import { ms_inPageUiStateStream } from "~/browser-shell/utils/messages";

import * as S from "./styles";
import {
  darkTheme,
  lightTheme,
  ThemeProvider,
  useClickOutside,
  useThemeMode,
} from "~/browser-shell/frontends/common";
import { Sidebar } from "../../components/sidebar";

interface SidebarHolderProps {
  dependencies: SidebarContainerDependencies;
}

const Sidebarholder: React.FC<SidebarHolderProps> = ({ dependencies }) => {
  const { inPageUI } = dependencies;
  const ref = useRef<HTMLDivElement>(null);

  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const [sharedInPageUiState, setSharedInPageUiState] = useState<any>(
    inPageUI.componentsShown
  ); //InPageUIComponentShowState

  useEffect(() => {
    ms_inPageUiStateStream.subscribe(([{ toolbar, sidebar }]) => {
      setSharedInPageUiState({ toolbar, sidebar });
    });
  }, []); //dependencies.activeTab.url

  const handleClickOutside = () => {
    console.log("clicked outside");
  };

  useClickOutside(ref, handleClickOutside);

  // if (!sharedInPageUiState.sidebar) return null;
  return (
    <>
      <ThemeProvider theme={themeMode}>
        <S.GlobalStyle sidebarWidth={"350px"} />

        <S.ContainerStyled
          ref={ref}
          id="outerContainer"
          className="ContainerStyled"
        >
          <Sidebar />
        </S.ContainerStyled>
      </ThemeProvider>
    </>
  );
};

export default Sidebarholder;
