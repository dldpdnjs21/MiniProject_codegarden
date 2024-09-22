import React, { useState } from "react";
import "./css/LoginPage.css";
import { useNavigate } from "react-router-dom";
import loginimage from "./img/login_logo.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { get, ref } from "firebase/database";
import { db, auth } from "./firebase/firebase";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.id,
        formData.password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError(
          "이메일 인증을 완료하지 않았습니다. 인증 후 다시 시도해주세요."
        );
        return;
      }

      const userRef = ref(db, "users/" + user.uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log("사용자 데이터:", userData);
      } else {
        console.log("사용자 데이터가 존재하지 않습니다.");
      }

      navigate("/main");
    } catch (error) {
      console.error("로그인 실패:", error);
      let errorMessage =
        "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "사용자를 찾을 수 없습니다.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "비밀번호가 올바르지 않습니다.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "잘못된 이메일 주소입니다.";
      }
      setError(errorMessage);
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
            <h1>로그인</h1>
          </div>

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
          {/* 로그인 실패 메시지 */}
          {error && (
            <p className="error message" aria-live="assertive">
              {error}
            </p>
          )}
          <button type="submit">로그인</button>

          <p>
            계정이 없으신가요? <a onClick={() => navigate("/join")}>회원가입</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
