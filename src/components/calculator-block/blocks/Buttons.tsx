import type { FC, Key } from 'react'

import ButtonBlock, {
  ButtonBlockProps,
  ButtonItem,
} from 'components/controls/ButtonBlock'
import {
  CalculatorDigitExt,
  calculatorDigitExtValues,
  CalculatorOperation,
  calculatorOperationValues,
  CalculatorControl,
} from 'state/calculator/model'

type CalculatorButtonBlockProps<V extends Key> = Omit<
  ButtonBlockProps<V>,
  '$cols' | '$span' | 'items'
>

const items: ButtonItem<CalculatorControl>[] = [
  {
    value: '=',
    props: {
      $color: 'primary',
    },
  },
  { value: 'C', props: { $color: 'secondary' } },
]

const Control: FC<CalculatorButtonBlockProps<CalculatorControl>> = props => {
  return <ButtonBlock {...props} items={items} $cols={3} $span={[1, 2]} />
}

const Digits: FC<CalculatorButtonBlockProps<CalculatorDigitExt>> = props => {
  return (
    <ButtonBlock {...props} items={calculatorDigitExtValues} $cols={3} $span={[10, 2]} />
  )
}

const Operations: FC<CalculatorButtonBlockProps<CalculatorOperation>> = props => {
  return <ButtonBlock {...props} items={calculatorOperationValues} $cols={4} />
}

const exp = {
  Control,
  Digits,
  Operations,
}

export default exp
