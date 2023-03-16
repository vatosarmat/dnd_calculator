import { useState, PropsWithChildren, FC, useRef, RefCallback, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import type { Identifier } from 'dnd-core'
import styled, { css } from 'styled-components'

import Hr, { HrProps } from './Hr'
import { DragItem, DRAG_TYPE } from 'components/calculator-block'
import { CalculatorBlockName } from 'state'

type DropAreaItemDivProps = {
  $grow?: boolean
}

const DropAreaItemDiv = styled.div<DropAreaItemDivProps>`
  position: relative;
  ${({ $grow, theme }) =>
    $grow &&
    css`
      flex-grow: 1;
    `}
`

type DropAreaItemProps = PropsWithChildren<{
  noHr?: boolean
  onDrop: (blockName: CalculatorBlockName, pos: 'above' | 'below') => void
}>

const DropAreaItem: FC<DropAreaItemProps> = ({ children, onDrop, noHr }) => {
  const dropAreaElementRef = useRef<HTMLDivElement | null>(null)
  const [hrPos, setHrPos] = useState<HrProps['$pos']>('none')
  const [{ handlerId, isHovering, item }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null; isHovering: boolean; item: CalculatorBlockName }
  >({
    accept: DRAG_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isHovering: monitor.canDrop() && monitor.isOver(),
        item: monitor.getItem(),
      }
    },
    hover(draggedItem: DragItem, monitor) {
      if (!dropAreaElementRef.current) {
        return
      }

      const dropAreaBoundingRect = dropAreaElementRef.current?.getBoundingClientRect()
      const dropAreaMiddleY = (dropAreaBoundingRect.bottom - dropAreaBoundingRect.top) / 2
      const draggedItemInViewportPos = monitor.getClientOffset()!
      const draggedItemInDropAreaPos =
        draggedItemInViewportPos.y - dropAreaBoundingRect.top

      setHrPos(draggedItemInDropAreaPos >= dropAreaMiddleY ? 'below' : 'above')
    },
    drop(item, monitor) {
      //actually it should never be 'none'
      onDrop(item.calculatorBlockName, hrPos === 'none' ? 'below' : hrPos)
    },
  })
  useEffect(() => {
    if (!isHovering) {
      setHrPos('none')
    }
  }, [isHovering])

  const callbackRef: RefCallback<HTMLDivElement> = el => {
    if (el) {
      dropAreaElementRef.current = el
      drop(el)
    }
  }

  if (children) {
    return (
      <DropAreaItemDiv ref={callbackRef}>
        {children}
        <Hr $pos={hrPos} />
      </DropAreaItemDiv>
    )
  }

  return (
    <DropAreaItemDiv ref={callbackRef} $grow>
      {!noHr && <Hr $pos={hrPos === 'below' ? 'above' : hrPos} />}
    </DropAreaItemDiv>
  )
}

export default DropAreaItem
