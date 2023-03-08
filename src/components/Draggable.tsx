import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import clsx from 'clsx'

import classes from 'components/Draggable.module.css'

type Props = { [key: string]: unknown }

//Add here item kind
const Draggable =
  <I extends object>(type: string, item: I) =>
  <T extends Props>(Component: React.FC<T>): React.FC<T> => {
    const DraggableComponent = (props: T) => {
      const [collected, dragSource, dragPreview] = useDrag(
        () => ({
          type,
          item,
          /* isDragging */
          /* end */
          /* canDrag */
          /* options */
          /* previewOptions */
          collect: monitor => ({
            //this will be injected in some component
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),

            /* foo: monitor... */
          }),
          /* end: (item, monitor) => { */
          /*   const dropResult = monitor.getDropResult<DropResult>() */
          /*   if (item && dropResult) { */
          /*     alert(`You dropped ${item.name} into ${dropResult.name}!`) */
          /*   } */
          /* }, */
        }),
        []
      )

      //clear browser default preview
      useEffect(() => {
        dragPreview(getEmptyImage(), { captureDraggingState: true })
      }, [])

      const { isDragging } = collected

      return (
        <div
          className={clsx(classes.root, isDragging && classes['is-dragging'])}
          ref={dragSource}
        >
          <Component {...props} />
        </div>
      )
    }

    return DraggableComponent
  }

export default Draggable
