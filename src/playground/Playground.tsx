import { useState } from "react";
import useSWR from "swr";

interface workout {
  exercise: string;
  reps: number;
  sets: number;
  category: string;
  date: string;
  notes: string;
}

interface workoutResponse {
  workouts: workout[];
}

const BASE_URL = "http://localhost:5100";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Playground() {
  const { data } = useSWR<workoutResponse>(`${BASE_URL}/workouts`, fetcher);
  const [inputVal, setInputVal] = useState("");

  console.log(data);
  console.log("INPUT VAL: ", inputVal);

  return (
    <>
      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button>Send</button>

      <div></div>
    </>
  );
}

export default Playground;
