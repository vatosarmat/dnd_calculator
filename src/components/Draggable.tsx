import { useDrag } from 'react-dnd'

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
            isDragging: !!monitor.isDragging(),
            /* foo: monitor... */
          }),
        }),
        []
      )

      return (
        <div
          className={classes.root}
          ref={collected.isDragging ? dragPreview : dragSource}
        >
          <Component {...props} />
        </div>
      )
    }

    return DraggableComponent
  }

export default Draggable
