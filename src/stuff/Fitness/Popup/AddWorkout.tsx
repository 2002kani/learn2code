import React, { useState } from "react";
import "./AddWorkout.css";

const AddWorkout = ({ onAddWorkout, onClose }:any) => {
    const [exercise, setExercise] = useState("");
    const [reps, setReps] = useState("");
    const [sets, setSets] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (!exercise || !reps || !sets) {
            alert("Bitte fülle alle Pflichtfelder aus (Exercise, Reps, Sets).");
            return;
        }

        const newWorkout = {
            id: Date.now(), // Einfache ID-Generierung
            exercise,
            reps: parseInt(reps),
            sets: parseInt(sets),
            notes,
        };

        onAddWorkout(newWorkout); // Neue Übung hinzufügen
        onClose(); // Popup schließen
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Neues Workout hinzufügen</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Exercise:</label>
                        <input
                            type="text"
                            value={exercise}
                            onChange={(e) => setExercise(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Reps:</label>
                        <input
                            type="number"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Sets:</label>
                        <input
                            type="number"
                            value={sets}
                            onChange={(e) => setSets(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Notes (optional):</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit">Hinzufügen</button>
                        <button type="button" onClick={onClose}>
                            Abbrechen
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddWorkout;
