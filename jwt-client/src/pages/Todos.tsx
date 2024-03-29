import { useState, useEffect } from "react";
import { Link, Text } from "@chakra-ui/react";
import useAuthContext from "../hooks/useAuthContext";
import { User } from "../types";

type Todo = {
  _id: string;
  title: string;
  description: string;
  user: User;
};

const Todos = () => {
  const { token } = useAuthContext();
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await fetch("http://localhost:3000/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      console.log("DATA", data);
      setTodos(data.todos);
    } catch (error) {
      console.error("Failed to get Todos", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  console.log("TODOS PAGE", todos);
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo._id}>
            <Text>{todo.title}</Text>
            <Text>
              Created by:
              <Link href={`/users/${todo.user._id}`}>
                {todo?.user.username}
              </Link>
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
