import { Key } from 'react'

import styled, { css, useTheme } from 'styled-components'

type DivProps = {
  $disabled?: boolean
}

const Div = styled.div<DivProps>`
  display: flex;
  flex-direction: row;

  padding: 1px;

  border-radius: ${({ theme: { decoration } }) => decoration.buttonBorderRadius}px;
  background-color: ${({ theme: { palette } }) => palette.gray.displayBg};

  opacity: ${({ $disabled }) => ($disabled ? 0.9 : 1)};
`

type ButtonProps = {
  $checked?: boolean
  disabled?: boolean
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
  disabled?: boolean
}

const ToggleButtonGroup = <V extends Key>({
  items,
  value: checkedValue,
  onChange,
  label: labelFunc,
  disabled,
}: ToggleButtonGroupProps<V>) => {
  const theme = useTheme()
  return (
    <Div $disabled={disabled}>
      {items.map(({ value, label, icon: Icon }) => {
        const selectedValue = checkedValue === value
        return (
          <Button
            disabled={disabled}
            $checked={selectedValue}
            key={value}
            onClick={() => onChange(value)}
          >
            {Icon && <Icon color={selectedValue ? theme.palette.primary : undefined} />}
            {label ? label : labelFunc ? labelFunc(value) : value}
          </Button>
        )
      })}
    </Div>
  )
}

export default ToggleButtonGroup
