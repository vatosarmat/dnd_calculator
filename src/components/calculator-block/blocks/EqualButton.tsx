import { FC } from 'react'

import Button, { ButtonProps } from 'components/controls/Button'

type EqualButtonProps = Omit<ButtonProps, 'full' | 'primary' | 'children'>

//Button with fixed props: fill, primary, children
const EqualButton: FC<EqualButtonProps> = props => (
  <Button {...props} $full $primary>
    {'='}
  </Button>
)

export default EqualButton
