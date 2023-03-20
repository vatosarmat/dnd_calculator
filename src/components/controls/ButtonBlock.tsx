import type { Key } from 'react'
import styled, { css } from 'styled-components'

import Button from './Button'

type SpanItem = [childIndex: number, span: number]

export type DivProps = {
  $cols: number
  $span?: SpanItem | SpanItem[]
}

const Div = styled.div<DivProps>`
  display: grid;
  height: 100%;

  ${({ theme, $cols, $span }) => {
    let span
    if ($span && $span.length > 0) {
      if (Array.isArray($span[0])) {
        span = $span as SpanItem[]
      } else {
        span = [$span] as SpanItem[]
      }
    } else {
      span = [] as SpanItem[]
    }

    return css`
      gap: ${theme.spacing()}px;
      grid-template-columns: ${`repeat(${$cols}, 1fr)`};

      ${span.map(
        ([childIndex, span]) =>
          css`
            & > *:nth-child(${childIndex}) {
              grid-column: span ${span};
            }
          `
      )}
    `
  }}
`

export type ButtonBlockProps<V extends Key> = {
  disabled?: boolean

  onClick?: (value: V) => void
  values: readonly V[]
} & DivProps

export const ButtonBlock = <V extends Key>({
  disabled,
  values,
  onClick,
  ...divProps
}: ButtonBlockProps<V>) => {
  return (
    <Div {...divProps}>
      {values.map(v => (
        <Button
          key={v}
          disabled={disabled}
          onClick={onClick ? () => onClick(v) : undefined}
        >
          {v.toString()}
        </Button>
      ))}
    </Div>
  )
}

export default ButtonBlock
