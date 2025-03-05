import { useState } from "react";
import "./Workouts.css"
import { useGetWorkouts, useAddWorkout, useUpdtateWorkout, useDeleteWorkout } from "./WorkoutsAPI";

interface Workout {
    id: number;
    exercise: string;
    reps: number;
    sets: number;
    notes: string;
}

const Workouts = () => {

    const addWorkout = useAddWorkout();
    const updateWorkout = useUpdtateWorkout();
    const deleteWorkout = useDeleteWorkout();

    const { isLoading, data, error } = useGetWorkouts();

    const [newWorkout, setNewWorkout] = useState("");

    if(isLoading) return <h1> Lädt.. </h1>
    if(error) return <h1> Fehler beim Laden der Seite </h1>

    const handleAddWorkout = () => {
        
    }


    return(
        <div className="workouts">
            <h1> Fitness App </h1>

            <div className="workout-list">
                <div className="header">
                    <h2> Workout Liste </h2>
                    <button> + Add </button>
                </div>

                <ul>
                    {data.map((workout: Workout) => (
                        <div className="workout" key={workout.id}>
                            <div className="top">
                                <h3> {workout.exercise} </h3>
                                <button> x </button>
                            </div>

                            <div className="numbers">
                                <li> Wiederholungen: {workout.reps} </li>
                                <li> Sätze: {workout.sets} </li>
                            </div>

                            <div className="bottom">
                                <p> {workout.notes} </p>
                                <button> Update </button>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Workouts