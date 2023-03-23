import { useState, PropsWithChildren, FC, useRef, RefCallback, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import type { Identifier } from 'dnd-core'
import styled, { css } from 'styled-components'

import Hr, { HrProps } from './Hr'
import { DragItem, DRAG_TYPE } from 'components/calculator-block'

type DivProps = {
  $grow?: boolean
}

const Div = styled.div<DivProps>`
  position: relative;
  ${({ $grow }) =>
    $grow &&
    css`
      flex-grow: 1;
    `}
`

type HoverHalf = 'upper' | 'lover'

type DropAreaItemProps = PropsWithChildren<{
  getHrPos?: (item: DragItem, hoverHalf: HoverHalf) => HrProps['$pos']
  onDrop: (item: DragItem, hoverHalf: HoverHalf) => void
}>

const DropAreaItem: FC<DropAreaItemProps> = ({ children, onDrop, getHrPos }) => {
  const dropAreaElementRef = useRef<HTMLDivElement | null>(null)
  const hoverHalf = useRef<HoverHalf>('upper')
  const [hrPos, setHrPos] = useState<HrProps['$pos']>('none')
  const [{ isOver }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null; isOver: boolean }
  >({
    accept: DRAG_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
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

      hoverHalf.current = draggedItemInDropAreaPos >= dropAreaMiddleY ? 'lover' : 'upper'
      if (getHrPos) {
        setHrPos(getHrPos(draggedItem, hoverHalf.current))
      }
    },
    drop(item, _monitor) {
      //actually it should never be 'none'
      onDrop(item, hoverHalf.current)
    },
  })

  useEffect(() => {
    if (!isOver) {
      setHrPos('none')
    }
  }, [isOver])

  const callbackRef: RefCallback<HTMLDivElement> = el => {
    if (el) {
      dropAreaElementRef.current = el
      drop(el)
    }
  }

  return (
    <Div ref={callbackRef} $grow={!children}>
      {children}
      <Hr $pos={hrPos} />
    </Div>
  )
}

export default DropAreaItem
