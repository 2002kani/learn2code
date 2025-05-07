import { useRef, useState } from "react";

function App() {

  const constraints = { audio: true }
  
  const [audioURL, setAudioURL] = useState("");
  const medieRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleClickStart = async () => {    
    if(navigator.mediaDevices){
      try{
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
          if(e.data.size > 0){
            chunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "audio/ogg; codecs=opus" });
          chunksRef.current = [];
          setAudioURL(URL.createObjectURL(blob));
          console.log("Blob: ", blob);
        }

        recorder.start();
        medieRecorderRef.current = recorder;
        console.log("Recorder has started! State: ", recorder.state);
      }catch(err){
        console.log("getUserMedia failed: ", err);
      }
    }
  }

  const handleClickStop = () => {
    const recorder = medieRecorderRef.current;

    if(recorder && recorder.state === "recording"){
      recorder.stop()
      console.log("Recorder has stopped! State: ", recorder.state);
    } else {
      console.log("MediaRecorder ist nicht am laufen.."); /* LOG! */
    }
  } 

  return (
    <>  
      <div style={{ display: "flex", gap: "8px"}}>
        <button style={{ background: "#fff", border: "none", color: "#181818", cursor: "pointer"}} onClick={handleClickStart}> Start </button>

        <button style={{ background: "#fff", border: "none", color: "#181818", cursor: "pointer"}} onClick={handleClickStop}> Stop </button>
      </div>

      {audioURL && (
        <div>
          <audio style={{ marginTop: "20px" }} controls src={audioURL} />
        </div>
      )}
    </>
  );
}

export default App