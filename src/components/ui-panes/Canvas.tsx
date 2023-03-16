import {
  useReducer,
  Reducer,
  useContext,
  useState,
  PropsWithChildren,
  FC,
  useRef,
  RefCallback,
  useEffect,
} from 'react'
import { useDrop } from 'react-dnd'
import type { Identifier } from 'dnd-core'
import styled, { css } from 'styled-components'

import {
  DraggableCalculatorBlock,
  DragItem,
  DRAG_TYPE,
} from 'components/calculator-block'
import { CalculatorBlockName, DispatchContext, calculatorBlockNameValues } from 'state'

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

type HrProps = {
  $pos: 'none' | 'above' | 'below'
}

const Hr = styled.div<HrProps>`
  width: ${({ theme: { layout } }) => layout.block.width + 4}px;
  height: 1px;
  position: absolute;
  left: -2px;
  z-index: 100;
  background-color: ${({ theme }) => theme.palette.primary};

  ${({ $pos }) =>
    $pos === 'above'
      ? css`
          top: 0;
        `
      : $pos === 'below'
      ? css`
          bottom: -1px;
        `
      : css`
          visibility: hidden;
        `}

  &::before {
    content: '';
    width: 4px;
    height: 4px;
    position: absolute;
    left: 0;
    top: -1.5px;
    z-index: 101;
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.palette.primary};
  }

  &::after {
    content: '';
    width: 4px;
    height: 4px;
    position: absolute;
    right: 0;
    top: -1.5px;
    z-index: 101;
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.palette.primary};
  }
`

Hr.defaultProps = {
  $pos: 'none',
}

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

type State = CalculatorBlockName[]

const initialState: State = []

type Action =
  | {
      type: 'drop'
      payload: { blockName: CalculatorBlockName; to?: number }
    }
  | {
      type: 'return'
      payload: { blockName: CalculatorBlockName }
    }
  | {
      type: 'move'
      payload: {
        from: number
        to: number
      }
    }

export const reducer: Reducer<State, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'drop': {
      const { blockName, to } = payload
      if (typeof to === 'number') {
        const a = state.slice(0, to)
        const b = state.slice(to)
        return [...a, blockName, ...b]
      }
      return [...state, blockName]
    }
    case 'move': {
      const { from, to } = payload
      if (from === to) {
        return state
      }

      if (from < to) {
        return [
          ...state.slice(0, from),
          ...state.slice(from + 1, to),
          state[from],
          ...state.slice(to),
        ]
      }

      //to < from
      return [
        ...state.slice(0, to),
        state[from],
        ...state.slice(to, from),
        ...state.slice(from + 1),
      ]
    }
    case 'return': {
      return state.filter(block => block !== payload.blockName)
    }
  }
}

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
