import classes from './Palette.module.css'
import Draggable from './Draggable'
import Button, {
  DraggableEqualButton,
  DraggableOperationsBlock,
  DraggableDigitsBlock,
} from './controls/Button'

export type PaletteProps = {}

const Palette: React.FC<PaletteProps> = () => {
  return (
    <div className={classes.root}>
      <DraggableOperationsBlock />
      <DraggableDigitsBlock />
      <DraggableEqualButton />
    </div>
  )
}

export default Palette
