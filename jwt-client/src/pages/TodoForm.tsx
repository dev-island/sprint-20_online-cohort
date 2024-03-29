import { useState } from "react";
import Form from "../components/Form";
import useAuthContext from "../hooks/useAuthContext";

const initState = {
  title: "",
  description: "",
};

const inputs = [
  {
    type: "text",
    name: "title",
    label: "Title",
    isRequired: true,
  },
  {
    type: "text",
    name: "description",
    label: "Description",
    isRequired: true,
  },
];

const TodoForm = () => {
  const [loading, setLoading] = useState(false);
  const { userId, token } = useAuthContext();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const handleSubmit = async ({ title, description }) => {
    if (!title || !description) {
      return alert("Please fill out all fields");
    }
    if (!token) {
      return alert("You must be logged in to create a todo");
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ title, description, user: userId }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Form
      title="Create a todo"
      subTitle="Fill this out"
      inputs={inputs}
      loading={loading}
      submit={handleSubmit}
      initState={initState}
      cta="Submit"
    />
  );
};

export default TodoForm;
