// Bug CRXJS do not compile to dist
import { styled } from "@ui/common/styles";

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  color: red;
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  //align-items: center;
  height: fit-content;
  justify-content: center;

  width: 80%;
  color: ${({ theme }) => theme?.themeColors.textColor};
  background-color: ${(props) => props.theme.themeColors.backgroundLight};
`;
//${({ theme }) => theme?.fontSizes.}; // todo bug

export const TopBarContainer = styled.div`
  position: relative;
  left: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
  justify-content: space-between;

  //width: 310px;
  //color: ${({ theme }) => theme?.themeColors.textColor};
  background-color: ${(props) => props.theme.themeColors.backgroundLight2};
`;
