import { FC, useContext, useReducer } from 'react'

import Shape from './Shape'
import { Display, Buttons, CalculatorBlock } from 'components/calculator-block'
import { StateContext as CanvasState } from 'state/canvas'
import * as input from 'state/calculator/input'
import type { State as InputState, Action as InputAction } from 'state/calculator/input'
import * as calc from 'state/calculator/core'
import type { State as CalcState } from 'state/calculator/core'
import type {
  CalculatorDigitExt,
  CalculatorControl,
  CalculatorOperation,
} from 'state/calculator/model'

const displayString = (calcState: CalcState, inputState: InputState): string => {
  if (calcState.mode === 'input') {
    return input.stringValue(inputState).toString()
  }

  return calcState.result!.toString()
}

const Calculator: FC = () => {
  const { canvasContent } = useContext(CanvasState)
  const [inputState, inputDispatch] = useReducer(input.reducer, input.initialState)
  const [calcState, calcDispatch] = useReducer(calc.reducer, calc.initialState)

  const onDigitButton = (digit: CalculatorDigitExt) => {
    if (calcState.mode === 'output') {
      inputDispatch({ type: 'reset' })
      calcDispatch({ type: 'input' })
    }

    let action: InputAction
    if (digit === '.') {
      action = { type: 'decimal_separator' }
    } else if (digit === '∓') {
      action = { type: 'sign' }
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
      calcDispatch({ type: 'equal', payload: { input: input.numberValue(inputState) } })
    }
  }

  const onOperationButton = (operation: CalculatorOperation) => {
    calcDispatch({
      type: 'operation',
      payload: { operation, input: input.numberValue(inputState) },
    })
  }

  return (
    <Shape>
      {canvasContent.map(block => {
        let blockChildren
        switch (block) {
          case 'display': {
            blockChildren = <Display>{displayString(calcState, inputState)}</Display>
            break
          }
          case 'operations': {
            blockChildren = <Buttons.Operations onClick={onOperationButton} />
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
