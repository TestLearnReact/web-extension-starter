import { createGlobalStyle, styled } from "@ui/common/styles";

export const GlobalStyle = createGlobalStyle<{
  sidebarWidth: string;
}>`
    .sidebar-draggable {
        height: 100% !important;
    }
    .sidebarResizeHandle {
        width: 4px;
        height: 100vh;
        position: absolute;
        top: 66px;
        &:hover {
            background: #5671cf30;
        }
    }
    #outerContainer {
        width: ${(props) => props.sidebarWidth};
    }
  `;

export const ContainerStyled = styled.div`
  //<{ sidebarWidth: string }>
  height: 100%;
  //width: 450px; // todo
  overflow-x: visible;
  position: fixed;
  padding: 0px 0px 10px 0px;
  right: ${({ theme }) => theme?.constants.rightOffsetPx ?? 0};
  top: ${({ theme }) => theme?.constants.topOffsetPx ?? 0};
  padding-right: ${({ theme }) => theme?.constants.paddingRight ?? 0};
  z-index: 999999899; /* This is to combat pages setting high values on certain elements under the sidebar */
  background: ${(props) => props.theme.themeColors.backgroundDark};
  transition: all 0.1s cubic-bezier(0.65, 0.05, 0.36, 1) 0s;
  border-left: 1px solid ${({ theme }) => theme.themeColors.lineColor};
  font-family: "Inter", sans-serif;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const OuterContainerStyled = styled.div`
  height: 100vh; //%;
  width: 350px; // todo
  overflow-x: visible;
  position: fixed;
  padding: 0px 0px 10px 0px;
  right: ${({ theme }) => theme?.constants.rightOffsetPx ?? 0};
  top: ${({ theme }) => theme?.constants.topOffsetPx ?? 0};
  padding-right: ${({ theme }) => theme?.constants.paddingRight ?? 0};
  z-index: 999999899; /* This is to combat pages setting high values on certain elements under the sidebar */
  //background: ${(props) => props.theme.themeColors.backgroundDark};
  transition: all 0.1s cubic-bezier(0.65, 0.05, 0.36, 1) 0s;
  border-left: 1px solid ${({ theme }) => theme.themeColors.lineColor};
  font-family: "Inter", sans-serif;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const InnerContainerStyled = styled.div`
  position: relative;
  left: 0;
  top: 0;
  height: 100%;
  width: ${({ theme }) => theme?.variables.sidebarInnerWidth ?? 0}; //300px;
  overflow-x: visible;
  background: ${(props) => props.theme.themeColors.backgroundDark};
  color: ${({ theme }) => theme?.themeColors.textColor};
`;
