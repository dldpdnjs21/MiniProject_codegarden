import React, { useState } from "react";
import "./css/JoinPage.css";
import { useNavigate } from "react-router-dom";
import loginimage from "./img/login_logo.svg";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "./firebase/firebase";

const JoinPage = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    id: "",
    password: "",
    developmentField: "",
    techStack: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.id,
        formData.password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      await set(ref(db, "users/" + user.uid), {
        nickname: formData.nickname,
        developmentField: formData.developmentField,
        techStack: formData.techStack,
      });

      setSuccessMessage(
        "회원가입이 완료되었습니다. 이메일을 확인하여 인증을 완료해주세요."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("회원가입 실패:", error);
      let errorMessage = "회원가입에 실패했습니다. 다시 시도해주세요.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "이메일이 이미 사용 중입니다.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "잘못된 이메일 주소입니다.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "비밀번호가 너무 약합니다.";
      }
      setError(errorMessage);
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
            <h1>회원가입</h1>
          </div>
          {error && (
            <p className="error-message" aria-live="assertive">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="success-message" aria-live="assertive">
              {successMessage}
            </p>
          )}{" "}
          {/* 추가된 성공 메시지 */}
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임"
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
            placeholder="비밀번호"
            required
          />
          <div className="select-wrap">
            <select
              name="developmentField"
              value={formData.developmentField}
              onChange={handleChange}
              required
            >
              <option value="">개발 분야</option>
              <option value="프론트엔드 개발자">프론트엔드</option>
              <option value="백엔드 개발자">백엔드</option>
              <option value="풀스택 개발자">풀스택</option>
              <option value="웹 개발자">웹</option>
              <option value="모바일 개발자">모바일</option>
              <option value="게임 개발자">게임</option>
              <option value="DB 개발자">DB</option>
              <option value="임베디드 SW 개발자">임베디드 SW</option>
              <option value="보안 개발자">보안</option>
            </select>
          </div>
          <div className="select-wrap">
            <select
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              required
            >
              <option value="">기술 스택</option>
              <option value="React">React</option>
              <option value="Nodejs">Node.js</option>
              <option value="Django">Django</option>
              <option value="C">C</option>
              <option value="C#">C#</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Swift">Swift</option>
              <option value="R">R</option>
              <option value="SQL">SQL</option>
            </select>
          </div>
          <button type="submit">회원가입</button>
          <p>
            계정이 있으신가요? <a onClick={() => navigate("/login")}>로그인</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
