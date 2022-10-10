import { createGlobalStyle, styled } from "../../../common";

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
    .ttt{      
      width: 100px;
      height: 100px;
      background: #5671cf30;
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
