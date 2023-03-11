import type { Reducer } from 'react'
import type { CalculatorBlockName, UiPaneName } from './model'

export type State = {
  blockLocation: Record<CalculatorBlockName, UiPaneName>
}

export const initialState: State = {
  blockLocation: {
    operations: 'palette',
    digits: 'palette',
    equal: 'palette',
  },
}

export type Action =
  | { type: 'drop'; payload: { blockName: CalculatorBlockName } }
  | { type: 'return'; payload: { blockName: CalculatorBlockName } }

export const reducer: Reducer<State, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'drop': {
      return {
        ...state,
        blockLocation: {
          ...state.blockLocation,
          [payload.blockName]: 'canvas',
        },
      }
    }
    case 'return': {
      return {
        ...state,
        blockLocation: {
          ...state.blockLocation,
          [payload.blockName]: 'palette',
        },
      }
    }
  }
}
