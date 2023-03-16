import { forwardRef } from 'react'
import styled, { css } from 'styled-components'

import { StyledTransient, styledTransient } from 'utils'
import { getCalculatorBlockComponent } from './helpers'
import { CalculatorBlockName } from 'state'

const TRANSPARENCY_TABLE = {
  low: 0.9,
  high: 0.4,
}

type DivProps = {
  content: CalculatorBlockName
  shadow?: boolean
  transparency?: keyof typeof TRANSPARENCY_TABLE
}

const Div = styled.div<StyledTransient<DivProps>>`
  width: ${({ theme: { layout } }) => layout.block.width}px;
  height: ${({ $content, theme: { layout } }) => layout.block.height[$content]}px;
  padding: ${({ theme }) => theme.spacing(0.5)}px;
  border-radius: 4px;
  opacity: ${({ $transparency }) =>
    $transparency ? TRANSPARENCY_TABLE[$transparency] : 1};

  ${({ $shadow, theme: { palette } }) =>
    $shadow &&
    css`
      background-color: ${palette.gray.white};
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
    `}
`

export type CalculatorBlockProps = DivProps & {
  disabled?: boolean
  onDoubleClick?: (blockName: CalculatorBlockName) => void
}

export const CalculatorBlock = forwardRef<HTMLDivElement, CalculatorBlockProps>(
  (
    {
      onDoubleClick,
      disabled,
      shadow,
      transparency,

      content,
    },
    ref
  ) => {
    const Component = getCalculatorBlockComponent(content)

    return (
      <Div
        {...styledTransient({
          shadow,
          content,
          transparency,
        })}
        ref={ref}
        onDoubleClick={onDoubleClick ? () => onDoubleClick(content) : undefined}
      >
        <Component disabled={disabled} />
      </Div>
    )
  }
)
