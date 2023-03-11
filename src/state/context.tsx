import {
  Dispatch,
  createContext,
  FC,
  useEffect,
  useReducer,
  PropsWithChildren,
} from 'react'

import { reducer, initialState, Action, State } from './reducer'

export const StateContext = createContext(initialState)
export const DispatchContext = createContext<Dispatch<Action>>(a => {})

type StateProviderProps = PropsWithChildren<{
  storedState?: State
}>
const stateKey = process.env.REACT_APP_BASENAME!

export const StateProvider: FC<StateProviderProps> = ({ storedState, children }) => {
  const [state, dispatch] = useReducer(reducer, storedState ?? initialState)
  useEffect(() => {
    localStorage.setItem(stateKey, JSON.stringify(state))
  }, [state])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}
