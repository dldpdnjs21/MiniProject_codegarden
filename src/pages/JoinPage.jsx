import React, { useState } from 'react';
import './css/JoinPage.css';
import { useNavigate } from 'react-router-dom';
import loginimage from './img/login_logo.svg';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from './firebase/firebase';

const JoinPage = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    id: '',
    password: '',
    developmentField: '',
    techStack: ''
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
      const userCredential = await createUserWithEmailAndPassword(auth, formData.id, formData.password);
      const user = userCredential.user;

      await set(ref(db, 'users/' + user.uid), {
        nickname: formData.nickname,
        developmentField: formData.developmentField,
        techStack: formData.techStack
      });

      console.log('회원가입 성공:', formData);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };


  return (
    <div className="container">
      <div className="register-box">
        <div className="illustration">
          <img src={loginimage} alt="illustration" />
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="title">
            <h1>REGISTER</h1>
          </div>

          {error && <p className="error-message">{error}</p>}

          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="Nickname"
            required
          />

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

          <select
            name="developmentField"
            value={formData.developmentField}
            onChange={handleChange}
            required
          >
            <option value="">개발 분야</option>
            <option value="frontend">프론트엔드</option>
            <option value="backend">백엔드</option>
            <option value="fullstack">풀스택</option>
          </select>

          <select
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            required
          >
            <option value="">기술 스택</option>
            <option value="react">React</option>
            <option value="nodejs">Node.js</option>
            <option value="django">Django</option>
          </select>

          <button type="submit">SIGN UP</button>

          <p>
            Have an account? <a onClick={() => navigate('/login')}>Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;