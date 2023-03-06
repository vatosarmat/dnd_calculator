import { useReducer, Reducer } from 'react'
import { useDrop } from 'react-dnd'

import classes from './Canvas.module.css'
import { DRAG_TYPE } from './Draggable'
import Button, { EqualButton, OperationsBlock, DigitsBlock } from './controls/Button'

export type CanvasProps = {
  content?: string
}

type Block = 'operations' | 'digits' | 'equal'

type State = {
  nextPos: number
  blockPos: Record<Block, number | null>
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
      payload: Block
    }
  | {
      type: 'return'
      payload: Block
    }

export const reducer: Reducer<State, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'drop': {
      return {
        ...state,
        blockPos: {
          ...state.blockPos,
          [payload]: state.nextPos + 1,
        },
        nextPos: state.nextPos + 1,
      }
    }
    case 'return': {
      return {
        ...state,
        blockPos: {
          ...state.blockPos,
          [payload]: null,
        },
        nextPos: state.nextPos - 1,
      }
    }
  }
}

const Canvas: React.FC<CanvasProps> = ({ content = '' }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { blockPos } = state
  /* const [{ isOver, canDrop }, drop] = useDrop( */
  /*   () => ({ */
  /*     accept: DRAG_TYPE, */
  /*     //called when item dropped */
  /*     //what we dropped and where? */
  /*     drop: () => game.moveKnight(x, y), */
  /*     collect: monitor => ({ */
  /*       isOver: !!monitor.isOver(), */
  /*       canDrop: !!monitor.canDrop(), */
  /*     }), */
  /*   }), */
  /*   [game] */
  /* ) */

  return (
    <div className={classes.root}>
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
