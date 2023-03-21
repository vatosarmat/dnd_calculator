import { Reducer } from 'react'

import { CalculatorDigit } from '../model'

export type State = {
  integer: string
  fraction: string | null
  minus: boolean
}

export const initialState: State = {
  integer: '0',
  fraction: null,
  minus: false,
}

export type Action =
  | { type: 'digit'; payload: { digit: CalculatorDigit } }
  | { type: 'decimal_separator'; payload?: {} }
  | { type: 'sign'; payload?: {} }
  | { type: 'reset'; payload?: {} }

export const reducer: Reducer<State, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'reset': {
      return { ...initialState }
    }
    case 'digit': {
      const newState = { ...state }
      if (newState.fraction === null) {
        if (newState.integer === '0') {
          newState.integer = payload.digit
        } else {
          newState.integer += payload.digit
        }
      } else {
        newState.fraction += payload.digit
      }
      return newState
    }

    case 'decimal_separator': {
      //enter ,
      if (state.fraction === null) {
        return {
          ...state,
          fraction: '',
        }
      }

      //cancel , if no digits after
      if (state.fraction === '') {
        return {
          ...state,
          fraction: null,
        }
      }

      return state
    }

    case 'sign': {
      return { ...state, minus: !state.minus }
    }
  }
}
