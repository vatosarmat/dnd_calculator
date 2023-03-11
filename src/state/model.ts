export const calculatorBlockNameValues = ['operations', 'digits', 'equal'] as const
export type CalculatorBlockName = typeof calculatorBlockNameValues[number]

export const uiPaneNameValues = ['palette', 'canvas'] as const
export type UiPaneName = typeof uiPaneNameValues[number]
