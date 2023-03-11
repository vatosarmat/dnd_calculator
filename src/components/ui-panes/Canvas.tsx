import { useReducer, Reducer } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

import {
  CalculatorBlock,
  CalculatorBlockName,
  DragItem,
  DRAG_TYPE,
} from 'components/calculator-block'

const StyledBlock = styled.div`
  display: flex;
  flex-direction: column;
  outline-width: 2px;
  outline-style: dashed;
  outline-color: ${({ theme: { palette } }) => palette.gray.canvasBorder};
  outline-offset: -2px;
  border-radius: ${({ theme: { decoration } }) => decoration.buttonBorderRadius};
`

const Item = styled.div<{ order: number }>`
  order: ${({ order }) => order};
`

type State = {
  nextPos: number
  blockPos: Record<CalculatorBlockName, number | null>
}

const initialState: State = {
  nextPos: 1,
  blockPos: {
    operations: null,
    digits: null,
    equal: null,
  },
}

type Action =
  | {
      type: 'drop'
      payload: DragItem
    }
  | {
      type: 'return'
      payload: DragItem
    }

export const reducer: Reducer<State, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'drop': {
      return {
        ...state,
        blockPos: {
          ...state.blockPos,
          [payload.calculatorBlockName]: state.nextPos + 1,
        },
        nextPos: state.nextPos + 1,
      }
    }
    case 'return': {
      return {
        ...state,
        blockPos: {
          ...state.blockPos,
          [payload.calculatorBlockName]: null,
        },
        nextPos: state.nextPos - 1,
      }
    }
  }
}

const Canvas: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { blockPos } = state
  const [, dropTarget] = useDrop<DragItem>(
    () => ({
      accept: DRAG_TYPE,
      drop: (item: DragItem) => {
        dispatch({ type: 'drop', payload: item })
      },
      collect: monitor => ({
        /* isOver: monitor.isOver(), */
        /* canDrop: monitor.canDrop(), */
      }),
    }),
    []
  )

  return (
    <StyledBlock ref={dropTarget}>
      {(['operations', 'digits', 'equal'] as const).map(blockName => {
        const pos = blockPos[blockName]
        return (
          pos && (
            <Item key={blockName} order={pos}>
              <CalculatorBlock disabled content={blockName} />
            </Item>
          )
        )
      })}
    </StyledBlock>
  )
}

export default Canvas
