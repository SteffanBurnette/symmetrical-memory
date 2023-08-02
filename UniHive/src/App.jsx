import { useState } from 'react'
import './App.css'
import ResponsiveAppBar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ResponsiveAppBar/>
    </>
  )
}

export default App
