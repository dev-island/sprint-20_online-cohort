import { useState, useEffect } from "react";
import { Link } from "@chakra-ui/react";
import useAuthContext from "../hooks/useAuthContext";
export type User = {
  _id: string;
  username: string;
};

const Users = () => {
  const { token } = useAuthContext();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Failed to get users", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user._id}>
            <Link href={`/users/${user._id}`}>{user?.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
