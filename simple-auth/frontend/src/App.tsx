import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Nabar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const logout = async () => {
    // TODO: implement logout
  };

  return (
    <>
      <Navbar logout={logout} />
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
