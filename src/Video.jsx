import { gsap } from "gsap"
import './App.css'

const Video = ({page}) =>{

    const tl = gsap.timeline()

    return (
        <video className="bg-vid" autoPlay muted loop>
            <source src={`./assets/videos/${page}.mp4`} type="video/mp4"/>
            video not supported
        </video>
    )
}

export default Video