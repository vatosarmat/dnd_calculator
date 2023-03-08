import { useReducer, Reducer } from 'react'
import { useDrop } from 'react-dnd'

import classes from './Canvas.module.css'
import { DRAG_TYPE, DragBlockName, DragItem } from 'common'
import Button, { EqualButton, OperationsBlock, DigitsBlock } from './controls/Button'

export type CanvasProps = {
  content?: string
}

type State = {
  nextPos: number
  blockPos: Record<DragBlockName, number | null>
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
          [payload.dragBlockName]: state.nextPos + 1,
        },
        nextPos: state.nextPos + 1,
      }
    }
    case 'return': {
      return {
        ...state,
        blockPos: {
          ...state.blockPos,
          [payload.dragBlockName]: null,
        },
        nextPos: state.nextPos - 1,
      }
    }
  }
}

const Canvas: React.FC<CanvasProps> = ({ content = '' }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { blockPos } = state
  const [collected, dropTarget] = useDrop(
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
    <div ref={dropTarget} className={classes.root}>
      {blockPos.operations && (
        <div className={classes[`order-${blockPos.operations}`]}>
          <OperationsBlock />
        </div>
      )}
      {blockPos.digits && (
        <div className={classes[`order-${blockPos.digits}`]}>
          <DigitsBlock />
        </div>
      )}
      {blockPos.equal && (
        <div className={classes[`order-${blockPos.equal}`]}>
          <EqualButton />
        </div>
      )}
    </div>
  )
}

export default Canvas
