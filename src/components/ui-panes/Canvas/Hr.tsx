import styled, { css } from 'styled-components'

export type HrProps = {
  $pos: 'none' | 'above' | 'below'
}

const Hr = styled.div<HrProps>`
  width: ${({ theme: { layout } }) => layout.block.width + 4}px;
  height: 1px;
  position: absolute;
  left: -2px;
  z-index: 100;
  background-color: ${({ theme }) => theme.palette.primary};

  ${({ $pos }) =>
    $pos === 'above'
      ? css`
          top: 0;
        `
      : $pos === 'below'
      ? css`
          bottom: -1px;
        `
      : css`
          visibility: hidden;
        `}

  &::before {
    content: '';
    width: 4px;
    height: 4px;
    position: absolute;
    left: 0;
    top: -1.5px;
    z-index: 101;
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.palette.primary};
  }

  &::after {
    content: '';
    width: 4px;
    height: 4px;
    position: absolute;
    right: 0;
    top: -1.5px;
    z-index: 101;
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.palette.primary};
  }
`

Hr.defaultProps = {
  $pos: 'none',
}

export default Hr
