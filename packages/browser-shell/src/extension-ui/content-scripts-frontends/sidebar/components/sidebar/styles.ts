// Bug CRXJS do not compile to dist
import { styled } from '@ui/common/styles';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const TopBarContainer = styled.div`
  position: relative;
  left: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
  justify-content: space-between;
  color: ${({ theme }) => theme?.themeColors.textColor};
  background-color: ${(props) => props.theme.themeColors.backgroundLight2};
`;

export const Content = styled.div`
  left: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
  justify-content: center;
  color: ${({ theme }) => theme?.themeColors.textColor};
  background-color: ${(props) => props.theme.themeColors.backgroundDark};
  font-size: ${({ theme }) => theme?.fontSizes[0]};
`;
