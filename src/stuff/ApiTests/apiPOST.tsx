import { useState } from "react";
import "./apiPOST";

interface todo {
  todo: string;
  completed: boolean;
  userId: number;
}

const APIPOST = () => {
  const [isLoading, setIsLoading] = useState(false);

  fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo: "hi", userId: 2 }),
  })
    .then((res) => res.json())
    .then(console.log);

  return <div className="apiPOST"></div>;
};

export default APIPOST;
