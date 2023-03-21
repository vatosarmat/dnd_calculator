import type { Key } from 'react'
import styled, { css } from 'styled-components'

import Button, { ButtonProps } from './Button'

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

export type ButtonItem<V extends Key> = {
  label?: string
  value: V
  props: Partial<ButtonProps>
}

export type ButtonBlockProps<V extends Key> = {
  disabled?: boolean

  onClick?: (value: V) => void
  items: readonly ButtonItem<V>[] | readonly V[]
} & DivProps

export const ButtonBlock = <V extends Key>({
  disabled,
  items: itemsProp,
  onClick,
  ...divProps
}: ButtonBlockProps<V>) => {
  let items: ButtonItem<V>[]
  if (itemsProp.length > 0 && typeof itemsProp[0] === 'object') {
    items = itemsProp as ButtonItem<V>[]
  } else {
    items = (itemsProp as V[]).map(value => ({
      value,
      props: {},
    }))
  }

  return (
    <Div {...divProps}>
      {items.map(({ value, label, props }) => {
        return (
          <Button
            {...props}
            key={value}
            disabled={disabled}
            onClick={onClick ? () => onClick(value) : undefined}
          >
            {label ?? value.toString()}
          </Button>
        )
      })}
    </Div>
  )
}

export default ButtonBlock
