import React from 'react' 
import Preset from './preset'
import Task from './task'
import SideMenu from './components/SideMenu/SideMenu'

function App() {

  return (
    <>
      <SideMenu />
      <Preset />
      <Task />
    </>
  )
}

export default App
