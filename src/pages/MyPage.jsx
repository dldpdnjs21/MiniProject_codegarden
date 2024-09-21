// MainPage.jsx
import React from "react";
import ProfileBox from "../components/ProfileBox";
import style from "./css/MyPage.module.css";
import FeedBox from "../components/Feed/FeedBox";
import HeadBox from "../components/HeadBox";
import MyBox from "../components/MyBox";
const MyPage = () => {
  return (
    <div className={style.wrap}>
      <div className={style.contentsContainer}>
        {/* <h1>Main Page</h1> */}
        <ProfileBox />
        <div className={style.myBox}>
          <MyBox />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
