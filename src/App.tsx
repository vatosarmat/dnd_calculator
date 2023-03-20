import { useContext, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ThemeProvider } from 'styled-components'
import styled, { css } from 'styled-components'

import theme from './theme'
import Canvas from 'components/ui-panes/Canvas'
import Palette from 'components/ui-panes/Palette'
import PreviewLayer from 'components/ui-panes/PreviewLayer'
import Calculator from 'components/ui-panes/Calculator'
import ToggleButtonGroup from 'components/controls/ToggleButtonGroup'
import { ReactComponent as EyeIcon } from 'components/icons/eye.svg'
import { ReactComponent as AnglesIcon } from 'components/icons/angles.svg'
import { StateProvider, StateContext, isCanvasFull } from 'state/canvas'
import { capitalize } from 'utils'

type GridProps = {
  $hideChildren?: number | number[]
}

const Grid = styled.div<GridProps>`
  display: grid;
  justify-content: center;

  & > *:nth-child(1) {
    grid-column-start: 2;
  }

  ${({ theme, $hideChildren }) => {
    const { palette } = theme
    return css`
      grid-template-columns: repeat(2, auto);
      row-gap: ${theme.spacing(5)}px;
      column-gap: ${theme.spacing(7)}px;
      padding: ${theme.spacing(6)}px;
      background-color: ${palette.gray.white};

      ${[$hideChildren].flat().map(
        n =>
          css`
            & > *:nth-child(${n}) {
              visibility: hidden;
            }
          `
      )}
    `
  }}
`

const appModeValues = ['constructor', 'runtime'] as const
type AppMode = typeof appModeValues[number]
const toggleItems = [
  {
    icon: EyeIcon,
    value: 'runtime' as const,
  },
  {
    icon: AnglesIcon,
    value: 'constructor' as const,
  },
]

const Ui = () => {
  const state = useContext(StateContext)
  const [appMode, setAppMode] = useState<AppMode>('constructor')

  const toggleButton = (
    <ToggleButtonGroup
      disabled={!isCanvasFull(state)}
      onChange={setAppMode}
      value={appMode}
      label={capitalize}
      items={toggleItems}
    />
  )

  return appMode === 'constructor' ? (
    <Grid>
      {toggleButton}
      <Palette />
      <Canvas />
    </Grid>
  ) : (
    <Grid $hideChildren={2}>
      {toggleButton}
      <Palette />
      <Calculator />
    </Grid>
  )
}

const App = () => {
  return (
    <StateProvider>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={theme}>
          <Ui />
          <PreviewLayer />
        </ThemeProvider>
      </DndProvider>
    </StateProvider>
  )
}

export default App
