import styled from 'styled-components'

export type DisplayProps = {
  children?: string
}

const Display = styled.div<DisplayProps>`
  display: flex;
  align-items: center;
  justify-content: right;
  padding: ${({ theme }) => theme.spacing()}px;
  width: 100%;
  height: 100%;
  border-radius: ${({ theme: { decoration } }) => decoration.buttonBorderRadius}px;
  color: ${({ theme: { palette } }) => palette.gray.displayFg};
  background-color: ${({ theme: { palette } }) => palette.gray.displayBg};
`

Display.defaultProps = {
  children: '0',
}

export default Display
