import { useState } from "react";
import useSWR from "swr";

interface workout {
  exercise: string;
  reps: number;

  sets: number;
  category: string;
  date: string;
  name: string;
  age: number;
  home: string;
  notes: string;
  note: string;
}

const BASE_URL = "http://localhost:5100";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const addWorkout = async (workout: workout) => {
  const res = await fetch(`${BASE_URL}/workouts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workout),
  });
  return res.json();
};

function Playground() {
  const [inputVal, setInputVal] = useState("");
  const { data } = useSWR<workout[]>(`${BASE_URL}/workouts`, fetcher);

  if (!data) return <div>Lädt...</div>;

  console.log("INPUT VAL: ", inputVal);
  console.log(data);

  const queriedWorkouts = data.filter((workout) =>
    workout.exercise.toLowerCase().includes(inputVal.toLowerCase())
  );

  const templateWorkout = (exercise: string) => {
    const newWorkout: workout = {
      exercise: exercise,
      reps: 10,
      sets: 20,
      category: "Test",
      date: "DATA",
      notes: "string",
    };

    console.log(newWorkout);

    addWorkout(newWorkout);
  };

  console.log("tets");

  return (
    <>
      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button onClick={() => templateWorkout(inputVal)}>Send</button>

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
