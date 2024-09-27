// MainPage.jsx
import React from "react";
import ProfileBox from "../components/ProfileBox";
import ChatListBox from "../components/ChatListBox";
import style from "./css/MainPage.module.css";
import FeedBox from "../components/Feed/FeedBox";
import HeadBox from "../components/HeadBox";
const MainPage = () => {
  return (
    <div className={style.wrap}>
      <div className={style.contentsContainer}>
        {/* <h1>Main Page</h1> */}
        <div className={style.leftsection}>
          <ProfileBox />
          <ChatListBox />
        </div>
        <div className={style.feedList}>
          <HeadBox />
          <FeedBox />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
