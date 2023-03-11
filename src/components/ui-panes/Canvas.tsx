import { useReducer, Reducer, useContext } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

import { CalculatorBlock, DragItem, DRAG_TYPE } from 'components/calculator-block'
import { CalculatorBlockName, DispatchContext } from 'state'

const StyledBlock = styled.div`
  display: flex;
  flex-direction: column;
  outline-width: 2px;
  outline-style: dashed;
  outline-color: ${({ theme: { palette } }) => palette.gray.canvasBorder};
  outline-offset: -2px;
  border-radius: ${({ theme: { decoration } }) => decoration.buttonBorderRadius};
`

const Item = styled.div<{ $order: number }>`
  order: ${({ $order }) => $order};
`

type State = CalculatorBlockName[]

const initialState: State = []

type Action =
  | {
      type: 'drop'
      payload: CalculatorBlockName
    }
  | {
      type: 'return'
      payload: CalculatorBlockName
    }

export const reducer: Reducer<State, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'drop': {
      return [...state, payload]
    }
    case 'return': {
      return state.filter(block => block !== payload)
    }
  }
}

const Canvas: React.FC = () => {
  const dispatch = useContext(DispatchContext)
  const [blocks, localDispatch] = useReducer(reducer, initialState)
  const [, dropTarget] = useDrop<DragItem>(
    () => ({
      accept: DRAG_TYPE,
      drop: (item: DragItem) => {
        localDispatch({ type: 'drop', payload: item.calculatorBlockName })
        dispatch({
          type: 'drop',
          payload: {
            blockName: item.calculatorBlockName,
          },
        })
      },
      collect: monitor => ({
        /* isOver: monitor.isOver(), */
        /* canDrop: monitor.canDrop(), */
      }),
    }),
    []
  )

  const onDoubleClick = (blockName: CalculatorBlockName) => {
    localDispatch({ type: 'return', payload: blockName })
    dispatch({ type: 'return', payload: { blockName } })
  }

  return (
    <StyledBlock ref={dropTarget}>
      {blocks.map((blockName, pos) => {
        return (
          <Item key={blockName} $order={pos + 1}>
            <CalculatorBlock disabled content={blockName} onDoubleClick={onDoubleClick} />
          </Item>
        )
      })}
    </StyledBlock>
  )
}

export default Canvas
