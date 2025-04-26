import useSWR from "swr";
import "./TodoList.css";
import { useGetTodos, useAddTodo, useUpdateTodo, useDeleteTodo } from "./TodoListeAPI";
import { useState } from "react";

interface Todo{
    id: number;
    title: string;
    completed: boolean;
}

const TodoList = () => {

    const { isLoading, error, data } = useGetTodos();
    const addTodo = useAddTodo();
    const updateTodo = useUpdateTodo();
    const deleteTodo = useDeleteTodo();

    const [newTodo, setNewTodo] = useState("")

    if(isLoading) return <p> Lädt... </p>
    if(error) return <h1> Fehler beim Laden! </h1>

    const handleAddTodo = async() => {
        if(newTodo.trim() === ""){
            alert("Bitte gib etwas ein.")
            return;
        }
        await addTodo({ title: newTodo, completed: false});
        setNewTodo("");
    }

    const handleDeleteTodo = async ( id: number) => {
        await deleteTodo(id);
    }

    return(
        <div className="todolist">
            <div className="inputfield">
                <input 
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)} />
                <button onClick={handleAddTodo}> Add </button>
            </div>

            <ul className="todolist">
                {data.map((todo: Todo) => (
                    <div className="todo" key={todo.id}>
                        <li key={todo.id}>{todo.title}</li>
                        <button onClick={() => handleDeleteTodo(todo.id)}> x </button>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default TodoList