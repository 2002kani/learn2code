import useSWR from "swr";

interface toDo{
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

interface toDoResponse{
    todos: toDo[];
}

const fetcher = (url:string) => fetch(url).then((res) => res.json())

export default function Api1(){

    const { data, error } = useSWR<toDoResponse>("https://dummyjson.com/todos", fetcher);

    if(!data) return <h1>Lädt.. </h1>
    if(error) return <h1> Fehler beim Laden der Webseite </h1>

    return(
        <>
            {data.todos.map((item) => (
                <div className="container">
                    <h1>{item.id}</h1>
                    <p>{item.todo}</p>
                    <p>{item.userId}</p>
                    <p>{item.completed ? "COMPLETED" : "NOT COMPLETED"}</p>
                </div>
            ))}
        </>
    );
}