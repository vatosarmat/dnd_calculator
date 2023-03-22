import type { State } from './reducer'

export const numberValue = ({ integer, fraction, minus }: State): number => {
  const abs = parseFloat([integer, fraction].join('.'))
  return minus ? -abs : abs
}

const toChunkedString = (num: string, chunkLen = 3, sep = ' '): string => {
  if (num.length < chunkLen) {
    return num
  }

  const prefix = num.slice(0, num.length % chunkLen)
  let ret = ''
  for (let i = prefix.length; i < num.length; i += chunkLen) {
    ret += sep + num.slice(i, i + chunkLen)
  }

  if (prefix.length === 0) {
    return ret.slice(sep.length)
  }

  return prefix + ret
}

export const stringValue = ({ integer, fraction, minus }: State): string => {
  let str

  const intStr = toChunkedString(integer)

  if (fraction !== null) {
    const fracStr = toChunkedString(fraction)
    str = `${intStr}.${fracStr}`
  } else {
    str = intStr
  }
  return minus ? '-' + str : str
}
