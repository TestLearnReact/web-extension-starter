import React, { useEffect, useRef, useState } from "react";
import { SidebarContainerDependencies } from "../../main";
import {
  InPageUIComponentShowState,
  ms_inPageUiStateStream,
  ms_sharedStateSettingsStream,
} from "@utils/messages";
import { useThemeContext } from "@ui/common/context";
import { useClickOutside } from "@ui/common/hooks";
import {
  darkTheme,
  lightTheme,
  ThemeProvider as StyledComponentThemeProvider,
} from "@ui/common/styles";

import { Sidebar } from "../../components/sidebar";

import * as S from "./styles";
import { _DEV_OPTIONS } from "@ui/common/dev_config";

interface SidebarHolderProps {
  dependencies: SidebarContainerDependencies;
}

const SidebarContainer: React.FC<SidebarHolderProps> = ({ dependencies }) => {
  console.log("r.e.r.e.n.d.e.r SidebarContainer");

  const { inPageUI } = dependencies;

  const ref = useRef<HTMLDivElement>(null);

  const { themeType, setCurrentTheme, theme } = useThemeContext();

  useEffect(() => {
    ms_sharedStateSettingsStream.subscribe(([{ theme }]) => {
      setCurrentTheme(theme);
    });
  }, []);

  const [sharedInPageUiState, setSharedInPageUiState] =
    useState<InPageUIComponentShowState>(inPageUI.componentsShown);

  useEffect(() => {
    ms_inPageUiStateStream.subscribe(([{ toolbar, sidebar }]) => {
      setSharedInPageUiState({ toolbar, sidebar });
    });
  }, []);

  const handleClickOutside = () => {
    console.log("clicked outside");
    inPageUI.hideSidebar();
  };

  const IGNORE_CLICK_OUTSIDE_CLASS = "ignore-react-onclickoutside";

  useClickOutside({
    ref,
    callback: handleClickOutside,
    ignoreClassNames: IGNORE_CLICK_OUTSIDE_CLASS,
  });

  if (!sharedInPageUiState.sidebar && !_DEV_OPTIONS.DEV_SDEBAR_OPEN)
    return null;
  return (
    <>
      {/* Theme styled-component */}
      <StyledComponentThemeProvider
        theme={themeType === "light" ? lightTheme : darkTheme}
      >
        {/* Theme scss + css variables in style={} */}
        <div
          className={
            "_sidbarContainer theme-" +
            (themeType === "dark" ? "dark" : "light")
          }
          style={
            {
              ...theme,
            } as React.CSSProperties
          }
        >
          <S.GlobalStyle sidebarWidth={"350px"} />

          <S.OuterContainerStyled
            ref={ref}
            id="outerContainer"
            className="ContainerStyled _outerContainerStyled"
          >
            <S.InnerContainerStyled className="_innerContainerStyled">
              <Sidebar />
            </S.InnerContainerStyled>
          </S.OuterContainerStyled>

          {/* <S.ContainerStyled
            ref={ref}
            id="outerContainer"
            className="ContainerStyled"
          >
            <Sidebar />
          </S.ContainerStyled> */}
        </div>
      </StyledComponentThemeProvider>
    </>
  );
};

export default SidebarContainer;
