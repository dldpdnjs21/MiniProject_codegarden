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
import MyPage from "./pages/MyPage";
import SearchResultPage from "./pages/SearchResultPage";
import ChatRoom from "./components/ChatRoom"; // ChatRoom 컴포넌트 임포트

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
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/search" element={<SearchResultPage />} /> {/* 검색 결과 페이지 경로 수정 */}
        <Route path="/chatroom/:roomId" element={<ChatRoom />} /> {/* 채팅방 경로 추가 */}
      </Routes>
    </div>
  );
};

export default App;