import { FC } from 'react'
import { useDragLayer } from 'react-dnd'
import styled from 'styled-components'

import { CalculatorBlock, DragItem } from 'components/calculator-block'

const StyledBlock = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const PreviewLayer: FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem<DragItem>(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  if (!isDragging) {
    return null
  }

  const style = currentOffset
    ? {
        display: 'inline-block',
        transform: `translate(${currentOffset.x}px,${currentOffset.y}px)`,
      }
    : { display: 'none' }

  return (
    <StyledBlock>
      <div style={style}>
        <CalculatorBlock
          disabled
          shadow
          opacity={0.7}
          content={item.calculatorBlockName}
        />
      </div>
    </StyledBlock>
  )
}

export default PreviewLayer
