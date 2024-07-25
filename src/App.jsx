import { useRef,useState } from "react"
function RendreVideo({videoRef})
{
    // console.log(videoRef)
    return(
        <div className="webcam-container">
            <video className="webcam" autoPlay ref={videoRef} muted={true} >

            </video>
        </div>
    )
}
function App()
{
    const videoRef = useRef(null);
    const canvRef = useRef(null);
    const [screenshot, setScreenshot] = useState(null);
    async function startWebcam()
    {
        try{
            const res=await navigator.mediaDevices.getUserMedia({video:true})
            if (videoRef.current) {
                videoRef.current.srcObject = res;
            }
            console.log(1)
        }catch{
            alert("found no webcam")
        }
    }
    function endWebcam()
    {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject=null;
            setScreenshot(null);
        }
    }
    const takeScreenshot = () => {
        if (videoRef.current && canvRef.current) {
            const canvas = canvRef.current;
            const video = videoRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            setScreenshot(dataUrl);
        }
    };
    return (
        <div className="main-container">
            <div className="container">
                <div className="buttons">
                    <button id="start" onClick={startWebcam}>start webcam</button>
                    <button id="screenshot" onClick={takeScreenshot}>take screenshot</button>
                    <button id="end" onClick={endWebcam}>end webcam</button>
                </div>
                <RendreVideo videoRef={videoRef}/>
            </div>
            <div className="screenshot">
                <canvas ref={canvRef} style={{display:'none'}}/>
                {screenshot && <img src={screenshot} alt="Screenshot" />}
            </div>
        </div>

        
    )
}
export default App