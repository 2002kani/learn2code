//import Generics from "./generics"
//import Api1 from "./api1.0"
import { useRef, useState } from "react";
import "./index.css"
//import APIPOST from "./apiPOST"
//import Produktliste from "./Produktliste/Produktliste"
//import TodoList from "./TodoListe/TodoListe";
//import Workouts from "./Fitness/Workouts";


/*
Alle komponente die ich app hinzgefügt wurden:

    //<Generics />
    //<Api1 />    
    //<APIPOST />
    //<Produktliste />
    //<TodoList/>
    //<Workouts />
    //<AccordionPage />
*/











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
    } else{
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



















  /*let userId: string;
  
  const testFunc = () => {
    return "HALLOOOO..";
  }

  userId = testFunc();
  
  console.log(userId);

  const addTwo = (value: number):number => {
    return value + 2;
  }

  console.log(addTwo(1));

  const signUp = (name: string, alter: number, isPaid: boolean) => {}
  
  signUp("kani", 23, true);

  const Chars = ["Zorro", "Nami", "Luffy", "Usopp"];

  Chars.map((char): void => {
    console.log(`Hallo, mein name ist ${char}`);
  })

  const consoleLog = (text: string):void => {
    console.log(text);
  }

  consoleLog("Hallo ich mache hier mal einen beispiel text");
  
  interface User {
    name: string,
    alter: number,
    isStudent: boolean,
    is2m?: boolean,
  }

  const userInfo = (u: User):void => {
    console.log("Name: " + u.name );
    console.log("Alter: " + u.alter);
    console.log("Student? " + u.isStudent);
  }

  userInfo({name: "Kani", alter: 22, isStudent: true});

  interface User {
    name: string,
    age: number,
    birth: number,
    area: string
  }
  
  interface User {
    random: string
  }

// User besitzt nun auch random 

  // Array erstellen, der in einer Function übergeben wird und dort gemapped wird
  // sodass jeder einzelne charakter im Array sich vorstellt.
  const CharArray = ["Luffy", "Zorro", "Nami"];

  const numberFunction = (arr: Array<string>) => {
    arr.map((char): void => {
      console.log(`Mein name ist ${char}`);
    })
  }
  numberFunction(CharArray);

  let name: string | number;
  name = 23;

  const testFunc = (val: string | number): string | number => {
    if(typeof val === "string" ){
      return val.toLocaleLowerCase();
    }
    return val + 2;
  }

  console.log(testFunc(10));
  console.log(testFunc("KANIII"));


 //userCard ist von Typ Array mit folgenden Datentypen in den Elementen: 
  let userCard: [string, number, string, boolean];
  userCard = ["Kani", 23, "Student", true];

  type User = [number, string];
  const newUser: User = [23, "Kani"];

  console.log(newUser); 


  enum Status {
    loading,
    success,
    error
  }

  const testStatus = (stat: Status): string => {
    switch(stat){
      case Status.loading: return "Lädt..."
      case Status.success: return "Erfolg..!"
      case Status.error: return "Error..."
    }
  }

  console.log(testStatus(2));

  interface User {
    email: string,
    userId: number,
    isPaid: boolean,

    startTrial(): string,
    getCoupon(couponname: string, value: number): number
  }

  let KanisAcc: User = {email: "k@gmail.com", userId: 123, isPaid: true,
                        startTrial: ():string => { return "Trial gestartet..."},
                        getCoupon: (name: "Kani10", value: 10):number => { return 10}
  }
  
  console.log(KanisAcc); */