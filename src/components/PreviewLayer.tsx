import { FC } from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'

import { EqualButton, OperationsBlock, DigitsBlock } from 'components/controls/Button'
import { DragBlockName, DragItem } from 'common'

import classes from './PreviewLayer.module.css'

const getStyles = (currentOffset: XYCoord | null) => {
  if (!currentOffset) {
    return { display: 'none' }
  }

  const { x, y } = currentOffset

  return {
    display: 'inline-block',
    transform: `translate(${x}px,${y}px)`,
  }
}

const getBlock = (name: DragBlockName): FC => {
  switch (name) {
    case 'equal':
      return EqualButton
    case 'operations':
      return OperationsBlock
    case 'digits':
      return DigitsBlock
  }
}

const PreviewLayer: FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  if (!isDragging) {
    return null
  }

  const Block = getBlock((item as DragItem).dragBlockName)

  return (
    <div className={classes.root}>
      <div style={getStyles(currentOffset)}>
        <Block />
      </div>
    </div>
  )
}

export default PreviewLayer
