import { FC, useContext, useReducer } from 'react'

import Shape from './Shape'
import { Display, Buttons, CalculatorBlock } from 'components/calculator-block'
import { StateContext as CanvasState } from 'state/canvas'
import * as input from 'state/calculator/input'
import type { State, Action as InputAction } from 'state/calculator/input'
import type { CalculatorDigitExt } from 'state/calculator/model'

const displayString = (state: State): string => {
  return input.inputValue(state).toString()
}

const Calculator: FC = () => {
  const { canvasContent } = useContext(CanvasState)
  const [inputState, inputDispatch] = useReducer(input.reducer, input.initialState)

  const onDigitButton = (digit: CalculatorDigitExt) => {
    let action: InputAction
    if (digit === ',') {
      action = { type: 'decimal_separator' }
    } else {
      action = { type: 'digit', payload: { digit } }
    }
    inputDispatch(action)
  }

  return (
    <Shape>
      {canvasContent.map(block => {
        let blockChildren
        switch (block) {
          case 'display': {
            blockChildren = <Display>{displayString(inputState)}</Display>
            break
          }
          case 'operations': {
            blockChildren = <Buttons.Operations />
            break
          }
          case 'digits': {
            blockChildren = <Buttons.Digits onClick={onDigitButton} />
            break
          }
          case 'equal': {
            blockChildren = <Buttons.Equal />
            break
          }
        }
        return (
          <CalculatorBlock content={block} key={block}>
            {blockChildren}
          </CalculatorBlock>
        )
      })}
    </Shape>
  )
}

export default Calculator
