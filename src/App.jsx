import { useState } from 'react'
import './App.css';
import Sobre from './pages/Sobre'


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
