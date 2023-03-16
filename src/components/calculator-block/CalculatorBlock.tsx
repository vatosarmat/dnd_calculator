import { forwardRef } from 'react'
import styled, { css } from 'styled-components'

import { StyledTransient, styledTransient } from 'utils'
import { DRAG_TYPE, getCalculatorBlockComponent } from './helpers'
import { CalculatorBlockName } from 'state'

type StyledBlockProps = {
  content: CalculatorBlockName
  shadow?: boolean
  opacity?: 0.5 | 0.7 | 1
  transparent?: boolean
}

const StyledBlock = styled.div<StyledTransient<StyledBlockProps>>`
  width: ${({ $content, theme: { layout } }) => layout.block.width}px;
  height: ${({ $content, theme: { layout } }) => layout.block.height[$content]}px;
  padding: ${({ theme }) => theme.spacing(0.5)}px;
  border-radius: 4px;
  background-color: ${({ $transparent, theme: { palette } }) =>
    $transparent ? 'transparent' : palette.gray.white};
  opacity: ${({ $opacity }) => $opacity};

  ${({ $shadow }) =>
    $shadow &&
    css`
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
    `}
`

export type CalculatorBlockProps = StyledBlockProps & {
  type?: string
  disabled?: boolean
  onDoubleClick?: (blockName: CalculatorBlockName) => void
}

export const CalculatorBlock = forwardRef<HTMLDivElement, CalculatorBlockProps>(
  (
    {
      type = DRAG_TYPE,

      onDoubleClick,
      disabled,
      shadow,
      opacity = 1,
      transparent,

      content,
    },
    ref
  ) => {
    const Component = getCalculatorBlockComponent(content)

    return (
      <StyledBlock
        {...styledTransient({
          opacity,
          shadow,
          content,
          transparent,
        })}
        ref={ref}
        onDoubleClick={onDoubleClick ? () => onDoubleClick(content) : undefined}
      >
        <Component disabled={disabled} />
      </StyledBlock>
    )
  }
)
