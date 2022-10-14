import { styled } from '@ui/common/styles';
import { IIconProps } from './Icon';

export const Wrapper = styled.div<
  Pick<IIconProps, 'height' | 'width' | 'fill'>
>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  margin: 5px 0;
  fill: ${(props) =>
    props.fill ? props.fill : props.theme.themeColors.iconColor};
  color: ${(props) =>
    props.fill ? props.fill : props.theme.themeColors.iconColor};

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;
