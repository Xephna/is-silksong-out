import './App.css'


const Video = ({page}) =>{

    return (
        <div className="vid-container">
            <video className="bg-vid" autoPlay muted loop>
                <source src={`./assets/videos/${page}.mp4`} type="video/mp4"/>
            </video>
        </div>
    )
}

export default Video