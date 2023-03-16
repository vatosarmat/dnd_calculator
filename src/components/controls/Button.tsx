import styled, { css } from 'styled-components'

export type ButtonProps = {
  $full?: boolean
  $primary?: boolean

  disabled?: boolean

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
  border-color: ${({ theme }) => theme.palette.gray.buttonBorder};
  border-radius: ${({ theme }) => theme.decoration.buttonBorderRadius}px;

  ${({ $primary, theme: { palette, decoration } }) =>
    $primary
      ? css`
          border-width: 0px;
          color: ${palette.gray.white};
          background-color: ${palette.primary};
        `
      : css`
          border-width: 1px;
          color: ${palette.gray.black};
          background-color: ${palette.gray.white};
        `}

  &:disabled {
    pointer-events: none;
  }
`

StyledButton.defaultProps = {
  $full: true,
}

export default StyledButton
