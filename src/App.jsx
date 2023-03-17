import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="App">
    <div className="vid-container">
      <video class="bg-vid" autoPlay muted loop>
        <source src="../public/vessel.mp4" type="video/mp4"/>
      </video>
    </div>
      <div class="container">
        <h1>NO</h1>
        <h2>Silksong is not out yet</h2>
      </div>
    </div>
  )
}

export default App
