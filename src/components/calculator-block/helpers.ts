import type { FC } from 'react'

import EqualButton from './blocks/EqualButton'
import ButtonBlock from './blocks/ButtonsBlock'
import type { CalculatorBlockName } from 'state'

export const DRAG_TYPE = 'CALCULATOR_BLOCK'
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
