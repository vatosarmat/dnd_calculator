import { FC } from 'react'
import { useDragLayer } from 'react-dnd'
import styled from 'styled-components'

import { CalculatorBlock, DragItem, DRAG_TYPE } from 'components/calculator-block'

const Layer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const PreviewLayer: FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
    type: DRAG_TYPE,
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
    <Layer>
      <div style={style}>
        <CalculatorBlock
          disabled
          shadow
          transparency={'low'}
          content={item.calculatorBlockName}
        />
      </div>
    </Layer>
  )
}

export default PreviewLayer
