import { useState, useEffect } from 'react'
import { gsap } from "gsap"
import './App.css'
import Video from './Video.jsx'

function App() {
  // const [count, setCount] = useState(0)
  const [page, setPage] = useState(parseInt(localStorage.getItem("lastSelectedPage") ?? 0))

  const pages = [0, 1, 2, 3, 4, 5, 6]

  const tl = gsap.timeline()

  useEffect(()=>{
    localStorage.setItem("lastSelectedPage", page)
  },[page])

  const fadeMask = () => {
    tl
    .to('.mask', {
      ease: "power1.out",
      duration: 1,
      opacity: 1,
    })
    .to('.mask', {
      ease: "power1.out",
      duration: 1,
      opacity: 0,
    })
  }

  const goLeftPage = () => {
    setTimeout(() => {
      console.log("Delayed for 1 second.");
      setPage((page) => page == 0 ? pages.length-1 : page - 1)
    }, 1000);
    
  }

  const goRightPage = () => {
    setTimeout(() => {
      console.log("Delayed for 1 second.");
      setPage((page) => page < pages.length-1 ? page + 1 : 0)
    }, 1000);
  }

  

  return (
    <div className="App">
      <div className="mask"></div>
        <Video key={page} page={page} />
      <div className="main-container">
        <h1>NO</h1>
        <h2 className='desc'>Silksong is not out yet</h2>
        {/* <p className="page">{page}</p> */}
      </div>
      <div className="bg-selector-container">
        <img onClick={()=>{goLeftPage(); fadeMask()}} className="left" src="./assets/images/R_L_arrow.png" alt="left_select" />
        <p>Switch background</p>
        <img onClick={()=>{goRightPage(); fadeMask()}} className="right" src="./assets/images/R_L_arrow.png" alt="right_select" />
      </div>
      {/* <div onClick={fadeMask} className="fade">fade</div> */}
      <div className="footer">PS: I love you Team Cherry take your time &lt;3 </div>
    </div>
  )
}
// page < pages.length-1 ? page + 1 : 0)
export default App
