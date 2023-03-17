import { useState } from 'react'
import reactLogo from './assets/images/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="vid-container">
        <video className="bg-vid" autoPlay muted loop>
          <source src="./assets/videos/Vessel.mp4" type="video/mp4"/>
        </video>
      </div>
      <div className="text-container">
        <h1>NO</h1><br />
        <h2>Silksong is not out yet</h2>
      </div>
      <div className="footer">PS: I love you Team Cherry take your time &lt;3</div>
    </div>
  )
}

export default App
