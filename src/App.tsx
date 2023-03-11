import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'

import theme from './theme'
import Canvas from 'components/ui-panes/Canvas'
import Palette from 'components/ui-panes/Palette'
import PreviewLayer from 'components/ui-panes/PreviewLayer'

const StyledBlock = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(7)}px;
  justify-content: center;

  /* width: 800px; */
  /* margin: auto; */
  margin-top: ${({ theme }) => theme.spacing(8)}px;
  padding: ${({ theme }) => theme.spacing(6)}px;
  background-color: ${({ theme: { palette } }) => palette.gray.white};

  & > * {
    width: ${({ theme: { layout } }) => layout.pane.width};
  }
`

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <StyledBlock>
          <PreviewLayer />
          <Palette />
          <Canvas />
        </StyledBlock>
      </ThemeProvider>
    </DndProvider>
  )
}

export default App
