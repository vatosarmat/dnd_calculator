import { Reducer } from 'react'

import { CalculatorOperation } from '../model'

export type State = {
  mode: 'input' | 'output'
  register: number | null
  operation: CalculatorOperation | null
  result: number | null
}

// const selectors = {
//   displayNumber: ({ input: { integer, fraction, minus } }: State): number => {
//     const abs = parseFloat([integer, fraction].join('.'))
//     return minus ? -abs : abs
//   },
// }

export const initialState: State = {
  mode: 'input',
  register: null,
  operation: null,
  result: null,
}

export type Action =
  | { type: 'operation'; payload: { operation: CalculatorOperation; operand: number } }
  | { type: 'equal'; payload: { operand: number } }

const operationExec: Record<CalculatorOperation, (a: number, b: number) => number> = {
  '/': (a, b) => a / b,
  x: (a, b) => a * b,
  '-': (a, b) => a - b,
  '+': (a, b) => a + b,
}

const modeReducer = {
  input: (state: State, { payload, type }: Action): State => {
    switch (type) {
      case 'operation': {
        let result
        if (state.register) {
          result = operationExec[payload.operation](state.register, payload.operand)
        } else {
          result = payload.operand
        }

        return {
          ...state,
          mode: 'output',
          operation: payload.operation,
          register: payload.operand,
          result,
        }
      }

      case 'equal': {
        if (!state.operation) {
          return state
        }

        const result = operationExec[state.operation!](
          state.register ?? payload.operand,
          payload.operand
        )

        return {
          ...state,
          mode: 'output',
          result,
        }
      }
    }
  },

  output: (state: State, { payload, type }: Action): State => {
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
          result: operationExec[state.operation!](
            state.register ?? payload.operand,
            payload.operand
          ),
        }
      }
    }
  },
}

export const reducer: Reducer<State, Action> = (state, action) => {
  return modeReducer[state.mode](state, action)
}
