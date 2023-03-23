import { useEffect, FC, useContext } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { DispatchContext } from 'state/canvas'
import { CalculatorBlock, CalculatorBlockProps } from './CalculatorBlock'
import { DRAG_TYPE, DragItem } from './helpers'

type DraggableCalculatorBlockProps = CalculatorBlockProps & {
  type?: string
}

export const DraggableCalculatorBlock: FC<DraggableCalculatorBlockProps> = ({
  type = DRAG_TYPE,
  ...rest
}) => {
  const dispatch = useContext(DispatchContext)

  const [{ isDragging }, dragSource, dragPreview] = useDrag<
    DragItem,
    unknown,
    { isDragging: boolean }
  >(() => ({
    type,
    item: { calculatorBlockName: rest.content },
    collect: monitor => ({
      //this will be injected in some component
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        dispatch({ type: 'return', payload: { blockName: item.calculatorBlockName } })
      }
    },
  }))

  //clear browser default preview
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isDragging) {
    rest.shadow = false
    rest.transparency = 'high'
  }

  return <CalculatorBlock {...rest} cursor={'grab'} ref={dragSource} />
}
