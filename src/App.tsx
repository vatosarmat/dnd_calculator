import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'

import theme from './theme'
import Canvas from 'components/ui-panes/Canvas'
import Palette from 'components/ui-panes/Palette'
import PreviewLayer from 'components/ui-panes/PreviewLayer'
import ToggleButtonGroup from 'components/controls/ToggleButtonGroup'
import { ReactComponent as EyeIcon } from 'components/icons/eye.svg'
import { ReactComponent as AnglesIcon } from 'components/icons/angles.svg'
import { StateProvider } from 'state'
import { capitalize } from 'utils'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, ${({ theme: { layout } }) => layout.block.width}px);
  row-gap: ${({ theme }) => theme.spacing(5)}px;
  column-gap: ${({ theme }) => theme.spacing(7)}px;
  justify-content: center;

  & > *:nth-child(1) {
    grid-column-start: 2;
  }

  margin-top: ${({ theme }) => theme.spacing(8)}px;
  padding: ${({ theme }) => theme.spacing(6)}px;
  background-color: ${({ theme: { palette } }) => palette.gray.white};
`

const appModeValues = ['constructor', 'runtime'] as const
type AppMode = typeof appModeValues[number]

function App() {
  const [appMode, setAppMode] = useState<AppMode>('constructor')
  return (
    <StateProvider>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={theme}>
          <Grid>
            <ToggleButtonGroup
              onChange={setAppMode}
              value={appMode}
              label={capitalize}
              items={[
                {
                  icon: EyeIcon,
                  value: 'runtime',
                },
                {
                  icon: AnglesIcon,
                  value: 'constructor',
                },
              ]}
            />
            <Palette />
            <Canvas />
          </Grid>
          <PreviewLayer />
        </ThemeProvider>
      </DndProvider>
    </StateProvider>
  )
}

export default App
