import { ReactNode, forwardRef, Ref, FC } from 'react'
import { useDrag } from 'react-dnd'
import clsx from 'clsx'

import classes from './Button.module.css'
import classes2 from './ButtonBlock.module.css'
import Draggable from '../Draggable'
import { DRAG_TYPE, DragItem } from 'common'

export type ButtonProps = {
  children?: string
  disabled?: boolean
  extraClasses?: string[] | string
  ref?: Ref<HTMLButtonElement>
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, extraClasses = [], ...rest }, ref) => {
    return (
      <button
        {...rest}
        className={clsx(classes.root, ...[extraClasses].flat().map(key => classes[key]))}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)

export type DraggableProps = {}

export default Button

type EqualButtonProps = Pick<ButtonProps, 'disabled'>

export const EqualButton = forwardRef<HTMLButtonElement, EqualButtonProps>(
  ({ disabled }: EqualButtonProps, ref) => (
    <Button ref={ref} disabled={disabled} extraClasses={'large'}>
      {'='}
    </Button>
  )
)

export const DraggableEqualButton = Draggable<DragItem>(DRAG_TYPE, {
  dragBlock: 'equal',
})(EqualButton)

export const OperationsBlock = forwardRef<HTMLDivElement>((props, ref) => {
  const ops = ['/', 'x', '-', '+']

  return (
    <div ref={ref} className={classes2.root}>
      {ops.map(op => (
        <Button key={op}>{op}</Button>
      ))}
    </div>
  )
})
export const DraggableOperationsBlock = Draggable<DragItem>(DRAG_TYPE, {
  dragBlock: 'operations',
})(OperationsBlock)

export const DigitsBlock = forwardRef<HTMLDivElement>((props, ref) => {
  const digits = Array(9)
    .fill(null)
    .map((_, key) => (key + 1).toString())
    .reverse()

  return (
    <div ref={ref} className={clsx(classes2.root, classes2.reverse)}>
      {[...digits, ',', '0'].map(d => (
        <Button key={d} extraClasses={d === '0' ? 'width-3' : 'width-2'}>
          {d}
        </Button>
      ))}
    </div>
  )
})
export const DraggableDigitsBlock = Draggable<DragItem>(DRAG_TYPE, {
  dragBlock: 'digits',
})(DigitsBlock)
