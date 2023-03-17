import { Key } from 'react'

import styled, { css, useTheme } from 'styled-components'

const Div = styled.div`
  display: flex;
  flex-direction: row;

  padding: 1px;

  border-radius: ${({ theme: { decoration } }) => decoration.buttonBorderRadius}px;
  background-color: ${({ theme: { palette } }) => palette.gray.displayBg};
`

type ButtonProps = {
  $checked?: boolean
}

const Button = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;

  border-style: solid;
  border-width: 1px;

  ${({ theme, $checked }) =>
    css`
      gap: ${theme.spacing()}px;
      padding: ${theme.spacing()}px ${theme.spacing(1.5)}px;

      border-radius: ${theme.decoration.buttonBorderRadius - 1}px;

      ${$checked
        ? css`
            border-color: ${theme.palette.gray.buttonBorder};
            background-color: ${theme.palette.gray.white};
          `
        : css`
            border-color: transparent;
            background-color: transparent;
          `}
    `}
`

type Item<V> = {
  icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
  label?: string
  value: V
}

type ToggleButtonGroupProps<V extends Key> = {
  items: Item<V>[]
  onChange: (value: V) => void
  value: V
  label?: (value: V) => string
}

const ToggleButtonGroup = <V extends Key>({
  items,
  value: checkedValue,
  onChange,
  label: labelFunc,
}: ToggleButtonGroupProps<V>) => {
  const theme = useTheme()
  return (
    <Div>
      {items.map(({ value, label, icon: Icon }) => {
        const selectedValue = checkedValue === value
        return (
          <Button $checked={selectedValue} key={value} onClick={() => onChange(value)}>
            {Icon && <Icon color={selectedValue ? theme.palette.primary : undefined} />}
            {label ? label : labelFunc ? labelFunc(value) : value}
          </Button>
        )
      })}
    </Div>
  )
}

export default ToggleButtonGroup
