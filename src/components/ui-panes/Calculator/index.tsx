import { FC, useContext, useReducer } from 'react'

import Shape from './Shape'
import { Display, Buttons, CalculatorBlock } from 'components/calculator-block'
import { StateContext as CanvasState } from 'state/canvas'
import * as input from 'state/calculator/input'
import type { State as InputState, Action as InputAction } from 'state/calculator/input'
import * as calc from 'state/calculator/core'
import type { State as CalcState, Action as CalcAction } from 'state/calculator/core'
import type { CalculatorDigitExt, CalculatorControl } from 'state/calculator/model'

const displayString = (state: InputState): string => {
  return input.inputValue(state).toString()
}

const Calculator: FC = () => {
  const { canvasContent } = useContext(CanvasState)
  const [inputState, inputDispatch] = useReducer(input.reducer, input.initialState)
  const [calcState, calcDispatch] = useReducer(calc.reducer, calc.initialState)

  const onDigitButton = (digit: CalculatorDigitExt) => {
    let action: InputAction
    if (digit === ',') {
      action = { type: 'decimal_separator' }
    } else {
      action = { type: 'digit', payload: { digit } }
    }
    inputDispatch(action)
  }

  const onControlButton = (control: CalculatorControl) => {
    if (control === 'C') {
      const reset = { type: 'reset' } as const
      inputDispatch(reset)
      calcDispatch(reset)
    } else {
      //control === '='
    }
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
          case 'controls': {
            blockChildren = <Buttons.Control onClick={onControlButton} />
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
