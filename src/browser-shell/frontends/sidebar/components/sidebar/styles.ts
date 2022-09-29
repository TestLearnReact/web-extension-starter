// Bug CRXJS do not compile to dist
import { styled } from "@browser-shell/frontends/common";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  font-size: 1.4em;
  height: 200px;
  width: 80%;
  color: ${({ theme }) => theme?.colors.grey50};
  background-color: ${(props) => props.theme.colors.grey20};
`;
//${({ theme }) => theme?.fontSizes.}; // todo bug
