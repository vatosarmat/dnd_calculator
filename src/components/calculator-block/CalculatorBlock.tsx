import { useEffect, FC, forwardRef } from 'react'
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
  width: ${({ $content, theme: { layout } }) => layout.block.width};
  height: ${({ $content, theme: { layout } }) => layout.block.height[$content]};
  padding: ${({ theme }) => theme.spacing(0.5)}px;
  border-radius: 4px;
  background-color: ${({ theme: { palette } }) => palette.gray.white};
  opacity: ${({ $opacity }) => $opacity};

  ${({ $shadow }) =>
    $shadow &&
    css`
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
    `}
`

type CalculatorBlockProps = StyledBlockProps & {
  type?: string
  disabled?: boolean
}

export const CalculatorBlock = forwardRef<HTMLDivElement, CalculatorBlockProps>(
  (
    {
      type = DRAG_TYPE,

      disabled,
      shadow,
      opacity = 1,

      content,
    },
    ref
  ) => {
    const Component = getCalculatorBlockComponent(content)

    return (
      <StyledBlock
        {...styledTransient({
          opacity,
          shadow,
          content,
        })}
        ref={ref}
      >
        <Component disabled={disabled} />
      </StyledBlock>
    )
  }
)
type DraggableCalculatorBlockProps = CalculatorBlockProps & {
  type?: string
  onDidDrop: (blockName: CalculatorBlockName) => void
}

export const DraggableCalculatorBlock: FC<DraggableCalculatorBlockProps> = ({
  type = DRAG_TYPE,
  onDidDrop,
  ...rest
}) => {
  const [collected, dragSource, dragPreview] = useDrag<
    DragItem,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      type,
      item: { calculatorBlockName: rest.content },
      end: (item, monitor) => {
        if (monitor.didDrop()) {
          onDidDrop(rest.content)
        }
      },
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

  return <CalculatorBlock {...rest} ref={dragSource} />
}
