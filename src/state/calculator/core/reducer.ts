import { Reducer } from 'react'

import { CalculatorOperation } from '../model'

export type State = {
  mode: 'input' | 'output'
  operation: CalculatorOperation | null
  //last input and last result
  input: number | null
  result: number | null
}

export const initialState: State = {
  mode: 'input',
  operation: null,
  input: null,
  result: null,
}

type ModeAction =
  | { type: 'operation'; payload: { operation: CalculatorOperation; input: number } }
  | { type: 'equal'; payload: { input: number } }

export type Action =
  | ModeAction
  | { type: 'reset'; payload?: {} }
  | { type: 'input'; payload?: {} }

const operationExec: Record<CalculatorOperation, (a: number, b: number) => number> = {
  '/': (a, b) => a / b,
  x: (a, b) => a * b,
  '-': (a, b) => a - b,
  '+': (a, b) => a + b,
}

const modeReducer = {
  input: (state: State, { payload, type }: ModeAction): State => {
    switch (type) {
      case 'operation': {
        let result

        if (state.operation) {
          result = operationExec[state.operation](state.result!, payload.input)
        } else {
          result = payload.input
        }

        return {
          ...state,
          mode: 'output',
          operation: payload.operation,
          input: payload.input,
          result,
        }
      }

      case 'equal': {
        if (!state.operation) {
          return state
        }

        const result = operationExec[state.operation!](state.result!, payload.input)

        return {
          ...state,
          mode: 'output',
          input: payload.input,
          result,
        }
      }
    }
  },

  output: (state: State, { payload, type }: ModeAction): State => {
    switch (type) {
      case 'operation': {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      case 'equal': {
        return {
          ...state,
          result: operationExec[state.operation!](state.result!, state.input!),
        }
      }
    }
  },
}

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'reset':
      return { ...initialState }
    case 'input':
      return { ...state, mode: 'input' }
  }

  return modeReducer[state.mode](state, action)
}
