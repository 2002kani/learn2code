import useSWR, { useSWRConfig } from "swr";

const BASE_URL = "http://localhost:3000/workouts";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const fetcher2 = (url: string) => fetch(url).then((res) => res.json());
const fetcher2 = (url: string) => fetch(url).then((res) => res.json());

// GET - Workouts bekommen
export const useGetWorkouts = () => {
  return useSWR(BASE_URL, fetcher);
};

// POST - Workout hinzufügen
export const useAddWorkout = () => {
  const { mutate } = useSWRConfig();

  const addWorkout = async (newWorkout: {
    exercise: string;
    reps: number;
    sets: number;
    notes: string;
  }) => {
    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        ContenType: "application/json",
      },
      body: JSON.stringify(newWorkout),
    });
    mutate(BASE_URL);
  };
  return addWorkout;
};

// PATCH - Workouts updaten
export const useUpdtateWorkout = () => {
  const { mutate } = useSWRConfig();

  const updtateWorkout = async (
    id: number,
    updatedWorkout: { notes: string }
  ) => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        ContentType: "application/json",
      },
      body: JSON.stringify(updatedWorkout),
    });
    mutate(BASE_URL);
  };
  return updtateWorkout;
};

// DELETE - Workout löschen
export const useDeleteWorkout = () => {
  const { mutate } = useSWRConfig();

  const deleteWorkout = async (id: number) => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    mutate(BASE_URL);
  };
  return deleteWorkout;
};
