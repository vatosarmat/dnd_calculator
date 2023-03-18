import { useContext } from 'react'
import { useDrop } from 'react-dnd'

import DropAreaItem from './DropAreaItem'
import Shape from 'components/ui-panes/Calculator/Shape'
import {
  DraggableCalculatorBlock,
  DragItem,
  DRAG_TYPE,
} from 'components/calculator-block'
import {
  Action,
  CalculatorBlockName,
  StateContext,
  DispatchContext,
  calculatorBlockNameValues,
} from 'state'

const Canvas: React.FC = () => {
  const { canvasContent } = useContext(StateContext)
  const dispatch = useContext(DispatchContext)
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
    dispatch({ type: 'return', payload: { blockName } })
  }

  const onDrop = (index?: number) => (item: DragItem, pos: 'above' | 'below') => {
    const to = typeof index === 'number' ? index + (pos === 'above' ? 0 : 1) : undefined
    const blockName = item.calculatorBlockName
    const blockPos = canvasContent.indexOf(blockName)

    let action: Action
    if (blockPos === -1 || to === undefined) {
      action = {
        type: 'drop',
        payload: { blockName, to },
      }
    } else {
      action = {
        type: 'move',
        payload: { from: blockPos, to },
      }
    }
    dispatch(action)
  }

  const correctHrPos = (index: number) => (item: DragItem, pos: 'above' | 'below') => {
    const notEmpty = canvasContent.length > 0
    const overItself = canvasContent[index] === item.calculatorBlockName
    const belowItself =
      index >= 1 &&
      canvasContent[index - 1] === item.calculatorBlockName &&
      pos === 'above'
    const aboveItself =
      index < canvasContent.length - 1 &&
      canvasContent[index + 1] === item.calculatorBlockName &&
      pos === 'below'

    if (notEmpty && (overItself || belowItself || aboveItself)) {
      return 'none'
    }

    return pos
  }

  return (
    <Shape $canvas $hoverDrop={isOver} ref={dropTarget}>
      {canvasContent.map((blockName, index) => {
        return (
          <DropAreaItem
            key={blockName}
            correctHrPos={correctHrPos(index)}
            onDrop={onDrop(index)}
          >
            <DraggableCalculatorBlock
              key={blockName}
              disabled
              content={blockName}
              onDoubleClick={onDoubleClick}
            />
          </DropAreaItem>
        )
      })}
      {canvasContent.length < calculatorBlockNameValues.length && (
        <DropAreaItem
          correctHrPos={() => (canvasContent.length === 0 ? 'none' : 'above')}
          onDrop={onDrop()}
        />
      )}
    </Shape>
  )
}

export default Canvas
