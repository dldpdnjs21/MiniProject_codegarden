import React, { useState } from 'react';
import './css/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import loginimage from './img/login_logo.svg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { get, ref } from 'firebase/database';
import { db } from './firebase/firebase';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.id, formData.password);
      const user = userCredential.user;
  
      const userRef = ref(db, 'users/' + user.uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log('사용자 데이터:', userData);
      } else {
        console.log('사용자 데이터가 존재하지 않습니다.');
      }
  
      navigate('/main');
    } catch (error) {
      console.error('로그인 실패:', error);
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
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

          {error && <p className="error-message">{error}</p>} {/* 로그인 실패 메시지 */}

          <input
            type="email"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="ID (이메일)"
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