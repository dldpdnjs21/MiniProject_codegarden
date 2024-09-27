// SearchResultPage.jsx
import React from "react";
import ProfileBox from "../components/ProfileBox";
import style from "./css/MainPage.module.css";
import FeedBox from "../components/Feed/FeedBox";
import HeadBox from "../components/HeadBox";
const SearchResultPage = () => {
  return (
    <div className={style.wrap}>
      <div className={style.contentsContainer}>
        {/* <h1>Main Page</h1> */}
        <ProfileBox />
        <div className={style.feedList}>
          <HeadBox />
          <FeedBox />
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
