import type { State } from './reducer'

export const numberValue = ({ integer, fraction, minus }: State): number => {
  const abs = parseFloat([integer, fraction].join('.'))
  return minus ? -abs : abs
}

export const stringValue = ({ integer, fraction, minus }: State): string => {
  let str
  if (fraction !== null) {
    str = `${integer}.${fraction}`
  } else {
    str = integer.toString()
  }
  return minus ? '-' + str : str
}
