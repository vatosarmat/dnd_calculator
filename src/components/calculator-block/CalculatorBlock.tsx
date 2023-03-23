import { forwardRef, PropsWithChildren, CSSProperties } from 'react'
import styled, { css } from 'styled-components'

import Buttons from './blocks/Buttons'
import Display from './blocks/Display'
import { StyledTransient, styledTransient } from 'utils'
import { CalculatorBlockName } from 'state/canvas'

const TRANSPARENCY_TABLE = {
  low: 0.9,
  high: 0.4,
}

type DivProps = {
  content: CalculatorBlockName
  shadow?: boolean
  transparency?: keyof typeof TRANSPARENCY_TABLE
  cursor?: CSSProperties['cursor']
}

const Div = styled.div<StyledTransient<DivProps>>`
  border-radius: 4px;

  ${({ $shadow, $content, $transparency, $cursor = 'default', theme }) => {
    const { palette, layout } = theme
    const rules = [
      css`
        width: ${layout.block.width}px;
        height: ${layout.block.height[$content]}px;
        padding: ${theme.spacing(0.5)}px;
        opacity: ${$transparency ? TRANSPARENCY_TABLE[$transparency] : 1};
        cursor: ${$cursor};
      `,
    ]
    if ($shadow) {
      rules.push(
        css`
          background-color: ${palette.gray.white};
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
        `
      )
    }
    return rules
  }}
`

export type CalculatorBlockProps = DivProps & {
  disabled?: boolean
  onDoubleClick?: (blockName: CalculatorBlockName) => void
}

export const CalculatorBlock = forwardRef<
  HTMLDivElement,
  PropsWithChildren<CalculatorBlockProps>
>(
  (
    {
      onDoubleClick,
      disabled,
      shadow,
      transparency,
      cursor,

      content,
      children: childrenProp,
    },
    ref
  ) => {
    let children
    if (childrenProp) {
      children = childrenProp
    } else {
      switch (content) {
        case 'display': {
          children = <Display />
          break
        }
        case 'operations': {
          children = <Buttons.Operations disabled={disabled} />
          break
        }
        case 'digits': {
          children = <Buttons.Digits disabled={disabled} />
          break
        }
        case 'controls': {
          children = <Buttons.Control disabled={disabled} />
          break
        }
      }
    }

    return (
      <Div
        {...styledTransient({
          shadow,
          content,
          transparency,
          cursor,
        })}
        ref={ref}
        onDoubleClick={onDoubleClick ? () => onDoubleClick(content) : undefined}
      >
        {children}
      </Div>
    )
  }
)
