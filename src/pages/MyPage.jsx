// MainPage.jsx
import React from "react";
import ProfileBox from "../components/ProfileBox";
import ChatListBox from "../components/ChatListBox";
import style from "./css/MyPage.module.css";
import MyBox from "../components/MyBox";
import Footer from "../components/Footer";

const MyPage = () => {
  return (
    <div className={style.wrap}>
      <div className={style.contentsContainer}>
        {/* <h1>Main Page</h1> */}
        <div className={style.leftsection}>
          <ProfileBox />
          <ChatListBox />
          <Footer />
        </div>
        <div className={style.myBox}>
          <MyBox />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
