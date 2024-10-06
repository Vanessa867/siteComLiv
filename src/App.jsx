import { useState } from 'react'
import './App.css';
import Sobre from './pages/Sobre'
import Home from './pages/Home';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       <Sobre />
      </div>
    </>
  )
}

export default App
