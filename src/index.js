import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Join from './pages/JoinPage';
import Login from './pages/LoginPage';
import Main from './pages/MainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);