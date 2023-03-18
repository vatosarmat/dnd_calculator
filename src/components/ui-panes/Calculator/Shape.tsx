import styled, { css } from 'styled-components'

type CalculatorShapeProps = {
  $canvas?: boolean
  $hoverDrop?: boolean
}

const CalculatorShape = styled.div<CalculatorShapeProps>`
  display: flex;
  box-sizing: content-box;
  flex-direction: column;
  position: relative;

  ${({ $hoverDrop, $canvas, theme }) => {
    const {
      palette,
      decoration,
      layout: {
        block: { height, width },
      },
    } = theme

    return css`
      width: ${width}px;
      height: ${Object.values(height).reduce((ac, v) => ac + v, 0)}px;
      border-radius: ${decoration.buttonBorderRadius}px;
      border-color: ${palette.gray.canvasBorder};

      ${$canvas
        ? css`
            border-width: 2px;
            padding: 3px;
            top: -5px;
            border-style: dashed;
            background-color: ${$hoverDrop ? palette.sky : 'transparent'};
          `
        : css`
            border-width: 1px;
            padding: 4px;
            top: -5px;
            border-style: solid;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
          `}
    `
  }}
`

export default CalculatorShape
