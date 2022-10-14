import { createGlobalStyle, styled } from '@ui/common/styles';

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
  height: 100%;
  overflow-x: visible;
  position: fixed;
  padding: 0px 0px 10px 0px;
  right: ${({ theme }) => theme?.constants.rightOffsetPx ?? 0}px;
  top: ${({ theme }) => theme?.constants.topOffsetPx ?? 0}px;
  padding-right: ${({ theme }) => theme?.constants.paddingRight ?? 0}px;
  z-index: 2147483646; /* This is to combat pages setting high values on certain elements under the sidebar */
  background: ${(props) => props.theme.themeColors.backgroundLight};
  transition: all 0.1s cubic-bezier(0.65, 0.05, 0.36, 1) 0s;
  border-left: 1px solid ${(props) => props.theme.themeColors.lineColor};
  font-family: 'Inter', sans-serif;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;
