import { useState } from 'react'
import SideMenu from './components/SideMenu/SideMenu'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SideMenu />
    </>
  )
}

export default App
