import logo from './logo.svg';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/LoginPage';
import Join from './pages/JoinPage';
import Main from './pages/MainPage';


const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/main" element={<Main />} /> 
    </Routes>
  );
};

export default App;