import { useEffect, FC } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { CalculatorBlock, CalculatorBlockProps } from './CalculatorBlock'
import { DRAG_TYPE, DragItem } from './helpers'

type DraggableCalculatorBlockProps = CalculatorBlockProps & {
  type?: string
}

export const DraggableCalculatorBlock: FC<DraggableCalculatorBlockProps> = ({
  type = DRAG_TYPE,
  ...rest
}) => {
  const [, dragSource, dragPreview] = useDrag<DragItem, unknown, { isDragging: boolean }>(
    () => ({
      type,
      item: { calculatorBlockName: rest.content },
      collect: monitor => ({
        //this will be injected in some component
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    []
  )

  //clear browser default preview
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  return <CalculatorBlock {...rest} ref={dragSource} />
}
