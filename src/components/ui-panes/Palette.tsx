import { useReducer, Reducer } from 'react'
import styled from 'styled-components'

import {
  CalculatorBlockName,
  calculatorBlockNameValues,
  CalculatorBlock,
  DraggableCalculatorBlock,
} from 'components/calculator-block'

export type PaletteProps = {}

const StyledBlock = styled.div<PaletteProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)}px;
`

type IsDropped = Record<CalculatorBlockName, boolean>

const initialState: IsDropped = { equal: false, digits: false, operations: false }

type Action =
  | { type: 'drop'; payload: CalculatorBlockName }
  | { type: 'return'; payload: CalculatorBlockName }

export const reducer: Reducer<IsDropped, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'drop': {
      return {
        ...state,
        [payload]: true,
      }
    }
    case 'return': {
      return {
        ...state,
        [payload]: false,
      }
    }
  }
}

const Palette: React.FC<PaletteProps> = () => {
  const [isDropped, dispatch] = useReducer(reducer, initialState)
  const onDidDrop = (blockName: CalculatorBlockName) =>
    dispatch({ type: 'drop', payload: blockName })

  return (
    <StyledBlock>
      {calculatorBlockNameValues.map(blockName => {
        const props = { key: blockName, disabled: true, content: blockName }
        return isDropped[blockName] ? (
          <CalculatorBlock {...props} opacity={0.5} />
        ) : (
          <DraggableCalculatorBlock {...props} shadow onDidDrop={onDidDrop} />
        )
      })}
    </StyledBlock>
  )
}

export default Palette
