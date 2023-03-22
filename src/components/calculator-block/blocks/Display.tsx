import styled, { css } from 'styled-components'

export type DisplayProps = {
  children?: string
}

const Display = styled.div<DisplayProps>`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
  height: 100%;

  ${({ theme }) => {
    const { palette, decoration, font } = theme
    return css`
      padding: ${theme.spacing()}px;
      border-radius: ${decoration.buttonBorderRadius}px;
      background-color: ${palette.gray.displayBg};

      color: ${palette.gray.displayFg};
      font-size: ${font.display.size}px;
      font-weight: ${font.display.weight};
    `
  }}
`

Display.defaultProps = {
  children: '0',
}

export default Display
