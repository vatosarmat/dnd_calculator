import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import classes from './App.module.css'
import Canvas from 'components/Canvas'
import Palette from 'components/Palette'
import PreviewLayer from 'components/PreviewLayer'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.root}>
        <PreviewLayer />
        <Palette />
        <Canvas />
      </div>
    </DndProvider>
  )
}

export default App
