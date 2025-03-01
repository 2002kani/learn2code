import { useState } from "react";
import "./apiPOST"

const APIPOST = () => {

    const [isLoading, setIsLoading] = useState();

    fetch('https://dummyjson.com/todos/add', {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
            todo: "Beispiel todo name",
            completed: false,
            userId: 5,
        })
    }).then((res) => res.json()).then(console.log);

    return(
        <div className="apiPOST">

        </div>
    );
}

export default APIPOST