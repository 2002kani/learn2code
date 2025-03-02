import useSWR, { useSWRConfig } from "swr";

const BASE_URL = "http://localhost:3001/todos";

const fetcher = (url:string) => fetch(url).then((res) => res.json());


// GET: Todos abrufen
export const useGetTodos = () => {
    return useSWR(BASE_URL, fetcher);
}

// POST: Todo hinzufügen
export const useAddTodo = () => {
    const { mutate } = useSWRConfig();

    const addTodo = async (newTodo: { title:string, completed:boolean }) => {
        await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodo)
        });
        mutate(BASE_URL);
    }
    return addTodo;
}

// PATCH: Todo aktualisieren
export const useUpdateTodo = () => {
    const { mutate } = useSWRConfig();

    const updateTodo = async (id: number, updatedTodo: { completed: boolean }) => {
        await fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTodo),
        });
        mutate(BASE_URL);
    }
    return updateTodo;
}

// DELETE: Todo entfernen
export const useDeleteTodo = () => {
    const { mutate } = useSWRConfig();

    const deleteTodo = async ( id: number ) => {
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        mutate(BASE_URL);
    };
    return deleteTodo;
}