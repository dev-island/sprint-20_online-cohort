import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AuthRoute from "./components/AuthRoute";
import Users from "./pages/Users";
import TodoForm from "./pages/TodoForm";
import Todos from "./pages/Todos";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AuthRoute>
              <Users />
            </AuthRoute>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        <Route
          path="/create-todo"
          element={
            <AuthRoute>
              <TodoForm />
            </AuthRoute>
          }
        />
        <Route
          path="/todos"
          element={
            <AuthRoute>
              <Todos />
            </AuthRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
