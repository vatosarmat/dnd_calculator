import { useDrag } from 'react-dnd'

import classes from 'components/Draggable.module.css'

export const DRAG_TYPE = 'BLOCK'

type Props = { [key: string]: unknown }

//HOC injecting ref
const Draggable = <T extends Props>(Component: React.FC<T>): React.FC<T> => {
  const DraggableComponent = (props: T) => {
    const [collected, dragSource, dragPreview] = useDrag(
      () => ({
        type: DRAG_TYPE,
        collect: monitor => ({
          //this will be injected in some component
          isDragging: !!monitor.isDragging(),
        }),
      }),
      []
    )

    return (
      <div className={classes.root} ref={collected.isDragging ? dragPreview : dragSource}>
        <Component {...props} />
      </div>
    )
  }

  return DraggableComponent
}

export default Draggable
