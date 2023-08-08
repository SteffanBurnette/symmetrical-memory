import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './layouts/LandingPage'
import LiveSearch from './components/LiveSearch'
import { LinkedCamera } from '@mui/icons-material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LandingPage/>
      {/* <LiveSearch/> */}
    </>
  )
}

export default App
