import type { FC } from 'react'
import EqualButton from './blocks/EqualButton'
import ButtonBlock from './blocks/ButtonsBlock'

export const DRAG_TYPE = 'CALCULATOR_BLOCK'
export const calculatorBlockNameValues = ['operations', 'digits', 'equal'] as const
export type CalculatorBlockName = typeof calculatorBlockNameValues[number]
export type DragItem = { calculatorBlockName: CalculatorBlockName }

export type CalculatorBlockContentProps = {
  disabled?: boolean
}

export const getCalculatorBlockComponent = (
  name: CalculatorBlockName
): FC<CalculatorBlockContentProps> => {
  switch (name) {
    case 'equal':
      return EqualButton
    case 'operations':
      return ButtonBlock.Operations
    case 'digits':
      return ButtonBlock.Digits
  }
}
