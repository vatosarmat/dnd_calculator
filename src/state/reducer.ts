import { Reducer } from 'react'

import { CalculatorBlockName, calculatorBlockNameValues } from './model'

export type State = { canvasContent: CalculatorBlockName[] }

export const initialState: State = { canvasContent: [] }

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
      const { canvasContent } = state
      const { blockName, to } = payload

      let newCanvasContent
      if (typeof to === 'number') {
        const a = canvasContent.slice(0, to)
        const b = canvasContent.slice(to)
        newCanvasContent = [...a, blockName, ...b]
      } else {
        newCanvasContent = [...canvasContent, blockName]
      }

      return { canvasContent: newCanvasContent }
    }

    case 'move': {
      const { from, to } = payload
      if (from === to) {
        return state
      }

      const { canvasContent } = state
      let newCanvasContent
      if (from < to) {
        newCanvasContent = [
          ...canvasContent.slice(0, from),
          ...canvasContent.slice(from + 1, to),
          canvasContent[from],
          ...canvasContent.slice(to),
        ]
      } else {
        //to < from
        newCanvasContent = [
          ...canvasContent.slice(0, to),
          canvasContent[from],
          ...canvasContent.slice(to, from),
          ...canvasContent.slice(from + 1),
        ]
      }
      return { canvasContent: newCanvasContent }
    }

    case 'return': {
      const { canvasContent } = state
      return { canvasContent: canvasContent.filter(block => block !== payload.blockName) }
    }
  }
}

export const isCanvasFull = (state: State) =>
  state.canvasContent.length === calculatorBlockNameValues.length
