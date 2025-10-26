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
  const { data } = useSWR<workout[]>(`${BASE_URL}/workouts`, fetcher);
  const [inputVal, setInputVal] = useState("");

  if (!data) return <div>Lädt...</div>;

  console.log(data);
  console.log("INPUT VAL: ", inputVal);

  const queriedWorkouts = data.filter((workout) =>
    workout.exercise.toLowerCase().includes(inputVal.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button>Send</button>

      <div>
        <ul>
          {queriedWorkouts.length > 0 ? (
            queriedWorkouts.map((workout) => <li>{workout.exercise}</li>)
          ) : (
            <li>Keine Workouts gefunden</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Playground;
