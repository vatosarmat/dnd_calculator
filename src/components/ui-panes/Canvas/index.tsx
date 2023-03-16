import { useReducer, useContext } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

import DropAreaItem from './DropAreaItem'
import { reducer, initialState } from './state'
import {
  DraggableCalculatorBlock,
  DragItem,
  DRAG_TYPE,
} from 'components/calculator-block'
import { CalculatorBlockName, DispatchContext, calculatorBlockNameValues } from 'state'

type CanvasDivProps = {
  $hoverDrop?: boolean
}

const CanvasDiv = styled.div<CanvasDivProps>`
  height: ${({ theme }) => {
    const { height } = theme.layout.block
    const gap = theme.spacing()
    return Object.values(height).reduce((ac, v) => ac + v + gap, 0) - gap
  }}px;
  display: flex;
  flex-direction: column;
  border: 2px dashed ${({ theme: { palette } }) => palette.gray.canvasBorder};
  border-radius: ${({ theme: { decoration } }) => decoration.buttonBorderRadius}px;
  padding: 3px;
  box-sizing: content-box;
  position: relative;
  top: -5px;

  background-color: ${({ $hoverDrop, theme: { palette } }) =>
    $hoverDrop ? palette.sky : 'transparent'};
`

const Canvas: React.FC = () => {
  const dispatch = useContext(DispatchContext)
  const [blocks, localDispatch] = useReducer(reducer, initialState)
  const [{ isOver }, dropTarget] = useDrop<DragItem, unknown, { isOver: boolean }>(
    () => ({
      accept: DRAG_TYPE,
      collect: monitor => {
        return {
          isOver: monitor.isOver(),
        }
      },
    })
  )

  const onDoubleClick = (blockName: CalculatorBlockName) => {
    localDispatch({ type: 'return', payload: { blockName } })
    dispatch({ type: 'return', payload: { blockName } })
  }

  const onDrop =
    (index?: number) => (blockName: CalculatorBlockName, pos: 'above' | 'below') => {
      const to = typeof index === 'number' ? index + (pos === 'above' ? 0 : 1) : undefined
      console.log(to)
      const blockPos = blocks.indexOf(blockName)

      if (blockPos === -1 || to === undefined) {
        localDispatch({
          type: 'drop',
          payload: { blockName, to },
        })
        dispatch({
          type: 'drop',
          payload: {
            blockName,
          },
        })
      } else {
        localDispatch({
          type: 'move',
          payload: { from: blockPos, to },
        })
      }
    }

  return (
    <CanvasDiv $hoverDrop={isOver} ref={dropTarget}>
      {blocks.map((blockName, index) => {
        return (
          <DropAreaItem key={blockName} onDrop={onDrop(index)}>
            <DraggableCalculatorBlock
              transparent
              key={blockName}
              disabled
              content={blockName}
              onDoubleClick={onDoubleClick}
            />
          </DropAreaItem>
        )
      })}
      {blocks.length < calculatorBlockNameValues.length && (
        <DropAreaItem noHr={blocks.length === 0} onDrop={onDrop()} />
      )}
    </CanvasDiv>
  )
}

export default Canvas
