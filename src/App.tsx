import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import classes from './App.module.css'
import Canvas from './components/Canvas'
import Palette from './components/Palette'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.root}>
        <Palette />
        <Canvas />
      </div>
    </DndProvider>
  )
}

export default App
