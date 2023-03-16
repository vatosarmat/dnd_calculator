import { Reducer } from 'react'

import { CalculatorBlockName } from 'state'

export type State = CalculatorBlockName[]

export const initialState: State = []

export type Action =
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
