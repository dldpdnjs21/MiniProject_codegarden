import React, { useState, useEffect } from "react";
import { ref as dbRef, onValue } from "firebase/database";
import { db } from "../pages/firebase/firebase";
import style from "./css/FeedBox.module.css";

const FeedBox = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const feedsRef = dbRef(db, "feeds");
    onValue(feedsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const feedsArray = Object.values(data);
        setFeeds(feedsArray);
      }
    });
  }, []);

  return (
    <div className={style.feedContainer}>
      {feeds.map((feed, index) => (
        <div key={index} className={style.feed}>
          {/* 피드 작성자의 닉네임 표시 */}
          <div className={style.feedUser}><h2>{feed.nickname || '닉네임 없음'}</h2></div>
          <h2>{feed.title}</h2>
          <p>사용 언어: {feed.language}</p>
          <p>등록 시간: {new Date(feed.createdAt).toLocaleString()}</p>
          <p>{feed.content}</p>
          {feed.imageUrl && <img src={feed.imageUrl} alt="피드 이미지" className={style.feedImage} />}
        </div>
      ))}
    </div>
  );
};

export default FeedBox;