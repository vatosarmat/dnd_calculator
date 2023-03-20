import type { State } from './reducer'

export const inputValue = ({ integer, fraction, minus }: State): number => {
  const abs = parseFloat([integer, fraction].join('.'))
  return minus ? -abs : abs
}
