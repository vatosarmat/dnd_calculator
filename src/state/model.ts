export const calculatorBlockNameValues = [
  'display',
  'operations',
  'digits',
  'equal',
] as const
export type CalculatorBlockName = typeof calculatorBlockNameValues[number]
