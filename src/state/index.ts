import type { Reducer, Dispatch } from 'react'
import { createContext } from 'react'

// export const initialState: State = {
//   dragged: null,
//   blocks: {
//     display: 'on_palette',
//     operations: 'on_palette',
//     digits: 'on_palette',
//     equal: 'on_palette',
//   },
// }
//
// type Action =
//   | { type: 'drag'; payload: Block }
//   | { type: 'drop' }
//   | { type: 'return'; payload: Block }
//
// export const reducer: Reducer<State, Action> = (state, { type, payload }) => {
//   switch (type) {
//     case 'drag': {
//       return {
//         ...state,
//         blocks: {
//           ...state.blocks,
//           [payload]: 'dragged',
//         },
//       }
//     }
//     case 'drop': {
//       return {
//         ...state,
//         blocks: {
//           ...state.blocks,
//           payload: 'on_canvas',
//         },
//       }
//     }
//     case 'return': {
//       return {
//         ...state,
//         blocks: {
//           ...state.blocks,
//           payload: 'on_canvas',
//         },
//       }
//     }
//   }
// }
//
// export const StateContext = createContext(initialState)
// export const DispatchContext = createContext<Dispatch<Action>>(a => {})
