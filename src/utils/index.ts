export type StyledTransient<T extends object> = {
  [K in keyof T as `$${K & string}`]: T[K]
}

export const styledTransient = <T extends object>(props: T): StyledTransient<T> =>
  Object.entries(props).reduce((ac, [k, v]) => {
    //@ts-expect-error
    ac[`$${k}`] = v
    return ac
  }, {} as StyledTransient<T>)
