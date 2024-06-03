import { Children, useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const ProtactedRoute = ({children})=>{
    if (!currentUser){
      return<Navigate to="/login"/>
    }
    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtactedRoute>
          <Home />
        </ProtactedRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
