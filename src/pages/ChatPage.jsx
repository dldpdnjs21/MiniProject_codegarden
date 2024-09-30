// ChatPage.jsx
import React from "react";
import ProfileBox from "../components/ProfileBox";
import ChatListBox from "../components/ChatListBox";
import style from "./css/ChatPage.module.css";
import ChatRoom from "../components/ChatRoom";
import Footer from "../components/Footer";

const ChatPage = () => {
  return (
    <div className={style.wrap}>
      <div className={style.contentsContainer}>
        <div className={style.leftsection}>
          <ProfileBox />
          <ChatListBox />
          <Footer />
        </div>
        <div className={style.feedList}>
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
