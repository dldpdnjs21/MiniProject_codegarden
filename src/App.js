import logo from "./logo.svg";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/LoginPage";
import Join from "./pages/JoinPage";
import Main from "./pages/MainPage";
import Header from "./components/Header";

const App = () => {
  const location = useLocation();

  const hideHeaderRoutes = ["/join", "/login"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
