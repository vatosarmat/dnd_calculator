import { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'

export type ButtonProps = {
  $full?: boolean
  $color?: 'default' | 'primary' | 'secondary'

  disabled?: boolean
  onClick?: MouseEventHandler

  children?: string
}

const StyledButton = styled.button<ButtonProps>`
  ${({ $full }) =>
    $full &&
    css`
      width: 100%;
      height: 100%;
    `}

  border-style: solid;

  ${({ $color = 'default', theme }) => {
    const { palette, decoration, font } = theme

    return [
      css`
        border-color: ${palette.gray.buttonBorder};
        border-radius: ${decoration.buttonBorderRadius}px;
        font-size: ${font.button.size}px;
        font-weight: ${font.button.weight};
      `,
      $color === 'default'
        ? css`
            border-width: 1px;
            color: ${palette.gray.black};
            background-color: ${palette.gray.white};
          `
        : css`
            border-width: 0px;
            color: ${palette.gray.white};
            background-color: ${palette[$color]};
          `,
    ]
  }}

  &:disabled {
    pointer-events: none;
  }
`

StyledButton.defaultProps = {
  $full: true,
}

export default StyledButton
