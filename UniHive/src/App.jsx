import { useState } from 'react'
import './App.css'
import ResponsiveAppBar from './components/Navbar';
import Post from './components/Post';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ResponsiveAppBar/>
     <Post/>

    </>
  )
}

export default App
