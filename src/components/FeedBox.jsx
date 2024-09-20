import React, { useState, useEffect } from "react";
import { ref as dbRef, onValue } from "firebase/database";
import { auth, db } from "../pages/firebase/firebase";
import style from "./css/FeedBox.module.css";

const FeedBox = () => {
  const [feeds, setFeeds] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 사용자 데이터 가져오기
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userRef = dbRef(db, 'users/' + user.uid);
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.log('사용자 데이터가 존재하지 않습니다.');
          }
        });
      } else {
        console.log('사용자가 로그인되지 않았습니다.');
      }
    };

    fetchUserData();
  }, []);

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
          <div className={style.feedUser}><h2>{userData ? userData.nickname : '닉네임 없음'}</h2></div>
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