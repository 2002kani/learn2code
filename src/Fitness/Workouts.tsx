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

    const [newNote, setNewNote] = useState("");
    //const [setEditingWorkoutId, setEditingWorkoutId] = useState(null)

    if(isLoading) return <h1> Lädt.. </h1>
    if(error) return <h1> Fehler beim Laden der Seite </h1>

    const handleAddWorkout = async () => {
        await addWorkout({ exercise: "Bankdrücken", reps: 10, sets: 3, notes: "War miees schwer"})
    }

    const handleUpdateWorkout = async (id: number) => {
        try {
            await updateWorkout( id, { notes: newNote });
            //setEditingWorkoutId(null); // Bearbeitungsmodus beenden
            setNewNote(""); // Eingabefeld zurücksetzen
        } catch (err) {
            console.error("Fehler beim Aktualisieren des Workouts:", err);
        }
    };

    const handleDeleteWorkout = async (id: number) => {
         await deleteWorkout(id);
    }


    return(
        <div className="workouts">
            <h1> Fitness App </h1>

            <div className="workout-list">
                <div className="header">
                    <h2> Workout Liste </h2>
                    <button onClick={handleAddWorkout}> + Add </button>
                </div>

                <ul>
                    {data.map((workout: Workout) => (
                        <div className="workout" key={workout.id}>
                            <div className="top">
                                <h3> {workout.exercise} </h3>
                                <button onClick={() => handleDeleteWorkout(workout.id)}> x </button>
                            </div>

                            <div className="numbers">
                                <li> Wiederholungen: {workout.reps} </li>
                                <li> Sätze: {workout.sets} </li>
                            </div>

                            <div className="bottom">
                                <p> {workout.notes} </p>
                                <button onClick={()=> handleUpdateWorkout(workout.id)}> Update </button>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Workouts