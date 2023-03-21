import { Reducer } from 'react'

import { CalculatorOperation } from '../model'

export type State = {
  mode: 'input' | 'output'
  register: number | null
  operation: CalculatorOperation | null
  result: number | null
}

export const initialState: State = {
  mode: 'input',
  register: null,
  operation: null,
  result: null,
}

type ModeAction =
  | { type: 'operation'; payload: { operation: CalculatorOperation; operand: number } }
  | { type: 'equal'; payload: { operand: number } }

export type Action = ModeAction | { type: 'reset'; payload?: {} }

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
  if (action.type === 'reset') {
    return { ...initialState }
  }
  return modeReducer[state.mode](state, action)
}
