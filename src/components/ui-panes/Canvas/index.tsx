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
} from 'state/canvas'

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

  const onDropOnItem =
    (index: number) => (item: DragItem, hoverHalf: 'upper' | 'lover') => {
      const blockName = item.calculatorBlockName
      const from = canvasContent.indexOf(blockName)

      if (from === index) {
        return
      }

      let to: number
      if (from === -1 || from > index) {
        to = index + (hoverHalf === 'upper' ? 0 : 1)
      } else {
        to = index + (hoverHalf === 'upper' ? -1 : 0)
      }

      let action: Action
      if (from === -1) {
        action = {
          type: 'drop',
          payload: { blockName, to },
        }
      } else {
        action = {
          type: 'move',
          payload: { from, to },
        }
      }
      dispatch(action)
    }

  const onDropOnFiller = (item: DragItem) => {
    const blockName = item.calculatorBlockName
    const from = canvasContent.indexOf(blockName)

    let action: Action
    if (from === -1) {
      action = {
        type: 'drop',
        payload: { blockName },
      }
    } else {
      action = {
        type: 'move',
        payload: { from: from },
      }
    }
    dispatch(action)
  }

  const getHrPosItem =
    (index: number) => (item: DragItem, hoverHalf: 'upper' | 'lover') => {
      const notEmpty = canvasContent.length > 0
      const overItself = canvasContent[index] === item.calculatorBlockName
      const belowItself =
        index >= 1 &&
        canvasContent[index - 1] === item.calculatorBlockName &&
        hoverHalf === 'upper'
      const aboveItself =
        index < canvasContent.length - 1 &&
        canvasContent[index + 1] === item.calculatorBlockName &&
        hoverHalf === 'lover'

      if (notEmpty && (overItself || belowItself || aboveItself)) {
        return 'none'
      }

      return hoverHalf === 'upper' ? 'above' : 'below'
    }

  const getHrPosFiller = (item: DragItem, _hoverHalf: 'upper' | 'lover') => {
    if (
      canvasContent.length === 0 ||
      canvasContent[canvasContent.length - 1] === item.calculatorBlockName
    ) {
      return 'none'
    }

    return 'above'
  }

  return (
    <Shape $canvas $hoverDrop={isOver} ref={dropTarget}>
      {canvasContent.map((blockName, index) => {
        return (
          <DropAreaItem
            key={blockName}
            getHrPos={getHrPosItem(index)}
            onDrop={onDropOnItem(index)}
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
        <DropAreaItem getHrPos={getHrPosFiller} onDrop={onDropOnFiller} />
      )}
    </Shape>
  )
}

export default Canvas
