import React, { useState } from 'react';
import './css/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import loginimage from './img/login_image.png';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('로그인 정보:', formData);
    navigate('/main');
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="illustration">
          <img src={loginimage} alt="illustration" />
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="title">
            <h1>LOGIN</h1>
          </div>
          
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="ID"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="PW"
            required
          />

          <button type="submit">LOG IN</button>

          <p>
            Don't have an account? <a onClick={() => navigate('/join')}>Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;