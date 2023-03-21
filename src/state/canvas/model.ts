export const calculatorBlockNameValues = [
  'display',
  'operations',
  'digits',
  'controls',
] as const
export type CalculatorBlockName = typeof calculatorBlockNameValues[number]
