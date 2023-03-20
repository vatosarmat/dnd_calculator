import type { FC, Key } from 'react'

import Button, { ButtonProps } from 'components/controls/Button'
import ButtonBlock, { ButtonBlockProps } from 'components/controls/ButtonBlock'
import {
  CalculatorDigitExt,
  calculatorDigitExtValues,
  CalculatorOperation,
  calculatorOperationValues,
} from 'state/calculator/model'

type EqualButtonProps = Omit<ButtonProps, '$full' | '$primary' | 'children'>

//Button with fixed props: fill, primary, children
const Equal: FC<EqualButtonProps> = props => (
  <Button {...props} $full $primary>
    {'='}
  </Button>
)

type CalculatorButtonBlockProps<V extends Key> = Omit<
  ButtonBlockProps<V>,
  '$cols' | '$span' | 'values'
>

const Digits: FC<CalculatorButtonBlockProps<CalculatorDigitExt | ','>> = props => {
  return (
    <ButtonBlock {...props} values={calculatorDigitExtValues} $cols={3} $span={[10, 2]} />
  )
}

const Operations: FC<CalculatorButtonBlockProps<CalculatorOperation>> = props => {
  return <ButtonBlock {...props} values={calculatorOperationValues} $cols={4} />
}

const exp = {
  Equal,
  Digits,
  Operations,
}

export default exp
