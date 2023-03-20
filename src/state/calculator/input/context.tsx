import { Dispatch, createContext, FC, useReducer, PropsWithChildren } from 'react'

import { reducer, initialState, Action } from './reducer'

export const StateContext = createContext(initialState)
export const DispatchContext = createContext<Dispatch<Action>>(_ => {})

export const StateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}
