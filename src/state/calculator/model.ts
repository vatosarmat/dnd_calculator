export const calculatorDigitValues = [
  '7',
  '8',
  '9',
  '4',
  '5',
  '6',
  '1',
  '2',
  '3',
  '0',
] as const
export type CalculatorDigit = typeof calculatorDigitValues[number]

export const calculatorDigitExtValues = [...calculatorDigitValues, ',', '∓'] as const
export type CalculatorDigitExt = typeof calculatorDigitExtValues[number]

export const calculatorOperationValues = ['/', 'x', '-', '+'] as const
export type CalculatorOperation = typeof calculatorOperationValues[number]

export const calculatorControlValues = ['=', 'C'] as const
export type CalculatorControl = typeof calculatorControlValues[number]
