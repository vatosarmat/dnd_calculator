import { useEffect, FC } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import styled, { css } from 'styled-components'

import { StyledTransient, styledTransient } from 'utils'

import {
  DRAG_TYPE,
  getCalculatorBlockComponent,
  CalculatorBlockName,
  DragItem,
} from './helpers'

type StyledBlockProps = {
  content: CalculatorBlockName
  shadow?: boolean
  opacity?: 0.5 | 0.7 | 1
}

const StyledBlock = styled.div<StyledTransient<StyledBlockProps>>`
  height: ${({ $content, theme: { layout } }) => layout.block.height[$content]};
  padding: ${({ theme }) => theme.spacing(0.5)}px;
  border-radius: 4px;
  opacity: ${({ $opacity }) => $opacity};

  ${({ $shadow }) =>
    $shadow &&
    css`
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
    `}
`

type CalculatorBlockProps = StyledBlockProps & {
  draggable?: boolean
  type?: string
  disabled?: boolean
}

const CalculatorBlock: FC<CalculatorBlockProps> = ({
  draggable,
  type = DRAG_TYPE,

  disabled,
  shadow,
  opacity = 1,

  content,
}) => {
  const [, dragSource, dragPreview] = useDrag<DragItem>(
    () => ({
      type,
      item: { calculatorBlockName: content },
      collect: monitor => ({
        //this will be injected in some component
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    []
  )

  //clear browser default preview
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  const Component = getCalculatorBlockComponent(content)

  const a = styledTransient({ shadow, opacity, content })

  return (
    <StyledBlock {...a} ref={draggable ? dragSource : undefined}>
      <Component disabled={disabled} />
    </StyledBlock>
  )
}

export default CalculatorBlock
