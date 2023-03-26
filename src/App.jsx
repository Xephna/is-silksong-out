import { useState, useEffect } from 'react'
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin";

import './App.css'
import Video from './Video.jsx'

function App() {
  // curr page stage
  const [page, setPage] = useState(parseInt(localStorage.getItem("lastSelectedPage") ?? 0))

  // sound on/off state
  const [sound, setSound] = useState(localStorage.getItem("sound") ?? 0)

  // pages array container
  const pages = [0, 1, 2, 3, 4, 5, 6]

  // set last selected page when there's a change in 'pages' var
  useEffect(()=>{
    localStorage.setItem("lastSelectedPage", page)
  },[page])

  // set last selected sound setting when there's a change in 'sound' var
  useEffect(()=>{
    localStorage.setItem("sound", sound)
  },[sound])

  // on render, set sound setting according to state
  useEffect(()=>{
    let button = document.querySelector('.sound')
    let audio = document.querySelector(".bg-sound")
    if(sound==0){
      audio.pause()
      button.classList.remove('sound-on')
      button.classList.add('sound-off')
    } else {
      audio.play()
      button.classList.remove('sound-off')
      button.classList.add('sound-on')
    }
    audio.volume = 0.1
  },[])

  // animation to fade mask to full black and out
  const fadeOutIn = () => {
    gsap.to('.mask', {
      ease: "power1.out",
      duration: 1,
      opacity: 1,
    })
    gsap.to('.mask', {
      delay: 1,
      ease: "power1.out",
      duration: 1,
      opacity: 0,
    })
  }

  // sound state toggle
  const toggleSound = () => {
    let element = document.querySelector(".sound");
    let audio = document.querySelector(".bg-sound")
    if(sound==0){
      setSound(1)
      element.classList.remove("sound-off");
      element.classList.add("sound-on");
      audio.play()
    } else {
      setSound(0)
      element.classList.remove("sound-on");
      element.classList.add("sound-off");
      audio.pause()
    }
  }

  // page change mechanics, timeout clear etc
  let changePageTimeout
  let tempPage = page
  const goLeftPage = () => {
    tempPage = tempPage == 0 ? pages.length-1 : tempPage - 1
    if(changePageTimeout!=undefined){
      clearTimeout(changePageTimeout)
    }
    fadeOutIn()
    changePageTimeout = setTimeout(() => {
      setPage(tempPage)
    }, 1000);
  }

  const goRightPage = () => {
    tempPage = tempPage < pages.length-1 ? tempPage + 1 : 0
    if(changePageTimeout!=undefined){
      clearTimeout(changePageTimeout)
    }

    changePageTimeout = setTimeout(() => {
      setPage(tempPage)
    }, 1000);
  }

  // change page sound initial settings
  const changeMenuSound = () => {
    let audio = document.querySelector(".change-menu-sound")
    audio.volume = 0.4
    audio.currentTime=0
    audio.play()
  }

  // timeline for tip animations
  let tipTL = gsap.timeline({paused:true})
  setTimeout(() => {
    if(document.querySelector(".tip")) {
      tipTL
          .to('.tip',{
            duration: 0.2,
            width: 220,
            borderRadius: "10px"
          })
          .to('.tip',{
            height: 60,
            duration: 0.2
          })
    }
  }, 200);

  //sound tip mechanics, timeout clear etc
  let soundTipTextTimeout
  const soundTipEnter = () => {
    console.log('mosuedover');
    tipTL.play()
    if(soundTipTextTimeout!=undefined){
      clearTimeout(soundTipTextTimeout)
    }
    soundTipTextTimeout = setTimeout(() => {
      document.querySelector('.tip').innerText = "No sound? Click anywhere in the page once."
    }, 400)
  }

  const soundTipExit = () => {
    console.log('exit');
    if(soundTipTextTimeout!=undefined){
      clearTimeout(soundTipTextTimeout)
    }
    document.querySelector('.tip').innerText = '?'
    tipTL.reverse()
  }

  // disclaimer mechanics, timeout clear etc
  let disclaimerTL = gsap.timeline({paused:true})
  setTimeout(() => {
    if(document.querySelector(".disclaimer")) {
      disclaimerTL
          .to('.disclaimer',{
            duration: 0.2,
            width: 400,
            borderRadius: "10px"
          })
          .to('.disclaimer',{
            height: 430,
            duration: 0.2
          })
    }
  }, 200);

  // disclaimer mechanics and clear timeout etc
  let disclaimerTextTimeout
  const disclaimerEnter = () => {
    console.log('mosuedover');
    const disclaimerText = "I do not own the video backgrounds, music, and button assets used in this website, they are owned by Team Cherry.\n\nThis is just a silly little project that started out as an idea one morning.\n\nI love Hollow Knight (I hope that's obvious), and Team Cherry has 100% of my support.\n\nIf this silly little website gave you laugh, maybe consider buying me a coffee at the bottom left of this page!\n\nThanks for visiting, don't go hollow (at least until Silksong is out), and let's enjoy the wait together.\n\nContact me: info@silksongout.com"
    if(disclaimerTextTimeout!=undefined){
      clearTimeout(disclaimerTextTimeout)
    }
    disclaimerTL.play()
    disclaimerTextTimeout = setTimeout(() => {
      document.querySelector('.disclaimer').innerText = disclaimerText
    }, 400)
  }

  const disclaimerExit = () => {
    console.log('exit');
    if(disclaimerTextTimeout!=undefined){
      clearTimeout(disclaimerTextTimeout)
    }
    document.querySelector('.disclaimer').innerText = 'Disclaimer'
    disclaimerTL.reverse()
  }

  return (
    <div className="App">
      <div onClick={toggleSound} className='sound sound-off' />
      <div className="tip" onMouseEnter={soundTipEnter} onMouseLeave={soundTipExit}>
        <div className='tip-text'>
          ?
        </div>
      </div>
      <audio loop className='bg-sound' src="./assets/sounds/Dirtmouth.wav"></audio>
      <audio className='change-menu-sound' src="./assets/sounds/ChangeMenu.wav"></audio>
      <div className="mask"></div>
        <Video className="video" key={page} page={page} />
      <div className="main-container">
        <h1>NO</h1>
        <h2 className='desc'>Silksong is not out yet</h2>
      </div>
      <div className="bg-selector-container">
        <img onClick={()=>{fadeOutIn();goLeftPage();changeMenuSound()}} className="left" src="./assets/images/R_L_arrow.png" alt="left_select" />
        <p>Switch background</p>
        <img onClick={()=>{fadeOutIn();goRightPage();changeMenuSound()}} className="right" src="./assets/images/R_L_arrow.png" alt="right_select" />
      </div>
      <div className="disclaimer" onMouseEnter={disclaimerEnter} onMouseLeave={disclaimerExit}>Disclaimer</div>
      <div className="footer">
        <a title="Buy me a coffee!" href="https://www.buymeacoffee.com/ziegwyn" target="_blank"><div className="buy-me-a-coffee"></div></a>
      </div>
    </div>
  )
}

export default App
